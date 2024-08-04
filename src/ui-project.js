import { makeElement } from "./ui-home";
import { Projects, Project, deleteProject } from "./project";
import { loadTasksPage, openProject } from "./ui-tasks";
import { tasksInput } from "./add";
import "./style.css";
import deleteIcon from "./images/deleteicon.svg";
import task from "./images/tasks.svg";
import addtask from "./images/addtask.svg";

export function projectPageContainer() {
  const projectPageContainerDiv = makeElement("div", "project-page-container");
  const projectHeadingDiv = makeElement("div", "project-heading-div");
  const projectHeading = makeElement("h1", "project-heading");
  const addProjectBtn = makeElement("button", "add-project-btn");

  addProjectBtn.addEventListener("click", () => {
    const takeProjectInput = document.querySelector(".project-input-dialog");
    takeProjectInput.showModal();
  });

  addProjectBtn.textContent = "Add new Project";
  projectHeading.textContent = "My Projects";
  projectHeadingDiv.append(projectHeading);
  projectPageContainerDiv.append(projectHeadingDiv, addProjectBtn);

  const projectsDiv = makeElement("div", "projects-div");

  projectPageContainerDiv.append(projectsDiv);

  // Append projectPageContainerDiv to the DOM first before making project cards
  document.querySelector("main").append(projectPageContainerDiv);

  for (let project of Projects) {
    makeProjectCard(project);
  }

  return projectPageContainerDiv;
}

export function projectInput() {
  const addProjectHeader = makeElement("h2", "add-project-header");
  addProjectHeader.textContent = "Add Project";
  const projectInputDialog = makeElement("dialog", "project-input-dialog");
  const projectNameInput = makeElement("input", "project-name-input");
  projectNameInput.type = "text";
  const btnDiv = makeElement("div", "btn-div");
  const cancelBtn = makeElement("button", "cancel-btn");

  cancelBtn.addEventListener("click", () => {
    projectInputDialog.close();
  });

  const addBtn = makeElement("button", "add-btn");
  addBtn.addEventListener("click", (event) => {
    const projectsDiv = document.querySelector(".projects-div");
    projectsDiv.innerHTML = "";
    event.preventDefault();
    Project(projectNameInput.value);

    for (let project of Projects) {
      makeProjectCard(project);
    }
    projectInputDialog.close();
  });

  cancelBtn.textContent = "Cancel";
  addBtn.textContent = "Add";
  btnDiv.append(cancelBtn, addBtn);
  projectInputDialog.append(addProjectHeader, projectNameInput, btnDiv);

  return projectInputDialog;
}

export function loadProjectsPage() {
  const main = document.querySelector("main");
  main.innerHTML = "";
  main.append(projectPageContainer(), projectInput());
}

function makeProjectCard(project) {
  const projectsDiv = document.querySelector(".projects-div");

  // Check if projectsDiv is found
  if (!projectsDiv) {
    console.error("projectsDiv is null");
    return;
  }

  const projectCardDiv = makeElement("div", "project-card");
  const projectName = makeElement("p", "project-name");
  const showDetailsBtn = makeElement("button", "show-details-btn");

  showDetailsBtn.addEventListener("click", () => {
    loadTasksPage();
    openProject(project);
  });

  const addTaskBtn = makeElement("button", "add-task-btn");
  const addTaskIcon = new Image();
  addTaskIcon.src = addtask;
  addTaskBtn.append(addTaskIcon);
  const taskIcon = new Image();
  taskIcon.src = task;
  showDetailsBtn.append(taskIcon);
  const deleteProjectBtn = makeElement("button", "delete-project-btn");
  const deleteImg = new Image();
  deleteImg.src = deleteIcon;
  deleteProjectBtn.append(deleteImg);
  const projectsBtnDiv = makeElement("div", "projects-btn-div");
  projectsBtnDiv.append(showDetailsBtn, addTaskBtn, deleteProjectBtn);
  projectCardDiv.append(projectName, projectsBtnDiv);

  projectName.textContent = project.name;

  addTaskBtn.addEventListener("click", () => {
    const main = document.querySelector("main");
    main.append(tasksInput());
    const taskInput = document.querySelector(".task-input-dialog");
    taskInput.showModal();
  });

  deleteProjectBtn.append();
  deleteProjectBtn.addEventListener("click", () => {
    deleteProject(project.name);
    const projectsDiv = document.querySelector(".projects-div");
    projectsDiv.innerHTML = "";
    for (let project of Projects) {
      makeProjectCard(project);
    }
  });

  projectsDiv.append(projectCardDiv);
}
