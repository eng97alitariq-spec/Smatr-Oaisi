# 🚀 دليل النشر السريع - Smart Oasis

## الخطوة 1: نشر الخادم الخلفي على Render

### 1. إنشاء حساب على Render
1. افتح [render.com](https://render.com)
2. قم بالتسجيل باستخدام حساب GitHub
3. اضغط على "New +" ثم "Web Service"

### 2. ربط مستودع GitHub
1. اضغط على "Connect GitHub"
2. ابحث عن مستودع "Smatr Oaisi"
3. اضغط على "Connect"

### 3. إعدادات النشر
```
Name: smartoasis-backend
Root Directory: backend
Build Command: npm install
Start Command: node server.js
```

### 4. إضافة متغيرات البيئة
أضف المتغيرات التالية في قسم "Environment Variables":

```
PORT = 5000
NODE_ENV = production
FRONTEND_URL = https://smartoasis.vercel.app
JWT_SECRET = smartoasis_secure_jwt_2024_secret_key
```

### 5. النشر
1. اضغط على "Create Web Service"
2. انتظر حتى ينتهي النشر (يستغرق 3-5 دقائق)
3. ستحصل على رابط مثل: `https://smartoasis-backend.onrender.com`

---

## الخطوة 2: نشر الواجهة الأمامية على Vercel

### 1. إنشاء حساب على Vercel
1. افتح [vercel.com](https://vercel.com)
2. قم بالتسجيل باستخدام حساب GitHub

### 2. استيراد المشروع
1. اضغط على "Add New" ثم "Project"
2. ابحث عن مستودع "Smatr Oaisi"
3. اضغط على "Import"

### 3. إعدادات النشر
```
Framework Preset: Vite
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
```

### 4. إضافة متغيرات البيئة
أضف المتغيرات التالية في قسم "Environment Variables":

```
VITE_API_URL = https://smartoasis-backend.onrender.com
VITE_NODE_ENV = production
```

### 5. النشر
1. اضغط على "Deploy"
2. انتظر حتى ينتهي النشر (يستغرق 1-2 دقيقة)
3. ستحصل على رابط مثل: `https://smartoasis.vercel.app`

---

## الخطوة 3: تحديث الروابط

### تحديث backend/.env
بعد الحصول على رابط Vercel، قم بتحديث متغير FRONTEND_URL في Render:

```
FRONTEND_URL = https://smartoasis.vercel.app
```

### تحديث frontend/.env.production
تأكد من أن VITE_API_URL يحتوي على رابط Render:

```
VITE_API_URL = https://smartoasis-backend.onrender.com
```

---

## الخطوة 4: الاختبار

1. افتح رابط Vercel في المتصفح
2. قم باختبار تسجيل الدخول
3. قم بإنشاء تذكرة جديدة
4. تأكد من أن جميع الوظائف تعمل

---

## 🎉 الخلاصة

بعد إكمال هذه الخطوات، سيكون لديك:
- **رابط الخادم الخلفي**: `https://smartoasis-backend.onrender.com`
- **رابط الواجهة الأمامية**: `https://smartoasis.vercel.app`

يمكنك مشاركة رابط الواجهة الأمامية مع أي شخص للوصول إلى النظام من أي مكان في العالم!
