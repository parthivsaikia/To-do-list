import { Projects, Project, addTaskToProject } from "./project";
import { Task } from "./task";
import "./style.css";
import { homePage } from "./ui-home";
const mainBody = homePage();
export function loadUI() {
  const main = document.querySelector("main");
  main.appendChild(mainBody);
}
