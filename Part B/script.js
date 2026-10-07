// Select elements

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");

const taskList = document.getElementById("taskList");

const errorMessage = document.getElementById("errorMessage");

const totalCount = document.getElementById("totalCount");
const remainingCount = document.getElementById("remainingCount");

const clearCompleted = document.getElementById("clearCompleted");

const filters = document.querySelectorAll(".filter");


// Store tasks

let tasks = [];

let currentFilter = "all";


// Add Task

taskForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const taskText = taskInput.value.trim();

    // Empty task validation

    if (taskText === "") {

        errorMessage.textContent =
            "Task cannot be empty.";

        return;
    }


    // Duplicate task validation

    const duplicate = tasks.some(function (task) {

        return task.text.toLowerCase() === taskText.toLowerCase();

    });


    if (duplicate) {

        errorMessage.textContent =
            "This task already exists.";

        return;
    }


    // Create new task

    const newTask = {

        id: Date.now(),

        text: taskText,

        completed: false

    };


    tasks.push(newTask);

    taskInput.value = "";

    errorMessage.textContent = "";

    renderTasks();

});


// Event Delegation
// One listener for the whole list

taskList.addEventListener("click", function (event) {

    const item = event.target.closest(".task-item");

    if (!item) {
        return;
    }


    const taskId = Number(item.dataset.id);


    // Checkbox

    if (event.target.classList.contains("task-checkbox")) {

        const task = tasks.find(function (task) {

            return task.id === taskId;

        });

        task.completed = event.target.checked;

        renderTasks();

    }


    // Delete button

    if (event.target.classList.contains("delete-btn")) {

        tasks = tasks.filter(function (task) {

            return task.id !== taskId;

        });

        renderTasks();

    }

});


// Double click to edit

taskList.addEventListener("dblclick", function (event) {

    if (!event.target.classList.contains("task-text")) {
        return;
    }

    const item = event.target.closest(".task-item");

    const taskId = Number(item.dataset.id);

    const task = tasks.find(function (task) {

        return task.id === taskId;

    });

    const input = document.createElement("input");

    input.classList.add("edit-input");

    input.value = task.text;

    event.target.replaceWith(input);

    input.focus();


    // Enter = Save

    input.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {

            const newText = input.value.trim();

            if (newText !== "") {

                task.text = newText;

            }

            renderTasks();

        }


        // Escape = Cancel

        if (event.key === "Escape") {

            renderTasks();

        }

    });

});


// Filter buttons

filters.forEach(function (button) {

    button.addEventListener("click", function () {

        currentFilter = button.dataset.filter;


        // Remove active from all buttons

        filters.forEach(function (btn) {

            btn.classList.remove("active");

        });


        // Add active to clicked button

        button.classList.add("active");

        renderTasks();

    });

});


// Clear completed tasks

clearCompleted.addEventListener("click", function () {

    tasks = tasks.filter(function (task) {

        return !task.completed;

    });

    renderTasks();

});


// Render Tasks

function renderTasks() {

    taskList.innerHTML = "";


    // Apply filter

    let filteredTasks = tasks.filter(function (task) {

        if (currentFilter === "active") {

            return !task.completed;

        }

        if (currentFilter === "completed") {

            return task.completed;

        }

        return true;

    });


    // Create task elements

    filteredTasks.forEach(function (task) {

        const li = document.createElement("li");

        li.classList.add("task-item");

        li.dataset.id = task.id;


        // Completed class

        if (task.completed) {

            li.classList.add("completed");

        }


        // Checkbox

        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.classList.add("task-checkbox");

        checkbox.checked = task.completed;


        // Task text

        const span = document.createElement("span");

        span.classList.add("task-text");

        span.textContent = task.text;


        // Delete button

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.classList.add("delete-btn");


        // Append elements

        li.appendChild(checkbox);

        li.appendChild(span);

        li.appendChild(deleteButton);

        taskList.appendChild(li);

    });


    updateCounter();

}


// Update counter

function updateCounter() {

    const total = tasks.length;

    const remaining = tasks.filter(function (task) {

        return !task.completed;

    }).length;


    totalCount.textContent = "Total: " + total;

    remainingCount.textContent =
        "Remaining: " + remaining;

}