import { loadHomePage } from "./ui-home";
import { loadProjectsPage } from "./ui-project";
import { loadAdd } from "./add";
loadHomePage();

const homeBtn = document.querySelector(".home-btn");
const projectsBtn = document.querySelector(".projects-btn");
const addBtn = document.querySelector(".add-btn");
// const homeBtn = document.querySelector('.home-btn');
// const homeBtn = document.querySelector('.home-btn');

homeBtn.addEventListener("click", loadHomePage);
projectsBtn.addEventListener("click", loadProjectsPage);
addBtn.addEventListener("click", loadAdd);
