/* =========================
   MATERIALS DATA
========================= */
const materials = [
  { id: 1, title: "Pediatric OT", desc: "العلاج الوظيفي للأطفال" },
  { id: 2, title: "Neurological OT", desc: "العلاج العصبي" },
  { id: 3, title: "Geriatric OT", desc: "العلاج لكبار السن" }
];

/* =========================
   DOM READY
========================= */
document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     MATERIALS LIST
  ========================= */
  const list = document.getElementById("materialsList");
  if (list) {
    list.innerHTML = ""; // تنظيف قبل الإضافة
    materials.forEach(m => {
      list.innerHTML += `
        <div class="card">
          <h3>${m.title}</h3>
          <p>${m.desc}</p>
          <a class="btn" href="material.html?id=${m.id}">فتح المادة</a>
        </div>
      `;
    });
  }

  /* =========================
     SINGLE MATERIAL
  ========================= */
  const title = document.getElementById("materialTitle");
  if (title) {
    const params = new URLSearchParams(window.location.search);
    const matId = params.get("id");
    const mat = materials.find(m => m.id == matId);

    if (mat) {
      title.textContent = mat.title;
    }
  }

  /* =========================
     LOGIN
  ========================= */
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {

    // لو المستخدم مسجّل أصلاً، ما يخليه يرجع لصفحة login
    if (localStorage.getItem("isLoggedIn") === "true") {
      window.location.href = "dashboard.html";
      return;
    }

    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value;

      if (!email || !password) {
        alert("⚠️ يرجى تعبئة جميع الحقول");
        return;
      }

      const users = JSON.parse(localStorage.getItem("users")) || [];

      const user = users.find(
        u => u.email === email && u.password === password
      );

      // ❌ فقط هنا يظهر الخطأ
      if (!user) {
        alert("❌ البريد الإلكتروني أو كلمة المرور غير صحيحة");
        return;
      }

      // ✅ تسجيل دخول ناجح
      localStorage.setItem("currentUser", JSON.stringify(user));
      localStorage.setItem("isLoggedIn", "true");

      loginForm.reset();
      window.location.href = "dashboard.html";
    });
  }

});

