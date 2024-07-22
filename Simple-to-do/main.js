const content = document.getElementById("content");
const toDoContainer = document.getElementsByClassName("to-do-container");
const taskList = document.getElementsByClassName("task-list");
const addTaskButton = document.getElementsByClassName("add-task");
const tasks = document.getElementsByClassName("tasks");
const task = document.getElementsByClassName("task");
const tasksCompleted = document.getElementsByClassName("completed-tasks");
const taskCompleted = document.getElementsByClassName("completed-task");
const addListContainer = document.getElementById("add-container");
const addListButton = document.getElementById("add-button");
const toDoTemplate = document.getElementById("empty-to-do");
const inputTitleTemplate =
  document.getElementsByClassName("input-title hidden");

addListButton.addEventListener("click", () => {
  // Display input element for user to input title
  addListContainer.style.display = "none";
  const newInputTitle = inputTitleTemplate[0].cloneNode(true);
  newInputTitle.classList.remove("hidden");
  content.insertBefore(newInputTitle, addListContainer);

  // Add event listener for next step
  const inputTitleAddButton =
    document.getElementsByClassName("input-title-add");
  inputTitleAddButton[1].addEventListener("click", createNewContainer);

  const inputTitle = document.querySelectorAll(".input-title:not(.hidden)");
  inputTitle[0].addEventListener("keypress", () => {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      createNewContainer();
    }
  });
});

function createNewContainer() {
  // Read title value input by user
  const inputTitleText = document.querySelectorAll(
    ".input-title:not(.hidden) > .input-title-text"
  )[0].value;

  // create new container
  const newContainer = toDoTemplate.cloneNode(true);
  newContainer.removeAttribute("id");

  const newContainerHeader = document.createElement("p");
  newContainerHeader.innerHTML = inputTitleText;
  const newContainerHeaderClose = document.createElement("span");
  newContainerHeaderClose.innerHTML = "X";
  newContainerHeader.appendChild(newContainerHeaderClose);

  newContainer.prepend(newContainerHeader);
  content.insertBefore(newContainer, addListContainer);

  // remove input-title container
  const inputTitle = document.querySelectorAll(".input-title:not(.hidden)");
  console.log(inputTitle);
  inputTitle[0].remove();

  // redisplay add list container
  addListContainer.style.display = "flex";
}
