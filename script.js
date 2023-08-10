"use strict";

const message = document.querySelector(".message");

const input = document.getElementById("input");

const addBtn = document.getElementById("add");

const ul = document.querySelector(".taskList ul");

const container = document.querySelector(".taskList");

class Person {
  todos = [];
  constructor(first, last) {
    this.firstName = first;
    this.lastName = last;
    this.greet();
    this.getStored();
    addBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.addTodos();
      this.displayTodos();
    });
  }

  greet() {
    message.textContent = `Welcome, ${this.firstName} ${this.lastName} !`;
  }

  addTodos() {
    const inputValue = input.value.trim();

    if (!inputValue) return;

    this.todos.push(inputValue);
    localStorage.setItem("todos", JSON.stringify(this.todos));
    input.value = "";
    input.focus();
    console.log(this.todos);
  }

  displayTodos() {
    container.style.display = this.todos.length ? "block" : "none";

    ul.innerHTML = "";
    this.todos.forEach((todo, index) => {
      const li = document.createElement("li");
      const span = document.createElement("span");
      const button = document.createElement("button");
      button.className = "btn";
      button.textContent = "Delete task";
      button.addEventListener("click", () => {
        this.delTask(index);
        localStorage.setItem("todos", JSON.stringify(this.todos));

        console.log(this.todos);
      });
      span.textContent = todo;
      li.append(span, button);
      ul.append(li);
    });
  }

  delTask(index) {
    this.todos.splice(index, 1);
    this.displayTodos();
  }

  getStored() {
    const stored = JSON.parse(localStorage.getItem("todos"));
    if (stored) {
      this.todos = stored;
      this.displayTodos();
    }
  }
}

const lala = new Person("Lala", "Alakbarova");
