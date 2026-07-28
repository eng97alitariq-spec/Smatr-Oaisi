@echo off
echo ========================================
echo رفع مشروع Smart Oasis على GitHub
echo ========================================
echo.

cd "c:\Users\ali\Desktop\Smatr Oaisi"

echo [1/6] تهيئة Git...
git init
if errorlevel 1 (
    echo خطأ: Git غير مثبت!
    echo يرجى تثبيت Git من: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo.
echo [2/6] إضافة جميع الملفات...
git add .

echo.
echo [3/6] إنشاء Commit...
git commit -m "Initial commit - Smart Oasis IT Ticket System"

echo.
echo [4/6] ربط المستودع البعيد...
git remote add origin https://github.com/eng97alitariq-spec/Smatr-Oaisi.git

echo.
echo [5/6] تسمية الفرع الرئيسي...
git branch -M main

echo.
echo [6/6] رفع المشروع على GitHub...
git push -u origin main

echo.
echo ========================================
echo تم رفع المشروع بنجاح!
echo ========================================
echo.
echo رابط المستودع: https://github.com/eng97alitariq-spec/Smatr-Oaisi
echo.
pause
