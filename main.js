document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     DARK MODE
  ========================= */
  const darkToggle = document.getElementById("darkToggle");

  if (darkToggle) {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark");
      darkToggle.textContent = "☀️";
    }

    darkToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      const isDark = document.body.classList.contains("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      darkToggle.textContent = isDark ? "☀️" : "🌙";
    });
  }

  /* =========================
     STICKY NAVBAR
  ========================= */
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 20);
    });
  }

  /* =========================
     RESPONSIVE MENU
  ========================= */
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");
  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  /* =========================
     AUTH GUARD
  ========================= */
  const protectedPages = [
    "dashboard.html",
    "profile.html",
    "materials.html",
    "quizzes.html"
  ];

  const currentPage = window.location.pathname.split("/").pop();
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (protectedPages.includes(currentPage) && !isLoggedIn) {
    window.location.href = "login.html";
  }

  /* =========================
     DASHBOARD / USER NAME
  ========================= */
  const studentName = document.getElementById("studentName");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (studentName) {
    studentName.textContent = currentUser ? currentUser.name : "زائر";
  }

  /* =========================
     LOGOUT BUTTON
  ========================= */
  const logoutBtn = document.getElementById("logoutBtn");
  const logoutItem = document.getElementById("logoutItem");

  // عرض زر تسجيل الخروج فقط إذا مسجل دخول
  if (isLoggedIn && logoutItem) {
    logoutItem.style.display = "block";
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      // مسح بيانات الجلسة
      localStorage.removeItem("currentUser");
      localStorage.removeItem("isLoggedIn");

      // إخفاء زر الخروج فورًا
      if (logoutItem) logoutItem.style.display = "none";

      // إعادة التوجيه لصفحة تسجيل الدخول
      window.location.href = "login.html";
    });
  }

  /* =========================
     UPDATE NAV LINKS BASED ON LOGIN
  ========================= */
  const loginLink = document.getElementById("loginLink");
  const signupLink = document.getElementById("signupLink");
  const userNameItem = document.getElementById("userName");

  if (isLoggedIn) {
    if (loginLink) loginLink.style.display = "none";
    if (signupLink) signupLink.style.display = "none";
    if (userNameItem && currentUser) {
      userNameItem.style.display = "inline-block";
      userNameItem.textContent = currentUser.name;
    }
  } else {
    if (loginLink) loginLink.style.display = "inline-block";
    if (signupLink) signupLink.style.display = "inline-block";
    if (userNameItem) userNameItem.style.display = "none";
  }

});
