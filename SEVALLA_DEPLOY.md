# 🚀 دليل نشر Smart Oasis على Sevalla

## ما هو Sevalla؟
Sevalla منصة استضافة سحابية حديثة تدعم:
- Node.js و Express
- ربط مع GitHub
- قواعد بيانات PostgreSQL
- $50 رصيد مجاني
- نشر سريع وسهل

---

## الخطوة 1: إنشاء حساب على Sevalla

1. افتح [sevalla.com](https://sevalla.com)
2. اضغط "Sign up"
3. اختر "Sign up with GitHub"
4. اضغط "Authorize sevalla"
5. سيتم إنشاء حسابك مع $50 رصيد مجاني

---

## الخطوة 2: إنشاء تطبيق للخادم الخلفي

### 2.1 إنشاء التطبيق
1. في لوحة التحكم، اضغط "Applications"
2. اضغط "Create an app"
3. اختر "Connect GitHub repository"
4. ابحث عن "Smatr-Oaisi"
5. اختر الفرع "main"
6. املأ البيانات:
```
App name: smartoasis-backend
Region: اختر المنطقة الأقرب إليك (مثلاً: Frankfurt)
Pod size: 0.5 CPU / 1GB RAM (مجاني مع الرصيد)
```
7. اضغط "Create" (لا تضغط Deploy الآن)

---

## الخطوة 3: إعدادات البناء

### 3.1 إعدادات البناء الأساسية
1. اذهب إلى "Settings" → "Build"
2. تأكد من أن "Build environment" هو "Nixpacks"
3. سيتم اكتشاف `package.json` تلقائياً

### 3.2 إعدادات المجلد الجذري
1. في "Root directory"، اكتب: `backend`
2. هذا سيخبر Sevalla بالبحث عن الملفات في مجلد backend

---

## الخطوة 4: إضافة متغيرات البيئة

1. اذهب إلى "Settings" → "Environment variables"
2. أضف المتغيرات التالية واحداً تلو الآخر:

```
PORT = 5000
NODE_ENV = production
FRONTEND_URL = https://smartoasis-frontend.sevalla.app
JWT_SECRET = smartoasis_secure_jwt_2024_secret_key
```

### كيفية الإضافة:
1. اضغط "Add variable"
2. في "Name": اكتب اسم المتغير
3. في "Value": اكتب القيمة
4. اضغط "Add"
5. كرر لكل متغير

---

## الخطوة 5: النشر

1. اذهب إلى "Deployment"
2. اضغط "Deploy"
3. انتظر حتى ينتهي النشر (1-2 دقيقة)
4. ستظهر علامة صح خضراء عند النجاح

---

## الخطوة 6: الحصول على رابط الخادم الخلفي

1. بعد النشر الناجح
2. اضغط على "Domains" في القائمة الجانبية
3. سترى رابط مثل: `https://smartoasis-backend.sevalla.app`
4. انسخ هذا الرابط

---

## الخطوة 7: إنشاء تطبيق للواجهة الأمامية

### 7.1 إنشاء التطبيق
1. اضغط "Applications"
2. اضغط "Create an app"
3. اختر "Connect GitHub repository"
4. اختر "Smatr-Oaisi" مرة أخرى
5. اختر الفرع "main"
6. املأ البيانات:
```
App name: smartoasis-frontend
Region: نفس منطقة الخادم الخلفي
Pod size: 0.5 CPU / 1GB RAM
```
7. اضغط "Create"

### 7.2 إعدادات البناء
1. اذهب إلى "Settings" → "Build"
2. في "Root directory"، اكتب: `frontend`
3. في "Build command"، اكتب: `npm run build`
4. في "Output directory"، اكتب: `dist`

### 7.3 إضافة متغيرات البيئة
```
VITE_API_URL = https://smartoasis-backend.sevalla.app
VITE_NODE_ENV = production
```

### 7.4 النشر
1. اذهب إلى "Deployment"
2. اضغط "Deploy"
3. انتظر حتى ينتهي النشر

---

## الخطوة 8: تحديث متغيرات البيئة

### تحديث FRONTEND_URL في الخادم الخلفي:
1. اذهب إلى تطبيق الخادم الخلفي
2. "Settings" → "Environment variables"
3. حدّث `FRONTEND_URL` إلى: `https://smartoasis-frontend.sevalla.app`
4. أعد نشر الخادم الخلفي

---

## الخطوة 9: اختبار النظام

1. افتح رابط الواجهة الأمامية
2. قم باختبار تسجيل الدخول
3. قم بإنشاء تذكرة جديدة
4. تأكد من أن جميع الوظائف تعمل

---

## ✅ الخلاصة

بعد إكمال هذه الخطوات، سيكون لديك:
- **رابط الخادم الخلفي**: `https://smartoasis-backend.sevalla.app`
- **رابط الواجهة الأمامية**: `https://smartoasis-frontend.sevalla.app`

يمكنك مشاركة رابط الواجهة الأمامية مع أي شخص للوصول إلى النظام من أي مكان في العالم!

---

## 🆛 استكشاف الأخطاء

### مشكلة: فشل النشر
**الحل**: تحقق من سجلات الأخطاء في قسم "Logs"

### مشكلة: متغيرات البيئة لا تعمل
**الحل**: تأكد من كتابة الأسماء والقيم بشكل صحيح

### مشكلة: الواجهة الأمامية لا تتصل بالخادم
**الحل**: تأكد من أن `VITE_API_URL` صحيح

---

## 📞 المساعدة

إذا واجهت أي مشاكل، أخبرني بالخطوة التي توقفت فيها!
