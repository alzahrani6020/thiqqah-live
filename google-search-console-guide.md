# دليل Google Search Console لـ thiqqah.live

## الخطوة 1: إضافة الموقع إلى Search Console
1. افتح: https://search.google.com/search-console
2. سجّل الدخول بحساب Google.
3. اختر "URL prefix" وأدخل: `https://thiqqah.live/`
4. اختر طريقة التحقق المناسبة:
   - **HTML file upload**: ارفع الملف المطلوب إلى مجلد الموقع الجذر
   - **HTML tag**: أضف الـ meta tag في `<head>` الخاص بـ `index.html`
   - **Domain**: إذا كان لديك وصول إلى إعدادات DNS

## الخطوة 2: إرسال Sitemap
بعد التحقق:
1. من القائمة الجانبية، اختر **Sitemaps**.
2. أدخل: `sitemap.xml`
3. اضغط **Submit**.

## الخطوة 3: طلب فهرسة الصفحات
1. اذهب إلى **URL Inspection**.
2. أدخل رابط الصفحة الرئيسية: `https://thiqqah.live/`
3. اضغط **Request Indexing**.
4. كرر الخطوة للصفحات المهمة (الخدمات، المدونة، المدن).

## الخطوة 4: المتابعة الدورية
تحقق من:
- **Performance**: عدد الظهورات والنقرات والكلمات المفتاحية
- **Coverage**: الصفحات المفهرسة والأخطاء
- **Core Web Vitals**: سرعة وأداء الموقع
- **Mobile Usability**: مشاكل العرض على الجوال

## ملاحظات مهمة
- قد يستغرق ظهور التغييرات في Google من أيام إلى أسابيع.
- حافظ على تحديث الموقع بانتظام بمحتوى جديد.
- تأكد من عدم وجود روابط معطلة.
- استخدم الكلمات المفتاحية بشكل طبيعي في العناوين والوصف.

## إذا واجهتك مشكلة
- تأكد من أن `sitemap.xml` يعمل: https://thiqqah.live/sitemap.xml
- تأكد من أن `robots.txt` يسمح بالفهرسة: https://thiqqah.live/robots.txt
- تحقق من عدم وجود علامة `noindex` في الصفحات المهمة.
