# نظام تذاكر IT - Smart Oasis IT Ticket System

نظام احترافي لإدارة تذاكر دعم تقنية المعلومات لشركة Smart Oasis في محطة ميسان الغازية.

A professional IT ticket management system for Smart Oasis at Maysan Gas Station.

## المميزات / Features

- 🎯 **إدارة التذاكر بدون تسجيل دخول** - دخول الموظفين مجاناً بدون يوزر وباسورد
- 👥 **دعم شركات متعددة** - Smart Oasis, RASEP, EDK, BWE
- 📊 **لوحة تحكم تفاعلية ملونة** - إحصائيات ورسوم بيانية احترافية
- 🏷️ **أقسام متعددة** - الإنترنت، الطابعات، الإيميلات، الأجهزة، البرامج، الصيانة، الشبكة، الصلاحيات
- 📷 **رفع الصور** - إمكانية إرفاق صور المشكلة
- 💬 **نظام التعليقات** - التواصل حول التذاكر
- 📦 **نظام الأرشفة** - أرشفة التذاكر المنتهية
- 🎨 **تصميم ملون احترافي** - واجهة عصرية بألوان جذابة
- 📱 **واجهة عربية** - واجهة مستخدم عربية بالكامل
- 👨‍💻 **صمم بواسطة** - علي طارق عنيد - مسؤول قسم IT Operations

## التقنيات المستخدمة / Tech Stack

### Backend
- Node.js
- Express.js
- SQLite
- Multer (لرفع الصور / Image Upload)

### Frontend
- React 18
- Vite
- TailwindCSS
- React Router
- Axios
- Lucide Icons

## التثبيت / Installation

### المتطلبات / Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### خطوات التثبيت / Setup Steps

1. **تثبيت الخادم الخلفي / Install Backend**
```bash
cd backend
npm install
```

2. **تشغيل الخادم الخلفي / Start Backend**
```bash
npm start
```
الخادم سيعمل على المنفذ 5000 / Server will run on port 5000

3. **تثبيت الواجهة الأمامية / Install Frontend**
```bash
cd frontend
npm install
```

4. **تشغيل الواجهة الأمامية / Start Frontend**
```bash
npm run dev
```
الواجهة ستعمل على المنفذ 3000 / Frontend will run on port 3000

## استخدام النظام / Using the System

### إنشاء تذكرة جديدة / Create New Ticket

1. اضغط على "تذكرة جديدة" في القائمة العلوية
2. أدخل اسم الموظف
3. اختر الشركة (Smart Oasis, RASEP, EDK, BWE)
4. أدخل عنوان التذكرة ووصف المشكلة
5. اختر قسم المشكلة (الإنترنت، الطابعات، الإيميلات، الأجهزة، البرامج، الصيانة، الشبكة، الصلاحيات)
6. اختر الأولوية (منخفض، متوسط، عالي)
7. أرفق صورة المشكلة (اختياري)
8. اضغط "إنشاء التذكرة"

## هيكل المشروع / Project Structure

```
Smatr Oaisi/
├── backend/
│   ├── server.js          # الخادم الرئيسي / Main server
│   ├── package.json       # تبعيات الخادم / Server dependencies
│   ├── tickets.db         # قاعدة البيانات / Database (created on first run)
│   └── uploads/           # مجلد الصور المرفقة / Uploaded images folder
├── frontend/
│   ├── src/
│   │   ├── components/    # مكونات React / React components
│   │   │   ├── Navbar.jsx       # شريط التنقل / Navigation bar
│   │   │   ├── Dashboard.jsx    # لوحة التحكم / Dashboard
│   │   │   ├── TicketList.jsx   # قائمة التذاكر / Ticket list
│   │   │   ├── TicketDetail.jsx # تفاصيل التذكرة / Ticket details
│   │   │   └── CreateTicket.jsx # إنشاء تذكرة / Create ticket
│   │   ├── App.jsx        # التطبيق الرئيسي / Main app
│   │   ├── main.jsx       # نقطة الدخول / Entry point
│   │   └── index.css      # الأنماط / Styles
│   ├── index.html         # ملف HTML الرئيسي / Main HTML file
│   ├── package.json       # تبعيات الواجهة / Frontend dependencies
│   ├── vite.config.js     # إعدادات Vite / Vite config
│   └── tailwind.config.js # إعدادات Tailwind / Tailwind config
└── README.md
```

## واجهة برمجة التطبيقات / API Endpoints

### التذاكر / Tickets
- `GET /api/tickets` - جلب جميع التذاكر (مع الفلترة) / Get all tickets (with filters)
- `GET /api/tickets/:id` - جلب تذكرة محددة / Get specific ticket
- `POST /api/tickets` - إنشاء تذكرة جديدة (مع رفع صورة) / Create new ticket (with image upload)
- `PUT /api/tickets/:id` - تحديث تذكرة / Update ticket
- `DELETE /api/tickets/:id` - حذف تذكرة / Delete ticket
- `PUT /api/tickets/:id/archive` - أرشفة تذكرة / Archive ticket
- `PUT /api/tickets/:id/unarchive` - إلغاء أرشفة تذكرة / Unarchive ticket

### التعليقات / Comments
- `GET /api/tickets/:id/comments` - جلب تعليقات التذكرة / Get ticket comments
- `POST /api/tickets/:id/comments` - إضافة تعليق / Add comment

### الإحصائيات / Statistics
- `GET /api/stats` - جلب إحصائيات التذاكر / Get ticket statistics

### الصور / Images
- `GET /uploads/:filename` - عرض الصورة المرفقة / View uploaded image

## حالات التذاكر / Ticket Statuses

- **pending** - قيد الانتظار / Pending
- **in-progress** - قيد العمل / In Progress
- **resolved** - تم الحل / Resolved
- **closed** - مغلق / Closed

## أولويات التذاكر / Ticket Priorities

- **low** - منخفض / Low
- **medium** - متوسط / Medium
- **high** - عالي / High

## أقسام التذاكر / Ticket Categories

- **internet** - الإنترنت / Internet
- **printers** - الطابعات / Printers
- **email** - الإيميلات / Email
- **hardware** - الأجهزة / Hardware
- **software** - البرامج / Software
- **maintenance** - الصيانة / Maintenance
- **network** - الشبكة / Network
- **access** - الصلاحيات / Access
- **other** - أخرى / Other

## الشركات المدعومة / Supported Companies

- **smart oasis** - Smart Oasis
- **rasep** - RASEP
- **edk** - EDK
- **bwe** - BWE

## النشر على الإنترنت / Online Deployment

لنشر النظام على الإنترنت وجعله متاحاً من أي مكان:
To deploy the system online and make it accessible from anywhere:

### الخيارات المتاحة / Deployment Options

1. **Vercel** - للواجهة الأمامية / For frontend
2. **Railway** - للخادم الخلفي / For backend
3. **Heroku** - للخادم الخلفي / For backend
4. **Render** - للخادم الخلفي / For backend

### خطوات النشر على Railway / Railway Deployment Steps

1. أنشئ حساب على Railway.com
2. أنشئ مشروع جديد
3. اربط مستودع GitHub الخاص بك
4. أضف متغيرات البيئة:
   - `PORT=5000`
5. Railway سيقوم بتثبيت التبعيات وتشغيل الخادم تلقائياً

### خطوات نشر الواجهة على Vercel / Vercel Deployment Steps

1. أنشئ حساب على Vercel.com
2. أنشئ مشروع جديد واربطه بـ GitHub
3. حدد مجلد `frontend`
4. أضف متغير البيئة:
   - `VITE_API_URL=https://your-backend-url.railway.app`
5. Vercel سيقوم بالنشر تلقائياً

## معلومات النظام / System Information

- **الموقع / Location:** محطة ميسان الغازية / Maysan Gas Station
- **الشركة الرئيسية / Main Company:** Smart Oasis
- **صمم بواسطة / Designed by:** علي طارق عنيد
- **المسمى الوظيفي / Title:** مسؤول قسم IT Operations
- **الإصدار / Version:** 2.0

## الترخيص / License

هذا المشروع مفتوح المصدر للاستخدام الداخلي في Smart Oasis والشركات التابعة.
This project is open source for internal use at Smart Oasis and affiliated companies.

## الدعم / Support

للدعم والتقارير، يرجى التواصل مع:
For support and reports, please contact:

- **علي طارق عنيد** - مسؤول قسم IT Operations
- **البريد الإلكتروني / Email:** it@smartoasis.com
