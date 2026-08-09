# دليل النشر والإعدادات — موقع ثقة الذهبية

## 1. نشر الموقع على GitHub Pages

### المتطلبات
- مستودع GitHub متصل بالنطاق `thiqqah.live`
- Git مثبت على جهازك

### الخطوات

```bash
# 1. إضافة جميع التغييرات
git add .

# 2. عمل commit
git commit -m "تحسين شامل: SEO، أداء، أمان، نسخ إنجليزية"

# 3. الرفع إلى GitHub
git push origin main
```

> ملاحظة: إذا كان الفرع الرئيسي لديك هو `master` بدل `main`، استبدل `main` بـ `master`.

### التحقق من النشر
- انتظر 1–5 دقائق بعد الرفع.
- افتح: `https://thiqqah.live`
- تأكد من ظهور الصفحات الجديدة:
  - `https://thiqqah.live/services/`
  - `https://thiqqah.live/blog/`
  - `https://thiqqah.live/en/services/`

---

## 2. تفعيل Google Analytics 4 (GA4)

### الخطوات
1. اذهب إلى [Google Analytics](https://analytics.google.com/)
2. أنشئ حسابًا وممتلكًا (Property) للموقع
3. احصل على **Measurement ID** بصيغة `G-XXXXXXXXXX`
4. افتح ملف `index.html`
5. ابحث عن:
   ```html
   <!-- Google Analytics 4 (ضع معرفك هنا ثم أزل علامات التعليق)
   ```
6. استبدل `G-XXXXXXXXXX` بمعرفك الحقيقي في مكانين:
   - `src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"`
   - `gtag('config', 'G-XXXXXXXXXX');`
7. أزل علامات `<!--` و `-->` حول كود GA4
8. ارفع التغييرات إلى GitHub

---

## 3. Google Search Console

1. اذهب إلى [Google Search Console](https://search.google.com/search-console)
2. أضف الموقع كـ Domain أو URL Prefix
3. أكد ملكية الموقع عبر:
   - إضافة سجل TXT في إعدادات DNS، أو
   - رفع ملف HTML إلى المجلد الرئيسي
4. بعد التأكد، أرسل `sitemap.xml`:
   - `https://thiqqah.live/sitemap.xml`

---

## 4. تفعيل أمان Firebase (مهم جدًا)

### 4.1 تفعيل Email/Password Authentication
1. اذهب إلى [Firebase Console](https://console.firebase.google.com/)
2. اختر مشروع `thiqqah-letterhead`
3. Build → Authentication → Sign-in method
4. فعّل **Email/Password**
5. احفظ التغييرات

### 4.2 إنشاء حسابات المستخدمين
1. Authentication → Users
2. أضف مستخدمين:
   - مدير (admin) — للوصول إلى `letterhead.html` و `letterhead-new.html`
   - موظف (staff) — للوصول إلى `letterhead-staff.html`
3. دوّن **UID** لكل مستخدم

### 4.3 إضافة الأدوار في Firestore
1. Firestore Database → Data
2. أنشئ collection جديدة باسم `roles`
3. أنشئ وثيقة لكل مستخدم:
   - Document ID = UID الخاص بالمستخدم
   - الحقول:
     - `role`: `admin` أو `staff`

### 4.4 تطبيق قواعد الأمان
1. Firestore Database → Rules
2. انسخ محتوى `lib/firebase-rules.txt`
3. الصقه في مربع القواعد
4. انقر **Publish**

### 4.5 اختبار الأمان
1. افتح `https://thiqqah.live/letterhead-staff.html`
2. يجب أن يظهر نموذج تسجيل الدخول
3. سجّل الدخول بحساب staff
4. جرّب إرسال مستند
5. كرر الاختبار مع حساب admin على `letterhead.html`

---

## 5. نسخ احتياطي للكمبيالات

### المتطلبات
```bash
pip install firebase-admin
```

### التشغيل
```bash
# Linux / macOS
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
python3 scripts/backup_letterhead.py

# Windows PowerShell
$env:GOOGLE_APPLICATION_CREDENTIALS="C:\path\to\service-account.json"
python3 scripts/backup_letterhead.py
```

### الحصول على مفتاح Service Account
1. Firebase Console → Project Settings → Service Accounts
2. اختر Python وانقر "Generate new private key"
3. احفظ الملف بأمان ولا ترفعه إلى GitHub

---

## 6. استبدال نماذج آراء العملاء

1. افتح `testimonials.html`
2. استبدل النصوص الوهمية بآراء حقيقية من عملائك
3. يمكنك إضافة صور أو أسماء حقيقية
4. ارفع التغييرات

---

## 7. التحقق النهائي بعد النشر

افتح هذه الروابط وتأكد من عملها:
- [ ] `https://thiqqah.live/`
- [ ] `https://thiqqah.live/services/`
- [ ] `https://thiqqah.live/services/company-formation.html`
- [ ] `https://thiqqah.live/blog/`
- [ ] `https://thiqqah.live/en/services/`
- [ ] `https://thiqqah.live/en/services/company-formation.html`
- [ ] `https://thiqqah.live/request-quote.html`
- [ ] `https://thiqqah.live/about.html`
- [ ] `https://thiqqah.live/faq.html`
- [ ] `https://thiqqah.live/sitemap.xml`
- [ ] `https://thiqqah.live/letterhead.html` (يجب أن تطلب تسجيل دخول)

---

## ملاحظات أمان

- لا ترفع مفتاح Service Account إلى GitHub.
- لا ترفع ملفات `archive/` إلى GitHub (مستبعدة عبر `.gitignore`).
- راجع `lib/firebase-rules.txt` دوريًا.
