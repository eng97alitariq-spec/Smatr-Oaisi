# 🚀 دليل نشر نظام إدارة الخدمات - Smart Oasis

## 📋 نظرة عامة

هذا الدليل يشرح كيفية نشر نظام إدارة الخدمات على السحابة ليعمل من أي مكان في العالم.

## 🔧 المتطلبات الأساسية

- Node.js (الإصدار 18 أو أحدث)
- npm أو yarn
- حساب على منصة سحابية (Vercel, Netlify, Render, Heroku, إلخ)
- قاعدة بيانات MongoDB Atlas (اختياري للإنتاج)

## 📁 هيكل المشروع

```
Smatr Oaisi/
├── backend/              # الخادم الخلفي (Node.js + Express)
│   ├── server.js       # الملف الرئيسي للخادم
│   ├── .env            # متغيرات البيئة
│   └── package.json    # تبعيات المشروع
├── frontend/           # الواجهة الأمامية (React + Vite)
│   ├── src/
│   │   ├── components/ # مكونات React
│   │   └── config/     # ملفات التكوين
│   ├── .env            # متغيرات البيئة
│   └── package.json    # تبعيات المشروع
└── README.md          # هذا الملف
```

## 🌦️ نشر الخادم الخلفي (Backend)

### الخطوة 1: إعداد قاعدة البيانات

1. قم بإنشاء حساب على [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. أنشئ مجموعة جديدة (Cluster)
3. احصل على رابط الاتصال (Connection String)
4. أضف رابط الاتصال إلى ملف `.env`:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smartoasis?retryWrites=true&w=majority
```

### الخطوة 2: نشر على Render

1. قم بإنشاء حساب على [Render](https://render.com)
2. أنشئ Web Service جديد
3. قم بربط مستودع GitHub الخاص بك
4. أضف متغيرات البيئة التالية:

```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smartoasis?retryWrites=true&w=majority
FRONTEND_URL=https://your-frontend-url.com
JWT_SECRET=your_jwt_secret_key_here
```

5. اضغط على "Deploy"

### الخطوة 3: نشر على Heroku (بديل)

1. قم بتثبيت Heroku CLI:
```bash
npm install -g heroku
```

2. قم بتسجيل الدخول:
```bash
heroku login
```

3. أنشئ تطبيق جديد:
```bash
heroku create smartoasis-backend
```

4. أضف متغيرات البيئة:
```bash
heroku config:set PORT=5000
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smartoasis?retryWrites=true&w=majority
heroku config:set FRONTEND_URL=https://your-frontend-url.com
heroku config:set JWT_SECRET=your_jwt_secret_key_here
```

5. اضغط الكود:
```bash
git push heroku main
```

## 🎨 نشر الواجهة الأمامية (Frontend)

### الخطوة 1: إعداد متغيرات البيئة

قم بتحديث ملف `frontend/.env.production`:

```env
VITE_API_URL=https://your-backend-url.com
VITE_NODE_ENV=production
```

### الخطوة 2: نشر على Vercel

1. قم بإنشاء حساب على [Vercel](https://vercel.com)
2. قم بتثبيت Vercel CLI:
```bash
npm install -g vercel
```

3. انتقل إلى مجلد الواجهة الأمامية:
```bash
cd frontend
```

4. قم بتسجيل الدخول:
```bash
vercel login
```

5. اضغط المشروع:
```bash
vercel
```

6. أضف متغيرات البيئة عند الطلب:
```
VITE_API_URL=https://your-backend-url.com
VITE_NODE_ENV=production
```

### الخطوة 3: نشر على Netlify (بديل)

1. قم بإنشاء حساب على [Netlify](https://netlify.com)
2. قم بربط مستودع GitHub الخاص بك
3. أضف إعدادات البناء:

```
Build command: npm run build
Publish directory: dist
```

4. أضف متغيرات البيئة:
```
VITE_API_URL=https://your-backend-url.com
VITE_NODE_ENV=production
```

## 🔗 تحديث روابط API

بعد نشر الخادم الخلفي والواجهة الأمامية، قم بتحديث:

1. **ملف backend/.env**:
```env
FRONTEND_URL=https://your-frontend-domain.com
```

2. **ملف frontend/.env.production**:
```env
VITE_API_URL=https://your-backend-domain.com
```

## 🧪 الاختبار

### اختبار محلي

1. قم بتشغيل الخادم الخلفي:
```bash
cd backend
npm install
npm run dev
```

2. قم بتشغيل الواجهة الأمامية:
```bash
cd frontend
npm install
npm run dev
```

3. افتح المتصفح على `http://localhost:3000`

### اختبار الإنتاج

1. قم بزيارة رابط الواجهة الأمامية المنشورة
2. قم باختبار تسجيل الدخول
3. قم بإنشاء تذكرة جديدة
4. تأكد من أن جميع الوظائف تعمل بشكل صحيح

## 🔒 الأمان

### نصائح أمان مهمة:

1. **لا ترفع ملفات .env إلى GitHub**
   - أضف `.env` إلى `.gitignore`
   - استخدم متغيرات البيئة في منصة النشر

2. **استخدم كلمات مرور قوية**
   - قم بتغيير JWT_SECRET إلى كلمة مرور قوية
   - استخدم كلمات مرور معقدة لقاعدة البيانات

3. **تفعيل HTTPS**
   - تأكد من أن جميع الروابط تستخدم HTTPS
   - معظم منصات النشر توفر HTTPS تلقائياً

4. **تحديث التبعيات بانتظام**
```bash
cd backend
npm update

cd ../frontend
npm update
```

## 📊 المراقبة والصيانة

### استخدام MongoDB Atlas

1. قم بمراقبة استخدام قاعدة البيانات من لوحة التحكم
2. قم بإعداد تنبيهات لاستخدام الموارد
3. قم بإنشاء نسخ احتياطية دورية

### استخدام سجلات النشر

- **Render**: من لوحة التحكم → Logs
- **Heroku**: `heroku logs --tail`
- **Vercel**: من لوحة التحكم → Logs

## 🆚 استكشاف الأخطاء

### المشكلة: لا يمكن الاتصال بقاعدة البيانات

**الحل:**
- تأكد من أن رابط MongoDB صحيح
- تحقق من أن IP الخاص بك مضاف إلى قائمة البيضاء في MongoDB Atlas
- تأكد من أن اسم المستخدم وكلمة المرور صحيحة

### المشكلة: أخطاء CORS

**الحل:**
- تأكد من أن FRONTEND_URL في backend/.env صحيح
- تحقق من أن الواجهة الأمامية تستخدم HTTPS

### المشكلة: الصور لا تظهر

**الحل:**
- تأكد من أن مجلد `uploads` موجود في الخادم
- تحقق من أن API_URL في الواجهة الأمامية صحيح

## 📞 الدعم

إذا واجهت أي مشاكل:
1. راجع هذا الدليل
2. تحقق من سجلات الأخطاء
3. تأكد من أن جميع متغيرات البيئة صحيحة

## 🎉 الخلاصة

الآن نظام إدارة الخدمات جاهز للعمل على السحابة! يمكن للمستخدمين الوصول إليه من أي مكان في العالم.

---

**صمم بواسطة: علي طارق عنيد - مسؤول قسم IT Operations**
**محطة ميسان الغازية - Smart Oasis**
