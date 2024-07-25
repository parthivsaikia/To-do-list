import { deleteTaskFromProject } from "./project";
import { makeElement } from "./ui-home";

function tasksPageContainer() {
  const tasksPageContainerDiv = makeElement("div", "tasks-page-container-div");
  const projectNameHeading = makeElement("h1", "project-name-heading");
  const showTasksDiv = makeElement("div", "show-tasks-div");
  tasksPageContainerDiv.append(projectNameHeading, showTasksDiv);
  return tasksPageContainerDiv;
}

export function loadTasksPage() {
  const main = document.querySelector("main");
  main.innerHTML = "";
  main.append(tasksPageContainer());
}

export function openProject(project) {
  const projectNameHeading = document.querySelector(".project-name-heading");
  projectNameHeading.textContent = project.name;
  const showTasksDiv = document.querySelector(".show-tasks-div");
  for (let task of project.tasks) {
    const taskDiv = makeElement("div", "task-div");
    const taskCheckBtn = makeElement("input", "task-check-btn");
    taskCheckBtn.type = "checkbox";
    const taskName = makeElement("p", "task-name");
    taskName.textContent = task.getName();
    const deleteBtn = makeElement("button", "delete-btn");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      deleteTaskFromProject(task, project.name);
    });
    taskDiv.append(taskCheckBtn, taskName, deleteBtn);
    showTasksDiv.append(taskDiv);
  }
}
