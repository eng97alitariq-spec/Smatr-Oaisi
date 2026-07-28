# 📤 رفع المشروع على GitHub بدون Git

## الطريقة 1: استخدام واجهة GitHub الويب (الأسهل)

### الخطوة 1: ضغط المشروع
1. افتح مجلد: `c:\Users\ali\Desktop\Smatr Oaisi`
2. حدد جميع الملفات والمجلدات
3. اضغط بزر الماوس الأيمن
4. اختر "Send to" → "Compressed (zipped) folder"
5. سمِّ الملف: `Smatr-Oaisi.zip`

### الخطوة 2: رفع الملف على GitHub
1. افتح المستودع: https://github.com/eng97alitariq-spec/Smatr-Oaisi
2. اضغط على "uploading an existing file"
3. اسحب ملف `Smatr-Oaisi.zip` وأفلته في المنطقة المخصصة
4. اضغط على "Commit changes"

### الخطوة 3: فك الضغط (للاستخدام لاحقاً)
بعد النشر، ستحتاج لفك الضغط على الخادم.

---

## الطريقة 2: تثبيت Git (موصى به للنشر السحابي)

### تثبيت Git:
1. افتح المتصفح واذهب إلى: https://git-scm.com/download/win
2. قم بتحميل Git وتثبيته
3. أعد تشغيل PowerShell بعد التثبيت

### بعد التثبيت:
1. افتح PowerShell
2. اكتب: `cd "c:\Users\ali\Desktop\Smatr Oaisi"`
3. اكتب: `.\upload_to_github.bat`

---

## ⚠️ ملاحظة مهمة

للنشر السحابي على Render و Vercel، **يجب استخدام Git** لأن هذه المنصات تتطلب ربط مستودع GitHub.

لذا أنصحك بتثبيت Git أولاً ثم استخدام الملف `upload_to_github.bat`.

---

## 🆘 المساعدة

إذا واجهت أي مشاكل:
1. في تثبيت Git - أخبرني بالخطوة
2. في رفع الملف - أخبرني بالخطوة
