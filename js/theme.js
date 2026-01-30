// ===================================
// THEME LOGIC
// ===================================

function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute("data-bs-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  html.setAttribute("data-bs-theme", newTheme);
  updateThemeIcon(newTheme);
  localStorage.setItem("theme", newTheme);
}

function updateThemeIcon(theme) {
  const btn = document.getElementById("themeBtn");
  btn.innerHTML =
    theme === "dark"
      ? '<i data-lucide="sun" class="lucide lucide-sun"></i>'
      : '<i data-lucide="moon" class="lucide lucide-moon"></i>';
  lucide.createIcons();
}

// Initialize theme on load
const savedTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-bs-theme", savedTheme);

// Make functions globally accessible for inline event handlers and app.js
window.toggleTheme = toggleTheme;
window.updateThemeIcon = updateThemeIcon;
