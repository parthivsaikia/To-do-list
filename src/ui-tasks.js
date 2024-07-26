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
  renderTasks(project);
}

function renderTasks(project) {
  const showTasksDiv = document.querySelector(".show-tasks-div");
  showTasksDiv.innerHTML = ""; // Clear the existing tasks

  for (let task of project.tasks) {
    const taskDiv = makeElement("div", "task-div");
    const taskCheckBtn = makeElement("input", "task-check-btn");
    taskCheckBtn.type = "checkbox";
    taskCheckBtn.addEventListener("change", () => {
      if (taskCheckBtn.checked) {
        deleteTaskFromProject(task, project.name);
        renderTasks(project); // Re-render tasks after deletion
      }
    });
    const taskName = makeElement("p", "task-name");
    taskName.textContent = task.getName();
    const deleteBtn = makeElement("button", "delete-btn");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      deleteTaskFromProject(task, project.name);
      renderTasks(project); // Re-render tasks after deletion
    });
    const showTaskDetailsBtn = makeElement("button", "show-task-details-btn");
    showTaskDetailsBtn.textContent = "Show Details";
    showTaskDetailsBtn.addEventListener("click", () => {
      showDetailsOfTask(task).showModal();
    });
    taskDiv.append(taskCheckBtn, taskName, showTaskDetailsBtn, deleteBtn);
    showTasksDiv.append(taskDiv);
  }
}

function showDetailsOfTask(task) {
  const showDetailsDialog = makeElement("dialog", "show-details-dialog");
  const main = document.querySelector("main");
  main.append(showDetailsDialog);
  const nameDiv = makeElement("div", "name-div");
  const nameLabel = makeElement("p", "label");
  nameLabel.textContent = "Name";
  const taskName = makeElement("p", "task-name");
  nameDiv.append(nameLabel, taskName);
  taskName.textContent = task.getName();
  const descriptionDiv = makeElement("div", "description-div");
  const descriptionLabel = makeElement("p", "label");
  descriptionLabel.textContent = "Description";
  const taskDescription = makeElement("p", "task-details");
  taskDescription.textContent = task.getDescription();
  descriptionDiv.append(descriptionLabel, taskDescription);

  const dueDateDiv = makeElement("div", "due-date-div");
  const dueDateLabel = makeElement("p", "label");
  dueDateLabel.textContent = "Due Date";
  const taskDueDate = makeElement("p", "task-due-date");
  taskDueDate.textContent = task.getDueDate();
  dueDateDiv.append(dueDateLabel, taskDueDate);
  const priorityDiv = makeElement("div", "priority-div");
  const priorityLabel = makeElement("p", "label");
  priorityLabel.textContent = "Priority";
  const taskPriority = makeElement("p", "task-priority");
  taskPriority.textContent = task.getPriority();
  priorityDiv.append(priorityLabel, taskPriority);
  const cancelBtn = makeElement("button", "cancel-btn");
  cancelBtn.textContent = "Cancel";
  cancelBtn.addEventListener("click", () => {
    showDetailsDialog.close();
  });
  showDetailsDialog.append(
    nameDiv,
    descriptionDiv,
    priorityDiv,
    dueDateDiv,
    cancelBtn
  );
  return showDetailsDialog;
}
