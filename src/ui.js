import { Projects, Project } from "./project";

function makeElement(name, className) {
  const element = document.createElement(name);
  element.classList.add(className);
  return element;
}

function addTaskBtn() {
  const addTaskBtn = makeElement("button", "add-task-btn");
  addTaskBtn.textContent = "Add Task";
  return addTaskBtn;
}

function projectsDiv() {
  const projectsDiv = makeElement("div", "projects-div");
  const projectsHeadingDiv = makeElement("div", "projects-heading-div");
  const projectsHeading = makeElement("h3", "projects-heading");
  const addProjectBtn = makeElement("button", "add-project-btn");
  addProjectBtn.textContent = "Add Project";
  const showProjectsDiv = makeElement("div", "show-projects-div");
  //rendering the projects names
  for (let project of Projects) {
    const projectDisplay = makeElement("button", "project-display");
    projectDisplay.textContent = project.name;
    showProjectsDiv.append(projectDisplay);
  }

  projectsHeadingDiv.append(projectsHeading, addProjectBtn);
  projectsDiv.append(projectsHeadingDiv, showProjectsDiv);

  return projectsDiv;
}

function leftContainer() {
  const leftContainerDiv = makeElement("div", "left-container-div");
  leftContainerDiv.append(addTaskBtn(), projectsDiv());
  return leftContainerDiv;
}

function mainContainer() {
  const mainContainer = makeElement("div", "main-container");
  mainContainer.append(leftContainer());
  return mainContainer;
}

export function loadUI() {
  const content = document.querySelector(".content");
  content.appendChild(mainContainer());
}
