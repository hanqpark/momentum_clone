const todoForm = document.querySelector(".todo"),
  todoInput = todoForm.querySelector("input"),
  todoList = document.querySelector(".todoList"),
  TODO_LS = "currentToDo";

let toDos = [];

function deleteToDo(event) {
  const li = event.target.parentNode;
  todoList.removeChild(li);
  const cleanToDos = toDos.filter(list => list.id != li.id);
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODO_LS, JSON.stringify(toDos));
}

function paintToDo(text, id) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  const span = document.createElement("span");
  span.innerText = text;
  let newId = 0;
  if (id == null) {
    newId = `li_${Math.floor(Math.random() * 10000000000000)}`;
  } else {
    newId = id;
  }
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  todoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const curVal = todoInput.value;
  paintToDo(curVal, null);
  todoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODO_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text, toDo.id);
    });
  }
}

function init() {
  loadToDos();
  todoForm.addEventListener("submit", handleSubmit);
}

init();
