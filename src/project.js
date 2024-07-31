import { saveProjects, loadProjects } from "./storage";
import { Task, taskMethods } from "./task";

export let Projects = loadProjects();

export function Project(projectName) {
  const project = {
    name: projectName,
    tasks: [],
  };
  Projects.push(project);
  saveProjects(Projects);
  return project;
}

export function addTaskToProject(task, project) {
  const newTask = { ...task, ...taskMethods(task) };
  project.tasks.push(newTask);
  saveProjects(Projects);
}

export function showProjects() {
  for (let project of Projects) {
    console.log(project.name);
    for (let task of project.tasks) {
      console.log(`Task name:${task.getName()}`);
      console.log(`Priority:${task.getPriority()}`);
      console.log(`Due date:${task.getDueDate()}`);
    }
    console.log("----------------------------");
  }
}

// project.js

export function deleteProject(projectName) {
  Projects = Projects.filter((project) => project.name !== projectName);
  saveProjects(Projects);
}

export function deleteTaskFromProject(task, projectName) {
  const project = Projects.find((p) => p.name === projectName);
  if (project) {
    project.tasks = project.tasks.filter((t) => t !== task);
    saveProjects(Projects);
  }
}
