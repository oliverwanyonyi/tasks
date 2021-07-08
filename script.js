"use strict";
const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUl = document.querySelector(".todos");
const deleteBtn = document.querySelector(".delete");
let added = document.querySelector(".added-task");
let completed = document.querySelector(".completed-task");
let incomplete = document.querySelector(".incomplete-task");
let clearallbtn = document.querySelector(".clearall-btn");
const menuBtn = document.querySelector(".menu-btn");
let day = document.querySelector(".day");
let currentday = new Date().getDay();

let todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
  todos.forEach((todo) => addTodo(todo));
}
form.addEventListener("submit", (e) => {
  e.preventDefault();

  addTodo();
});

function addTodo(todo) {
  let todoText = input.value;
  if (todo) {
    todoText = todo.text;
  }

  console.log(todoText);

  if (todoText) {
    const todoEL = document.createElement("li");

    if (todo && todo.completed) {
      todoEL.classList.add("completed");
    }

    todoEL.innerHTML = `
 <span>  ${todoText} </span>

    <div class="icons">
    <span class="checkbox"><i class="fas fa-check"></i></span>
    <span class="delete"><i class="fas fa-trash"></i></span>
  </div> `;

    const completeBtn =
      todoEL.firstElementChild.nextElementSibling.firstElementChild;
    updateCompletedTasks(completeBtn, todoEL);
    const deleteBtn =
      todoEL.firstElementChild.nextElementSibling.firstElementChild
        .nextElementSibling;
    removeTasks(deleteBtn, todoEL);

    todosUl.appendChild(todoEL);

    input.value = "";
    updateLs();
  }
}

function updateCompletedTasks(completeBtn, todoEL) {
  completeBtn.addEventListener("click", function () {
    todoEL.classList.toggle("completed");

    if (todoEL.classList.contains("completed")) {
      this.classList.add("active");
    } else {
      this.classList.remove("active");
    }

    updateLs();
  });
}

function removeTasks(deleteBtn, todoEL) {
  deleteBtn.addEventListener("click", () => {
    todoEL.remove();
    updateLs();
  });

  clearallbtn.addEventListener("click", function () {
    todoEL.remove();
    updateLs();
  });
}

function updateLs() {
  const todosEL = document.querySelectorAll("li");
  const todos = [];

  todosEL.forEach((el) => {
    todos.push({
      text: el.innerText,
      completed: el.classList.contains("completed"),
    });
  });

  countTasks(todos);

  localStorage.setItem("todos", JSON.stringify(todos));
}

function countTasks(todos) {
  added.innerText = todos.length;
  const completedTaskArray = todos.filter((task) => task.completed === true);
  completed.innerText = completedTaskArray.length;
  incomplete.innerText = todos.length - completedTaskArray.length;
}

menuBtn.addEventListener("click", closeMenu);

function closeMenu() {
  menuBtn.classList.toggle("close");
}

const weekdays = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

function updateDays() {
  weekdays.forEach((weekday, i) => {
    if (i === currentday) {
      day.innerText = weekday;
    }
  });
}
updateDays();
