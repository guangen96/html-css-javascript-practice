const content = document.getElementById("content");
const toDoContainer = document.getElementsByClassName("to-do-container");
const taskList = document.getElementsByClassName("task-list");
const addTaskButton = document.getElementsByClassName("add-task");
const tasks = document.getElementsByClassName("tasks");
const task = document.getElementsByClassName("task");
const tasksCompleted = document.getElementsByClassName("completed-tasks");
const taskCompleted = document.getElementsByClassName("completed-task");
const tasksCompletedHeader =
  document.getElementsByClassName("completed-header");
const addListContainer = document.getElementById("add-container");
const addListButton = document.getElementById("add-button");
const toDoTemplate = document.getElementById("empty-to-do");
const inputTitleTemplate =
  document.getElementsByClassName("input-title hidden");

const searchFilter = document.getElementById("search-filter");
const deleteContainerButton = document.querySelectorAll(
  ".to-do-container-header > span"
);

readFromLocalStorage();
setInterval(saveToLocalStorage, 2000);

// Search filter (for now only implemented for incomplete task)
searchFilter.addEventListener("change", () => {
  const filterValue = document
    .getElementById("search-input")
    .value.toUpperCase();

  // get task container values
  const toDoContainerTask = document.querySelectorAll(".task > input");
  const toDoContainerTaskArray = [];
  Array.from(toDoContainerTask).forEach((element, index) => {
    toDoContainerTaskArray.push(element.value.toUpperCase());
  });

  // loop through and show if task text matches the filtervalue
  for (i = 0; i < toDoContainerTask.length; i++) {
    txtValue = toDoContainerTaskArray[i];
    if (txtValue.toUpperCase().indexOf(filterValue) > -1) {
      toDoContainerTask[i].parentNode.style.display = "";
    } else {
      toDoContainerTask[i].parentNode.style.display = "none";
    }
  }
});

// Add new list
addListButton.addEventListener("click", () => {
  // Display input element for user to input title
  addListContainer.style.display = "none";
  const newInputTitle = inputTitleTemplate[0].cloneNode(true);
  newInputTitle.classList.remove("hidden");
  content.insertBefore(newInputTitle, addListContainer);

  // focus user to input list title
  const newinputTitleText = newInputTitle.children[0];
  newinputTitleText.focus();

  // Add event listener to read user input for list title (by click)
  window.addEventListener("click", submitTitle);

  function submitTitle() {
    // skip for add-button (first click when user click add new list)
    if (event.target.id == "add-button") return;
    // if user click outside, abort create new container and show back add list container
    if (
      event.target != newInputTitle &&
      !newInputTitle.contains(event.target)
    ) {
      // remove title input container
      newInputTitle.remove();
      // redisplay addlistcontainer
      addListContainer.style.display = "flex";
      window.removeEventListener("click", submitTitle);
      return;
    } else if (event.target == newinputTitleText) return;

    // else create new container
    const newContainer = createNewContainer([newinputTitleText.value]);
    content.insertBefore(newContainer, addListContainer);
    // remove input-title container
    newInputTitle.remove();
    // redisplay add list container
    addListContainer.style.display = "flex";
    window.removeEventListener("click", submitTitle);
  }

  // Add event listener to read user input for list title (by keypress enter)
  newInputTitle.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      const newContainer = createNewContainer([newinputTitleText.value]);
      content.insertBefore(newContainer, addListContainer);
      // remove input-title container
      newInputTitle.remove();
      // redisplay add list container
      addListContainer.style.display = "flex";
      window.removeEventListener("click", submitTitle);
    }
  });
});

// create newcontainer from add list and from reading data from local storage
function createNewContainer(
  title,
  index,
  taskCount,
  task,
  completedTaskCount,
  completedTask
) {
  // create new container (even if header is empty)
  const newContainer = toDoTemplate.cloneNode(true);
  newContainer.removeAttribute("id");

  const newContainerHeader = document.createElement("div");
  const newContainerInput = document.createElement("input");
  const newContainerHeaderClose = document.createElement("span");
  newContainerHeader.className = "to-do-container-header";
  newContainerInput.placeholder = "input header";
  newContainerInput.value = title; // could be empty (didn't do validation)
  newContainerHeaderClose.innerHTML = "X";
  newContainerHeader.appendChild(newContainerInput);
  newContainerHeader.appendChild(newContainerHeaderClose);
  newContainer.prepend(newContainerHeader);

  // add event listeners
  const newContainerTaskButton = newContainer.children[1].children[0];
  const newContainerCompletedHeader =
    newContainer.children[1].children[2].children[0];
  const newContainerDeleteContainerButton =
    newContainer.children[0].children[1];
  addTaskButtonListener(newContainerTaskButton);
  addTaskCompletedHeaderListener(newContainerCompletedHeader);
  addDeleteContainerButtonListener(newContainerDeleteContainerButton);

  // the steps below this if statement is for creating new container when loading from localstorage
  if (taskCount == undefined) return newContainer;

  // populate tasks
  let taskLowerIndex = 0;
  let taskUpperIndex = 0;
  for (let i = 0; i < index; i++) {
    taskLowerIndex += taskCount[i];
  }
  if (index == 0) {
    taskUpperIndex = taskCount[0];
  } else {
    taskUpperIndex = taskLowerIndex + taskCount[index];
  }

  for (let i = taskLowerIndex; i < taskUpperIndex; i++) {
    const newTask = document.createElement("li");
    newTask.className = "task";
    const radioIcon = document.createElement("i");
    radioIcon.classList.add("bx", "bx-radio-circle");
    newTask.prepend(radioIcon);
    newContainerTaskButton.nextElementSibling.appendChild(newTask);

    // add input value
    const newInput = document.createElement("input");
    newInput.type = "text";
    newInput.value = task[i];
    newTask.appendChild(newInput);

    // add eventlistener
    addTaskListener(newTask);
  }

  // populate completed tasks
  let taskCompletedLowerIndex = 0;
  let taskCompletedUpperIndex = 0;
  for (let i = 0; i < index; i++) {
    taskCompletedLowerIndex += completedTaskCount[i];
  }
  if (index == 0) {
    taskCompletedUpperIndex = completedTaskCount[0];
  } else {
    taskCompletedUpperIndex =
      taskCompletedLowerIndex + completedTaskCount[index];
  }

  for (let i = taskCompletedLowerIndex; i < taskCompletedUpperIndex; i++) {
    // locate completed task area
    const newCompletedTasks = newContainer.children[1].children[2].children[1];

    // create / load completed task from local storage
    const newCompletedTask = document.createElement("li");
    const newCompletedTaskIcon = document.createElement("i");
    newCompletedTaskIcon.classList.add("bx");
    newCompletedTaskIcon.classList.add("bx-check");
    newCompletedTask.className = "completed-task";
    newCompletedTask.prepend(newCompletedTaskIcon);
    const convertedSpan = document.createElement("span");
    convertedSpan.innerHTML = completedTask[i];
    newCompletedTask.appendChild(convertedSpan);
    newCompletedTasks.appendChild(newCompletedTask);
  }

  return newContainer;
}

// -------- Section BELOW is for all the listeners relating to each to-do container
function addDeleteContainerButtonListener(deleteContainerButton, index, array) {
  deleteContainerButton.addEventListener("click", () => {
    const container = deleteContainerButton.parentNode.parentNode;
    const warning = "Confirm to delete?";
    if (confirm(warning) == true) container.remove();
    else return;
  });
}

function addTaskCompletedHeaderListener(header, index, array) {
  header.addEventListener("click", () => {
    const completedTasks = header.nextElementSibling;
    completedTasks.classList.toggle("hidden");

    // adjust max-height of task
    if (completedTasks.classList.contains("hidden"))
      header.parentNode.previousElementSibling.style.maxHeight = "600px";
    else {
      const heightDiff = 600 - completedTasks.offsetHeight;
      header.parentNode.previousElementSibling.style.maxHeight = `${heightDiff}px`;
    }
  });
}

function addTaskButtonListener(taskButton, index, array) {
  taskButton.addEventListener("click", (event) => {
    // create a new row of task
    const newTask = document.createElement("li");
    newTask.className = "task";
    const radioIcon = document.createElement("i");
    radioIcon.classList.add("bx", "bx-radio-circle");
    newTask.prepend(radioIcon);
    taskButton.nextElementSibling.prepend(newTask);
    // move focus to new row task for user to input
    const newInput = document.createElement("input");
    newInput.type = "text";
    newTask.appendChild(newInput);
    newInput.focus();

    // add event listener for new task
    addTaskListener(newTask);
  });
}

function addTaskListener(task, index, array) {
  // add event listener for radio icon
  task.children[0].addEventListener("click", () => {
    // move task to completed task area
    const tasksCompleted = task.parentNode.nextElementSibling.children[1];
    tasksCompleted.prepend(task);

    // convert task to completed task
    task.className = "completed-task";
    task.children[0].classList.add("bx-check");
    task.children[0].classList.remove("bx-radio-circle");
    const convertedSpan = document.createElement("span");
    convertedSpan.innerHTML = task.children[1].value;
    task.appendChild(convertedSpan);
    task.removeChild(task.children[1]);

    // adjust height of container if opened
    const completedTasks = task.parentNode;
    const tasks = completedTasks.parentNode.previousElementSibling;
    if (!completedTasks.classList.contains("hidden")) {
      const heightDiff = 600 - completedTasks.offsetHeight;
      tasks.style.maxHeight = `${heightDiff}px`;
    }
  });

  task.children[1].addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      if (task.children[1].value == "") {
        alert("please input a task value");
        return;
      }

      // create a new row of task
      const newTask = document.createElement("li");
      newTask.className = "task";
      const radioIcon = document.createElement("i");
      radioIcon.classList.add("bx", "bx-radio-circle");
      newTask.prepend(radioIcon);
      insertAfter(task, newTask);
      // move focus to new row task for user to input
      const newInput = document.createElement("input");
      newInput.type = "text";
      newTask.appendChild(newInput);
      newInput.focus();

      // add event listener for new task
      addTaskListener(newTask);
    }
  });
}
// -------- Section ABOVE is for all the listeners relating to each to-do container

// Utilities and save/read local storage
function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function saveToLocalStorage() {
  localStorage.clear();
  // save header
  const toDoContainerHeader = document.querySelectorAll(
    ".to-do-container-header > input"
  );
  const toDoContainerHeaderArray = [];
  Array.from(toDoContainerHeader).forEach((element) => {
    toDoContainerHeaderArray.push(element.value);
  });
  localStorage.setItem(
    "container-header",
    JSON.stringify(toDoContainerHeaderArray)
  );

  // save task count for each tasklist, except index 0 (template)
  const toDoContainerTasks = document.querySelectorAll(".tasks ");
  const toDoContainerTasksArray = [];
  Array.from(toDoContainerTasks).forEach((element, index) => {
    if (index != 0) toDoContainerTasksArray.push(element.childElementCount);
  });
  localStorage.setItem("taskCount", JSON.stringify(toDoContainerTasksArray));

  // save tasks
  const toDoContainerTask = document.querySelectorAll(".task > input");
  const toDoContainerTaskArray = [];
  Array.from(toDoContainerTask).forEach((element, index) => {
    toDoContainerTaskArray.push(element.value);
  });
  localStorage.setItem("task", JSON.stringify(toDoContainerTaskArray));

  // save task count for completed tasklist
  const toDoContainerCompletedTasks =
    document.querySelectorAll(".completed-tasks");
  const toDoContainerCompletedTasksArray = [];
  Array.from(toDoContainerCompletedTasks).forEach((element, index) => {
    if (index != 0)
      toDoContainerCompletedTasksArray.push(element.childElementCount);
  });
  localStorage.setItem(
    "completedTaskCount",
    JSON.stringify(toDoContainerCompletedTasksArray)
  );

  // save completed tasks
  const toDoContainerCompletedTask = document.querySelectorAll(
    ".completed-task > span"
  );
  const toDoContainerCompletedTaskArray = [];
  Array.from(toDoContainerCompletedTask).forEach((element, index) => {
    toDoContainerCompletedTaskArray.push(element.innerHTML);
  });
  localStorage.setItem(
    "completedTask",
    JSON.stringify(toDoContainerCompletedTaskArray)
  );
}

function readFromLocalStorage() {
  // get values
  if (localStorage.getItem("container-header") == null) {
    return;
  }
  const header = JSON.parse(localStorage.getItem("container-header"));
  const taskCount = JSON.parse(localStorage.getItem("taskCount"));
  const task = JSON.parse(localStorage.getItem("task"));
  const completedTaskCount = JSON.parse(
    localStorage.getItem("completedTaskCount")
  );
  const completedTask = JSON.parse(localStorage.getItem("completedTask"));
  // create new container for each header
  header.forEach((element, index) => {
    const newContainer = createNewContainer(
      element,
      index,
      taskCount,
      task,
      completedTaskCount,
      completedTask
    );
    content.insertBefore(newContainer, addListContainer);
  });
}
