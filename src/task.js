// task.js

export function Task(name, priority, description, dueDate) {
  return {
    name,
    priority,
    description,
    dueDate,
    isCompleted: false,
  };
}

export function taskMethods(task) {
  return {
    getName: () => task.name,
    getPriority: () => task.priority,
    getDescription: () => task.description,
    getDueDate: () => task.dueDate,
    setName: (newName) => {
      task.name = newName;
    },
    setPriority: (newPriority) => {
      task.priority = newPriority;
    },
    setDescription: (newDescription) => {
      task.description = newDescription;
    },
    setDueDate: (newDueDate) => {
      task.dueDate = newDueDate;
    },
  };
}

export function taskDone(task) {
  task.isCompleted = true;
}
