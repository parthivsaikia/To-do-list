import { Task, taskDone } from "./task.js";

export const Projects = [
  { name: "Inbox", tasks: [] },
  { name: "Make a Rocket", tasks: [] },
];
export function Project(projectName) {
  const project = {
    name: projectName,
    tasks: [],
  };
  Projects.push(project);
  return project;
}

export function addTaskToProject(task, project) {
  project.tasks.push(task);
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

export function deleteProject(projectName) {
  for (let i = 0; i < Projects.length; i++) {
    if (Projects[i].name === projectName) {
      Projects.splice(i, 1);
      break;
    }
  }
}

export function deleteTaskFromProject(task, projectName) {
  for (let i = 0; i < Projects.length; i++) {
    if (Projects[i].name == projectName) {
      const index = Projects[i].tasks.indexOf(task);
      Projects[i].tasks.splice(index, 1);
      break;
    }
  }
}

const toWrite = Task("write", "high", "write a story", "today");

const home = Project("Home");
addTaskToProject(toWrite, home);
// deleteProject("inbox");
deleteTaskFromProject(toWrite, "home");
showProjects();
console.log(Projects);
