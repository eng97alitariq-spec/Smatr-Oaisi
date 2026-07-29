const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(bodyParser.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = './uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB limit

// Initialize SQLite database
const db = new sqlite3.Database('./tickets.db', (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

function initializeDatabase() {
  // Tickets table - updated with new fields
  db.run(`CREATE TABLE IF NOT EXISTS tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    employee_name TEXT NOT NULL,
    company TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    priority TEXT DEFAULT 'medium',
    status TEXT DEFAULT 'pending',
    assigned_to TEXT,
    image_path TEXT,
    archived INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Comments table - updated without user_id
  db.run(`CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ticket_id INTEGER NOT NULL,
    commenter_name TEXT NOT NULL,
    comment TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ticket_id) REFERENCES tickets(id)
  )`);

  // IT Staff table for authentication
  db.run(`CREATE TABLE IF NOT EXISTS it_staff (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`, (err) => {
    if (err) {
      console.error('Error creating it_staff table:', err);
    } else {
      console.log('it_staff table created successfully');
      
      // Insert default IT staff if not exists
      const defaultStaff = [
        { username: 'ali', password: 'admin123', name: 'علي طارق' },
        { username: 'yassin', password: 'admin123', name: 'ياسين رعد' },
        { username: 'ali_abdul', password: 'admin123', name: 'علي عبد الأمير' }
      ];

      defaultStaff.forEach(staff => {
        db.run(`INSERT OR IGNORE INTO it_staff (username, password, name) VALUES (?, ?, ?)`,
          [staff.username, staff.password, staff.name], (err) => {
            if (err) {
              console.error('Error inserting default staff:', err);
            } else {
              console.log(`Inserted/checked staff: ${staff.username}`);
            }
          });
      });
    }
  });
}

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// IT Authentication routes
app.post('/api/auth/it-login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  db.get(`SELECT * FROM it_staff WHERE username = ? AND password = ?`, 
    [username, password], 
    (err, staff) => {
      if (err) {
        return res.status(500).json({ error: 'Error during authentication' });
      }
      if (!staff) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
      res.json({ 
        message: 'Login successful', 
        staff: { id: staff.id, username: staff.username, name: staff.name }
      });
    }
  );
});

// Ticket routes - no authentication required
app.get('/api/tickets', (req, res) => {
  const { status, priority, category, company, archived } = req.query;
  let query = `SELECT * FROM tickets WHERE 1=1`;
  const params = [];

  if (status) {
    query += ' AND status = ?';
    params.push(status);
  }
  if (priority) {
    query += ' AND priority = ?';
    params.push(priority);
  }
  if (category) {
    query += ' AND category = ?';
    params.push(category);
  }
  if (company) {
    query += ' AND company = ?';
    params.push(company);
  }
  if (archived !== undefined) {
    query += ' AND archived = ?';
    params.push(archived === 'true' ? 1 : 0);
  }

  query += ' ORDER BY created_at DESC';

  db.all(query, params, (err, tickets) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching tickets' });
    }
    res.json(tickets);
  });
});

app.get('/api/tickets/:id', (req, res) => {
  db.get(`SELECT * FROM tickets WHERE id = ?`, [req.params.id], (err, ticket) => {
    if (err || !ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    res.json(ticket);
  });
});

app.post('/api/tickets', upload.single('image'), (req, res) => {
  console.log('Received ticket creation request:', req.body);
  console.log('File:', req.file);
  
  const { employee_name, company, title, description, category, priority, assigned_to } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

  if (!employee_name || !company || !title || !description || !category) {
    console.log('Validation error: Missing required fields');
    return res.status(400).json({ error: 'Employee name, company, title, description, and category are required' });
  }

  db.run(`INSERT INTO tickets (employee_name, company, title, description, category, priority, assigned_to, image_path) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [employee_name, company, title, description, category, priority || 'medium', assigned_to || null, imagePath],
    function(err) {
      if (err) {
        console.error('Error creating ticket:', err);
        return res.status(500).json({ error: 'Error creating ticket' });
      }
      console.log('Ticket created successfully with ID:', this.lastID);
      res.json({ message: 'Ticket created successfully', ticketId: this.lastID });
    }
  );
});

app.put('/api/tickets/:id', upload.single('image'), (req, res) => {
  const { employee_name, company, title, description, category, priority, status, assigned_to, archived } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : req.body.existing_image;

  db.run(`UPDATE tickets 
          SET employee_name = ?, company = ?, title = ?, description = ?, category = ?, priority = ?, status = ?, assigned_to = ?, archived = ?, image_path = COALESCE(?, image_path), updated_at = CURRENT_TIMESTAMP
          WHERE id = ?`,
    [employee_name, company, title, description, category, priority, status, assigned_to || null, archived || 0, imagePath, req.params.id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Error updating ticket' });
      }
      res.json({ message: 'Ticket updated successfully' });
    }
  );
});

app.delete('/api/tickets/:id', (req, res) => {
  db.run(`DELETE FROM tickets WHERE id = ?`, [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Error deleting ticket' });
    }
    res.json({ message: 'Ticket deleted successfully' });
  });
});

// Archive ticket
app.put('/api/tickets/:id/archive', (req, res) => {
  db.run(`UPDATE tickets SET archived = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?`, 
    [req.params.id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Error archiving ticket' });
      }
      res.json({ message: 'Ticket archived successfully' });
    }
  );
});

// Unarchive ticket
app.put('/api/tickets/:id/unarchive', (req, res) => {
  db.run(`UPDATE tickets SET archived = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?`, 
    [req.params.id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Error unarchiving ticket' });
      }
      res.json({ message: 'Ticket unarchived successfully' });
    }
  );
});

// Comments routes - no authentication required
app.get('/api/tickets/:id/comments', (req, res) => {
  db.all(`SELECT * FROM comments WHERE ticket_id = ? ORDER BY created_at ASC`,
    [req.params.id],
    (err, comments) => {
      if (err) {
        return res.status(500).json({ error: 'Error fetching comments' });
      }
      res.json(comments);
    }
  );
});

app.post('/api/tickets/:id/comments', (req, res) => {
  const { commenter_name, comment } = req.body;

  if (!commenter_name || !comment) {
    return res.status(400).json({ error: 'Commenter name and comment are required' });
  }

  db.run(`INSERT INTO comments (ticket_id, commenter_name, comment) VALUES (?, ?, ?)`,
    [req.params.id, commenter_name, comment],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Error adding comment' });
      }
      res.json({ message: 'Comment added successfully', commentId: this.lastID });
    }
  );
});

// Stats route - no authentication required
app.get('/api/stats', (req, res) => {
  db.all(`SELECT status, COUNT(*) as count FROM tickets WHERE archived = 0 GROUP BY status`, (err, statusStats) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching stats' });
    }
    
    db.all(`SELECT priority, COUNT(*) as count FROM tickets WHERE archived = 0 GROUP BY priority`, (err, priorityStats) => {
      if (err) {
        return res.status(500).json({ error: 'Error fetching stats' });
      }
      
      db.all(`SELECT category, COUNT(*) as count FROM tickets WHERE archived = 0 GROUP BY category`, (err, categoryStats) => {
        if (err) {
          return res.status(500).json({ error: 'Error fetching stats' });
        }
        
        db.all(`SELECT company, COUNT(*) as count FROM tickets WHERE archived = 0 GROUP BY company`, (err, companyStats) => {
          if (err) {
            return res.status(500).json({ error: 'Error fetching stats' });
          }
          
          db.get(`SELECT COUNT(*) as total FROM tickets WHERE archived = 0`, (err, totalResult) => {
            res.json({
              byStatus: statusStats,
              byPriority: priorityStats,
              byCategory: categoryStats,
              byCompany: companyStats,
              total: totalResult.total
            });
          });
        });
      });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
