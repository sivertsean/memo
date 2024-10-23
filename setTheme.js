const defaultTheme = document.getElementById("default-theme");
const sakuraTheme = document.getElementById("sakura-theme");
const neonTheme = document.getElementById("neon-theme");
const page = document.getElementById("page");

// Load theme from local memory
loadTheme()

// Change theme on click
defaultTheme.addEventListener("click", event => {
    page.className = "";
    page.classList.add("default");
    saveTheme("default");
});

sakuraTheme.addEventListener("click", event => {
    page.className = "";
    page.classList.add("sakura");
    saveTheme("sakura");
});

neonTheme.addEventListener("click", event => {
    page.className = "";
    page.classList.add("neon");
    saveTheme("neon");
});

// Load theme from local memory
function loadTheme() {
    const localTheme = localStorage.getItem("theme");
    page.classList.add(localTheme);
}

// Save theme to local memory
function saveTheme(theme) {
    localStorage.setItem("theme",theme);
}