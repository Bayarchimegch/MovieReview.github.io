// Системийн theme өөрчлөлтийг илрүүлэх болон тохируулах
function applySystemTheme() {
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  document.documentElement.setAttribute(
    "data-theme",
    systemPrefersDark ? "dark" : "light"
  );
}

// Системийн theme эхэндээ ачаалах
applySystemTheme();

// Системийн theme өөрчлөгдсөн үед мэдэгдэл илгээх
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (event) => {
    const newTheme = event.matches ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
  });

let menu = document.querySelector(".menu");
let mainMenu = document.querySelector(".main-menu");
let rightMenu = document.querySelector(".right");
menu.onclick = function () {
  mainMenu.classList.toggle("active");
  rightMenu.classList.toggle("active");
};
