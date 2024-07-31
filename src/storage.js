// storage.js

import { taskMethods } from "./task";

export function saveProjects(projects) {
  localStorage.setItem("projects", JSON.stringify(projects));
}

export function loadProjects() {
  const projectsJSON = localStorage.getItem("projects");
  if (projectsJSON) {
    const projects = JSON.parse(projectsJSON);
    // Reconstruct tasks with their methods
    return projects.map((project) => ({
      ...project,
      tasks: project.tasks.map((task) => ({ ...task, ...taskMethods(task) })),
    }));
  }
  return [
    { name: "Inbox", tasks: [] },
    { name: "Make a Rocket", tasks: [] },
  ];
}

export function clearProjects() {
  localStorage.removeItem("projects");
}
