let todoArray = [];

function addTodo(todoText, id) {
    const todoObject = {
        todoText: todoText || document.querySelector(".inputselect").value,
        checked: false,
        id: id || Date.now(),
    };
    todoArray.push(todoObject);
    renderTodoList();
}

const form = document.querySelector(".formselect");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    addTodo();
    form.reset();
});

function renderTodoList() {
    localStorage.setItem("todoArray", JSON.stringify(todoArray));
    const list = document.querySelector(".js-todo-list");
    list.innerHTML = '';
    todoArray.forEach((todo) => {
        const isChecked = todo.checked ? "done" : "";
        const newlist = document.createElement("li");
        newlist.setAttribute("class", `todo-item ${isChecked}`);
        newlist.setAttribute("data-key", todo.id);
        newlist.innerHTML = `
            <input id="${todo.id}" type="checkbox" class="js-tick" />
            <label for="${todo.id}" class="tick"></label>
            <span>${todo.todoText}</span>
            <button class="delete-todo js-delete-todo">
                <svg fill="var(--svgcolor)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                </svg>
            </button>
        `;
        list.appendChild(newlist);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const storedTodos = localStorage.getItem("todoArray");
    if (storedTodos) {
        todoArray = JSON.parse(storedTodos);
        renderTodoList();
    }
});

function toggleDone(key) {
    const index = todoArray.findIndex((item) => item.id === Number(key));
    if (index !== -1) {
        todoArray[index].checked = !todoArray[index].checked;
        renderTodoList();
    }
}

function deleteTodo(key) {
    todoArray = todoArray.filter((item) => item.id !== Number(key));
    renderTodoList();
}

const todoList = document.querySelector(".js-todo-list");
todoList.addEventListener("click", (event) => {
    if (event.target.classList.contains("js-tick")) {
        const itemKey = event.target.parentElement.dataset.key;
        toggleDone(itemKey);
    }
    if (event.target.classList.contains("js-delete-todo")) {
        const itemKey = event.target.parentElement.dataset.key;
        deleteTodo(itemKey);
    }
});



