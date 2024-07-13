export function Task(name, priority, description, dueDate) {
  const getName = () => name;
  const getPriority = () => priority;
  const getDescription = () => description;
  const getDueDate = () => dueDate;
  let isCompleted = false;
  const setName = (newName) => {
    name = newName;
  };
  const setPriority = (newPriority) => {
    priority = newPriority;
  };
  const setDescription = (newDescription) => {
    description = newDescription;
  };
  const setDueDate = (newDueDate) => {
    dueDate = newDueDate;
  };

  return {
    getName,
    getPriority,
    getDueDate,
    getDescription,
    setName,
    setDueDate,
    setPriority,
    setDescription,
  };
}

export function taskDone(task) {
  task.isCompleted = true;
}
