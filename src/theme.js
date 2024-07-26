export function themeChange() {
  const root = document.documentElement;
  if (root.className == "dark") {
    root.className = "light";
  } else {
    root.className == "dark";
  }
}
