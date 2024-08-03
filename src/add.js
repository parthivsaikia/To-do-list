import { makeElement } from "./ui-home";
import { Task } from "./task";
import { Projects, Project, addTaskToProject } from "./project";
import { loadTasksPage, openProject } from "./ui-tasks";
import { loadProjectsPage } from "./ui-project";

export function tasksInput() {
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
      "task-priority-selection"
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
      projectOption.selected = true;
    }
    projectOption.value = project.name;
    projectOption.textContent = project.name;
    projectSelection.append(projectOption);
  }

  const taskDueDateInputDiv = makeElement("div", "task-duedate-input-div");
  const taskDueDateInput = makeElement("input", "task-duedate-input");
  taskDueDateInput.type = "date";
  const taskDueDateLabel = makeElement("label", "task-duedate-label");
  taskDueDateLabel.textContent = "Due Date";
  taskDueDateInputDiv.append(taskDueDateLabel, taskDueDateInput);

  const btnDiv = makeElement("div", "btn-div");
  const cancelBtn = makeElement("button", "cancel-btn");
  cancelBtn.textContent = "Cancel";
  cancelBtn.addEventListener("click", () => {
    taskInputDialog.close();
  });

  const addBtn = makeElement("button", "add-btn");
  addBtn.textContent = "Add";
  addBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const task = Task(
      taskNameInput.value,
      taskPriorityInput.value,
      taskDescriptionInput.value,
      taskDueDateInput.value
    );
    const selectedProjectName = projectSelection.value;
    const selectedProject = Projects.find(
      (project) => project.name === selectedProjectName
    );

    addTaskToProject(task, selectedProject);
    loadTasksPage();
    openProject(selectedProject);
    taskInputDialog.close();
  });

  btnDiv.append(cancelBtn, addBtn);

  taskInputDialog.append(
    taskInputHeading,
    taskNameInput,
    taskDescriptionInput,
    taskPriorityDiv,
    taskDueDateInputDiv,
    projectSelection,
    btnDiv
  );

  return taskInputDialog;
}

function projectInputMod() {
  const projectInputDialog = makeElement("dialog", "project-input-dialog");
  const projectInputHeading = makeElement("h1", "project-input-heading");
  projectInputHeading.textContent = "Add a Project";
  const projectNameInput = makeElement("input", "project-name-input");
  projectNameInput.type = "text";
  projectNameInput.placeholder = "Project Name";
  const cancelBtn = makeElement("button", "cancel-btn");
  cancelBtn.textContent = "Cancel";
  cancelBtn.addEventListener("click", () => {
    projectInputDialog.close();
  });
  const addBtn = makeElement("button", "add-btn");
  addBtn.textContent = "Add";
  addBtn.addEventListener("click", () => {
    event.preventDefault();
    Project(projectNameInput.value);
    loadProjectsPage();
  });
  const btnDiv = makeElement("div", "btn-div");
  btnDiv.append(cancelBtn, addBtn);
  projectInputDialog.append(projectInputHeading, projectNameInput, btnDiv);
  return projectInputDialog;
}

export function loadAdd() {
  const main = document.querySelector("main");
  main.innerHTML = "";
  main.append(addTaskOrProjectDialog(), tasksInput(), projectInputMod());
  const addTaskOrProject = document.querySelector(".add-task-or-project");
  addTaskOrProject.showModal();
}

function addTaskOrProjectDialog() {
  const addTaskOrProjectDialog = makeElement("dialog", "add-task-or-project");
  const addTaskOrProjectHeading = makeElement(
    "h3",
    "add-task-or-project-heading"
  );
  addTaskOrProjectHeading.textContent = "Create a new project or a new task";

  const addTaskBtn = makeElement("button", "add-task-btn");
  const addProjectBtn = makeElement("button", "add-project-btn");
  addProjectBtn.addEventListener("click", () => {
    const projectInputDialog = document.querySelector(".project-input-dialog");
    projectInputDialog.showModal();
    addTaskOrProjectDialog.close();
  });
  const cancelBtn = makeElement("button", "cancel-btn");
  addTaskBtn.textContent = "Add a task";
  addProjectBtn.textContent = "Add a new Project";
  cancelBtn.textContent = "Cancel";
  cancelBtn.addEventListener("click", () => {
    addTaskOrProjectDialog.close();
  });

  addTaskBtn.addEventListener("click", () => {
    const taskInput = document.querySelector(".task-input-dialog");
    taskInput.showModal();
    addTaskOrProjectDialog.close();
  });

  addTaskOrProjectDialog.append(
    addTaskOrProjectHeading,
    addTaskBtn,
    addProjectBtn,
    cancelBtn
  );

  return addTaskOrProjectDialog;
}
