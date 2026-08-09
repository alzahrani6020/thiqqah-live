/**
 * Letterhead Authentication Guard
 * Requires Firebase Email/Password sign-in before accessing letterhead tools.
 * Roles are read from Firestore /roles/{uid} (admin | staff).
 */
(function() {
  'use strict';

  var PAGE_ROLES = {
    'letterhead.html': ['admin'],
    'letterhead-new.html': ['admin'],
    'letterhead-staff.html': ['admin', 'staff']
  };

  var path = window.location.pathname.split('/').pop() || 'letterhead.html';
  var allowedRoles = PAGE_ROLES[path] || [];

  function createOverlay() {
    var div = document.createElement('div');
    div.id = 'lh-auth-overlay';
    div.style.cssText = 'position:fixed;inset:0;background:rgba(10,30,24,0.96);z-index:99999;display:flex;align-items:center;justify-content:center;direction:rtl;font-family:"Noto Sans Arabic",Tahoma,Arial,sans-serif;';
    div.innerHTML =
      '<div style="background:#fff;width:min(420px,92%);padding:2rem;border-radius:16px;box-shadow:0 20px 60px rgba(0,0,0,0.3);">' +
        '<h2 style="margin:0 0 0.5rem;color:#0f5f3e;font-size:1.4rem;">تسجيل الدخول</h2>' +
        '<p style="margin:0 0 1.25rem;color:#555;font-size:0.95rem;">أدخل بيانات حسابك للوصول إلى أداة الكمبيالات</p>' +
        '<div id="lh-auth-error" style="display:none;background:#fdecea;color:#c0392b;padding:0.75rem;border-radius:8px;margin-bottom:1rem;font-size:0.9rem;"></div>' +
        '<form id="lh-auth-form">' +
          '<div style="margin-bottom:1rem;">' +
            '<label style="display:block;margin-bottom:0.35rem;font-weight:700;color:#1a1a1a;">البريد الإلكتروني</label>' +
            '<input type="email" id="lh-auth-email" required style="width:100%;padding:0.75rem 1rem;border:1px solid #e8e4dc;border-radius:8px;font-size:1rem;font-family:inherit;">' +
          '</div>' +
          '<div style="margin-bottom:1.25rem;">' +
            '<label style="display:block;margin-bottom:0.35rem;font-weight:700;color:#1a1a1a;">كلمة المرور</label>' +
            '<input type="password" id="lh-auth-password" required style="width:100%;padding:0.75rem 1rem;border:1px solid #e8e4dc;border-radius:8px;font-size:1rem;font-family:inherit;">' +
          '</div>' +
          '<button type="submit" style="width:100%;padding:0.85rem;background:#0f5f3e;color:#fff;border:none;border-radius:8px;font-size:1rem;font-weight:700;cursor:pointer;">دخول</button>' +
        '</form>' +
        '<p style="margin-top:1rem;font-size:0.85rem;color:#777;text-align:center;">إذا نسيت كلمة المرور، تواصل مع المسؤول.</p>' +
      '</div>';
    document.body.appendChild(div);

    document.getElementById('lh-auth-form').addEventListener('submit', function(e) {
      e.preventDefault();
      var email = document.getElementById('lh-auth-email').value.trim();
      var password = document.getElementById('lh-auth-password').value;
      var errBox = document.getElementById('lh-auth-error');
      errBox.style.display = 'none';
      if (!firebase || !firebase.auth) { errBox.textContent = 'Firebase Auth غير متوفر'; errBox.style.display = 'block'; return; }
      firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(function(err) {
          errBox.textContent = 'خطأ في تسجيل الدخول: ' + (err.message || err);
          errBox.style.display = 'block';
        });
    });
  }

  function showError(msg) {
    var div = document.createElement('div');
    div.style.cssText = 'position:fixed;inset:0;background:#0a1e18;z-index:99999;display:flex;align-items:center;justify-content:center;direction:rtl;color:#fff;font-family:"Noto Sans Arabic",Tahoma,Arial,sans-serif;';
    div.innerHTML = '<div style="text-align:center;padding:2rem;"><h2 style="color:#c0392b;">غير مصرح</h2><p>' + msg + '</p><a href="/" style="color:#c9a227;">العودة للرئيسية</a></div>';
    document.body.appendChild(div);
  }

  function checkAuth() {
    if (!firebase || !firebase.auth || !db) {
      showError('Firebase غير متصل. تأكد من الإعدادات.');
      return;
    }
    firebase.auth().onAuthStateChanged(function(user) {
      if (!user) {
        createOverlay();
        return;
      }
      db.collection('roles').doc(user.uid).get().then(function(doc) {
        if (!doc.exists) {
          firebase.auth().signOut();
          showError('لا يوجد دور مسند لهذا الحساب.');
          return;
        }
        var role = doc.data().role;
        if (allowedRoles.indexOf(role) === -1) {
          firebase.auth().signOut();
          showError('ليس لديك صلاحية الوصول إلى هذه الصفحة.');
          return;
        }
        // Authorized — hide overlay if present
        var overlay = document.getElementById('lh-auth-overlay');
        if (overlay) overlay.remove();
      }).catch(function(err) {
        firebase.auth().signOut();
        showError('خطأ في التحقق من الدور: ' + (err.message || err));
      });
    });
  }

  // Wait for Firebase to be ready
  function waitForFirebase() {
    if (typeof firebase !== 'undefined' && firebase.auth && firebase.firestore) {
      checkAuth();
    } else {
      setTimeout(waitForFirebase, 100);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForFirebase);
  } else {
    waitForFirebase();
  }
})();
