# دليل العمل على موقع ثقة الذهبية

## ملخص المشروع

- **النوع:** Static Export من Next.js 13+ App Router.
- **لا يوجد كود مصدري** (`package.json`, `app/`, `components/`) في هذا المستودع.
- **اللغة:** العربية (RTL) مع دعم إنجليزي اختياري (`?lang=en`).
- **الاستضافة:** GitHub Pages / Static host عبر النطاق `thiqqah.live`.

## قواعد عامة

1. **لا تكسر الروابط:** عند إضافة/نقل/حذف ملفات، تأكد من تحديث جميع الروابط في `index.html`, `404.html`, `404/index.html`, `sitemap.xml`, `site.webmanifest`, وصفحات الكمبيالات.
2. **العمل على Static Export:** بما أنه لا يوجد كود مصدري، يتم التعديل مباشرة على HTML/CSS/JS الثابت.
3. **النسخ الاحتياطي:** قبل تعديل أي أصل (صورة، أيقونة، ملف Firebase)، احفظ النسخة الأصلية في `archive/original-assets/`.
4. **الأمان:** لا تنشر مفاتيح Firebase جديدة. القيم الموجودة في `lib/firebase-config.js` هي مفاتيح عمومية متوقعة في Firebase، لكن قواعد الأمان يجب أن تكون محكمة (انظر المرحلة 5).
5. **SEO:** عند إنشاء صفحة جديدة، تأكد من تضمين:
   - `<title>` و `<meta name="description">` فريدين.
   - `canonical` و `hreflang`.
   - JSON-LD Schema مناسب.
   - إضافة الصفحة إلى `sitemap.xml`.

## الأصول

- الشعار الرئيسي: `assets/thiqqah-logo.png` (1024×725)
- الشعار المربع/الشعار للأيقونات: `assets/thiqqah-logo-new.png` (1024×1024)
- الأيقونات:
  - `favicon.ico` — أحجام 16×16، 32×32، 48×48
  - `favicon.png` — 256×256
  - `apple-touch-icon.png` — 180×180
  - `assets/icon-192.png` — PWA
  - `assets/icon-512.png` — PWA
- صور الخلفية: `modern-building`, `construction-crane`, `tower-city` (يوجد WebP و JPG)

## الأدوات الداخلية

- `letterhead.html` — نسخة المدير (توقيع PDF + ختم + وارد)
- `letterhead-new.html` — نسخة مدير مبسطة
- `letterhead-staff.html` — نسخة الموظف (إرسال وعرض الوارد)
- `test-firebase.html` — اختبار الاتصال بـ Firestore
- إعدادات Firebase: `lib/firebase-config.js`
- قواعد Firebase الحالية: `lib/firebase-rules.txt`

## هيكل الملفات

- `index.html` — الصفحة الرئيسية
- `services/` — صفحات الخدمات المنفصلة (SEO)
- `blog/` — صفحات المدونة
- `404.html` / `404/index.html` — صفحة الخطأ
- `assets/` — الصور والخطوط والأيقونات
- `_next/` — ملفات Next.js الثابتة
- `lib/` — إعدادات Firebase
- `letterhead*.html` — أدوات الكمبيالات
- `scripts/` — سكربتات التطوير (غير منشورة)
- `site.webmanifest` — إعدادات PWA
- `sitemap.xml` — خريطة الموقع
- `robots.txt` — إرشادات محركات البحث

## التطوير

لتحسين الأصول، استخدم:

```bash
python3 scripts/optimize_assets.py
```

لإعادة توليد صفحات الخدمات والمدونة بعد تعديل `scripts/services-data.json`:

```bash
python3 scripts/generate_service_pages.py
```

لتوليد النسخة الإنجليزية من صفحات الخدمات:

```bash
python3 scripts/generate_english_pages.py
```

للنسخ الاحتياطي لوثائق الكمبيالات (يتطلب مفتاح Service Account):

```bash
python3 scripts/backup_letterhead.py
```

## التحليلات وتتبع العملاء

- صفحة `request-quote.html` ترسل الطلبات عبر واتساب بدون حاجة إلى backend.
- يوجد مكان مخصص في `index.html` لتفعيل Google Analytics 4 — استبدل `G-XXXXXXXXXX` بمعرفك.
- يتم تتبع النقرات على واتساب تلقائيًا عبر دالة `trackWaClick()` عند تفعيل GA4.

## الأمان — أدوات الكمبيالات

- **لا يمكن الوصول** إلى `letterhead.html` و `letterhead-new.html` و `letterhead-staff.html` إلا بعد تسجيل الدخول ببريد إلكتروني وكلمة مرور.
- الصلاحيات محكومة بمجموعة `roles` في Firestore (`admin` أو `staff`).
- قواعد Firestore المحدثة موجودة في `lib/firebase-rules.txt` ويجب نسخها إلى Firebase Console.
- تم إصلاح خلل في `letterhead-staff.html` كان يعرض `status: 'stamped'` بدل `status: 'returned'`.
- عند إنشاء مستند جديد، يُسجل `senderUid` لضمان قراءة المستند فقط من المرسل أو المدير.

### خطوات التفعيل

1. فعّل **Email/Password Authentication** في Firebase Console → Authentication → Sign-in method.
2. أنشئ حسابات للمديرين والموظفين.
3. في Firestore، أنشئ مجموعة `roles` ووثائق بمعرف المستخدم (`uid`) تحتوي على حقل `role: 'admin'` أو `role: 'staff'`.
4. انسخ قواعد `lib/firebase-rules.txt` إلى Firebase Console → Firestore Database → Rules.

## المراحل المقترحة

انظر `README.md` وملف الخطة في `.kimi/plans/`.
