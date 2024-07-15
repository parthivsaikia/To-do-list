import { Projects, Project, addTaskToProject } from "./project";
import { Task } from "./task";
import "./style.css";
function makeElement(name, className) {
  const element = document.createElement(name);
  element.classList.add(className);
  return element;
}

function addTaskBtn() {
  const addTaskBtn = makeElement("button", "add-task-btn");
  addTaskBtn.textContent = "Add Task";
  addTaskBtn.addEventListener("click", takeTaskInput);
  return addTaskBtn;
}

function projectInput() {
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
    event.preventDefault();
    Project(projectNameInput.value);
    renderProjects(document.querySelector(".show-projects-div"));
    projectInputDialog.close();
  });
  cancelBtn.textContent = "Cancel";
  addBtn.textContent = "Add";
  btnDiv.append(cancelBtn, addBtn);
  projectInputDialog.append(addProjectHeader, projectNameInput, btnDiv);

  return projectInputDialog;
}

function tasksInput() {
  const taskInputDialog = makeElement("dialog", "task-input-dialog");
  const taskInputHeading = makeElement("h2", "task-input-heading");
  taskInputHeading.textContent = "Add a task";
  const taskNameInput = makeElement("input", "task-name-input");
  taskNameInput.type = "text";
  taskNameInput.placeholder = "Enter task name";
  const taskDescriptionInput = makeElement("input", "task-description-input");
  taskDescriptionInput.type = "text";
  taskDescriptionInput.placeholder = "Add description";
  const taskPriorityDiv = makeElement("div", "task-priority-div");
  const taskPriorityLabel = makeElement("label", "task-priority-label");
  taskPriorityLabel.textContent = "Priority";
  const taskPriorityInput = makeElement("select", "task-priority-input");
  const priorities = ["Urgent", "High", "Medium", "Low"];
  for (let priority of priorities) {
    const taskPrioritySelection = makeElement(
      "option",
      "task-priority-selection",
    );
    taskPrioritySelection.value = priority;
    taskPrioritySelection.textContent = priority;
    taskPriorityInput.append(taskPrioritySelection);
  }
  taskPriorityDiv.append(taskPriorityLabel, taskPriorityInput);

  const projectSelection = makeElement("select", "project-selection");
  for (let project of Projects) {
    const projectOption = makeElement("option", "project-option");
    if (project.name == "index") {
      projectOption.selected == true;
    }
    projectOption.value = project.name;
    projectOption.textContent = project.name;
    projectSelection.append(projectOption);
  }
  const btnDiv = makeElement("div", "btn-div");
  const cancelBtn = makeElement("button", "cancel-btn");
  cancelBtn.textContent = "Cancel";
  cancelBtn.addEventListener("click", () => {
    taskInputDialog.close();
  });
  const addBtn = makeElement("button", "add-btn");
  addBtn.textContent = "Add";
  addBtn.addEventListener("click", () => {
    event.preventDefault();
    const task = Task(
      taskNameInput.value,
      taskPriorityInput.value,
      taskDescriptionInput.value,
      taskDueDateInput.value,
    );
    const selectedProjectName = projectSelection.value;
    const selectedProject = Projects.find(
      (project) => project.name === selectedProjectName,
    );

    addTaskToProject(task, selectedProject);
    openProject(selectedProject, ".project-name", ".tasks-div");
    taskInputDialog.close();
  });
  btnDiv.append(cancelBtn, addBtn);
  const taskDueDateInputDiv = makeElement("div", "task-duedate-input-div");
  const taskDueDateInput = makeElement("input", "task-duedate-input");
  taskDueDateInput.type = "date";
  const taskDueDateLabel = makeElement("label", "task-duedate-label");
  taskDueDateLabel.textContent = "Due Date";
  taskDueDateInputDiv.append(taskDueDateLabel, taskDueDateInput);

  taskInputDialog.append(
    taskInputHeading,
    taskNameInput,
    taskDescriptionInput,
    taskPriorityDiv,
    taskDueDateInputDiv,
    projectSelection,
    btnDiv,
  );
  return taskInputDialog;
}

function projectsDiv() {
  const projectsDiv = makeElement("div", "projects-div");
  const projectsHeadingDiv = makeElement("div", "projects-heading-div");
  const projectsHeading = makeElement("h3", "projects-heading");
  projectsHeading.textContent = "Projects";
  const addProjectBtn = makeElement("button", "add-project-btn");
  addProjectBtn.textContent = "Add Project";
  addProjectBtn.addEventListener("click", takeProjectInput);
  const showProjectsDiv = makeElement("div", "show-projects-div");

  projectsHeadingDiv.append(projectsHeading, addProjectBtn);
  projectsDiv.append(projectsHeadingDiv, showProjectsDiv);

  // Initial rendering of projects after showProjectsDiv is appended
  renderProjects(showProjectsDiv);

  return projectsDiv;
}

function leftContainer() {
  const leftContainerDiv = makeElement("div", "left-container-div");
  leftContainerDiv.append(addTaskBtn(), projectsDiv());
  return leftContainerDiv;
}

function takeProjectInput() {
  const dialog = document.querySelector(".project-input-dialog");
  if (dialog) {
    dialog.showModal();
  }
}

function takeTaskInput() {
  const dialog = document.querySelector(".task-input-dialog");
  if (dialog) {
    dialog.showModal();
  }
}

function rightContainer() {
  const rightContainerDiv = makeElement("div", "right-container-div");
  const projectName = makeElement("h1", "project-name");
  const tasksDiv = makeElement("div", "tasks-div");
  const addTaskBtn = makeElement("button", "add-task-btn");
  addTaskBtn.textContent = "Add Task";
  addTaskBtn.addEventListener("click", takeTaskInput);
  rightContainerDiv.append(
    projectName,
    tasksDiv,
    addTaskBtn,
    projectInput(),
    tasksInput(),
  );

  console.log("Right container created with project name and tasks div");
  return rightContainerDiv;
}

function mainContainer() {
  const mainContainer = makeElement("div", "main-container");
  mainContainer.append(leftContainer(), rightContainer());
  console.log("Main container created and appended");
  return mainContainer;
}

function openProject(project, projectNameSelector, tasksDivSelector) {
  const projectName = document.querySelector(projectNameSelector);
  const tasksDiv = document.querySelector(tasksDivSelector);

  if (!projectName || !tasksDiv) {
    console.error("Project name or tasks div element not found");
    console.log("projectName:", projectName);
    console.log("tasksDiv:", tasksDiv);
    return;
  }

  projectName.textContent = project.name;
  tasksDiv.innerHTML = "";
  for (let task of project.tasks) {
    const taskBtn = makeElement("button", "task-btn");
    taskBtn.textContent = task.getName();
    tasksDiv.append(taskBtn);
  }
  console.log("Project opened successfully:", project.name);
}

function renderProjects(showProjectsDiv) {
  if (!showProjectsDiv) return;

  showProjectsDiv.innerHTML = "";

  for (let project of Projects) {
    const projectBtn = makeElement("button", "project-btn");
    projectBtn.textContent = `${project.name}`;
    projectBtn.addEventListener("click", () => {
      openProject(project, ".project-name", ".tasks-div");
    });
    showProjectsDiv.append(projectBtn);
  }
}

export function loadUI() {
  const content = document.querySelector(".content");
  content.appendChild(mainContainer());
  console.log("UI loaded, main container appended to content");

  // Check if elements exist
  const projectName = document.querySelector(".project-name");
  const tasksDiv = document.querySelector(".tasks-div");
  console.log("Project name element:", projectName);
  console.log("Tasks div element:", tasksDiv);

  if (Projects.length > 0) {
    openProject(Projects[0], ".project-name", ".tasks-div");
  }
}
