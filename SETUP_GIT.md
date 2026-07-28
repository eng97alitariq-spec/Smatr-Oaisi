# 📦 تثبيت Git ورفع المشروع على GitHub

## الخطوة 1: تثبيت Git

### على Windows:
1. افتح المتصفح واذهب إلى: https://git-scm.com/download/win
2. قم بتحميل أحدث إصدار من Git
3. قم بتشغيل الملف المحمل
4. اضغط على "Next" في جميع الخطوات (الإعدادات الافتراضية جيدة)
5. اضغط على "Finish" عند الانتهاء

### التحقق من التثبيت:
بعد التثبيت، افتح PowerShell واكتب:
```bash
git --version
```

---

## الخطوة 2: إنشاء حساب على GitHub

1. افتح [github.com](https://github.com)
2. اضغط على "Sign up"
3. املأ البيانات المطلوبة
4. تحقق من بريدك الإلكتروني

---

## الخطوة 3: إنشاء مستودع جديد على GitHub

1. بعد تسجيل الدخول، اضغط على "+" في الزاوية اليمنى العليا
2. اختر "New repository"
3. املأ البيانات:
   - **Repository name**: `Smatr Oaisi`
   - **Description**: `نظام إدارة الخدمات - Smart Oasis`
   - **Public/Private**: اختر Private (أفضل)
4. اضغط على "Create repository"

---

## الخطوة 4: رفع المشروع على GitHub

بعد تثبيت Git، افتح PowerShell واتبع هذه الخطوات:

### 1. انتقل إلى مجلد المشروع:
```bash
cd "c:\Users\ali\Desktop\Smatr Oaisi"
```

### 2. تهيئة Git:
```bash
git init
```

### 3. إضافة جميع الملفات:
```bash
git add .
```

### 4. إنشاء أول commit:
```bash
git commit -m "Initial commit - Smart Oasis IT Ticket System"
```

### 5. ربط المستودع البعيد:
استبدل `YOUR_USERNAME` باسم مستخدم GitHub الخاص بك:
```bash
git remote add origin https://github.com/YOUR_USERNAME/Smatr-Oaisi.git
```

### 6. رفع المشروع:
```bash
git branch -M main
git push -u origin main
```

---

## الخطوة 5: إدخال بيانات GitHub

عند تشغيل `git push`، سيطلب منك:
- **Username**: اسم مستخدم GitHub
- **Password**: استخدم Personal Access Token (ليس كلمة مرور الحساب)

### إنشاء Personal Access Token:
1. اذهب إلى GitHub → Settings → Developer settings
2. اختر "Personal access tokens" → "Tokens (classic)"
3. اضغط "Generate new token (classic)"
4. اختر "repo" في الصلاحيات
5. اضغط "Generate token"
6. انسخ الرابط (لن يظهر مرة أخرى!)

---

## ✅ بعد رفع المشروع

بعد رفع المشروع بنجاح، يمكنك:
1. الذهاب إلى [render.com](https://render.com) لنشر الخادم الخلفي
2. الذهاب إلى [vercel.com](https://vercel.com) لنشر الواجهة الأمامية

---

## 🆘 إذا واجهت مشاكل

### مشكلة: "git is not recognized"
**الحل**: تأكد من تثبيت Git وأعد تشغيل PowerShell

### مشكلة: "Authentication failed"
**الحل**: استخدم Personal Access Token بدلاً من كلمة المرور

### مشكلة: "Permission denied"
**الحل**: تأكد من أن المستودع على GitHub موجود وأن لديك صلاحيات الكتابة

---

## 📞 المساعدة

إذا واجهت أي مشاكل، أخبرني بالخطوة التي توقفت فيها وسأساعدك!
