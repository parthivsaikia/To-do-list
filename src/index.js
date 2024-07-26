import { loadHomePage } from "./ui-home";
import { loadProjectsPage } from "./ui-project";
import { loadAdd } from "./add";
import { themeChange } from "./theme";
loadHomePage();

const homeBtn = document.querySelector(".home-btn");
const projectsBtn = document.querySelector(".projects-btn");
const addBtn = document.querySelector(".add-btn");
// const homeBtn = document.querySelector('.home-btn');

homeBtn.addEventListener("click", loadHomePage);
projectsBtn.addEventListener("click", loadProjectsPage);
addBtn.addEventListener("click", loadAdd);
const toggleBtn = document.getElementById("toggle-btn");
const root = document.documentElement;

toggleBtn.addEventListener("change", () => {
  if (toggleBtn.checked) {
    root.classList.add("dark");
    root.classList.remove("light");
  } else {
    root.classList.add("light");
    root.classList.remove("dark");
  }
});
