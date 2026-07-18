// ===============================
// Academic Planner JavaScript
// ===============================


document.addEventListener('DOMContentLoaded', function () {
    // Load tasks from localStorage (persistence)
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    // Get HTML elements
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    if (!taskInput || !addTaskBtn || !taskList) return;

    // Save tasks to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Add task when button is clicked
    addTaskBtn.addEventListener("click", addTask);

    // Also allow pressing the Enter key (use keydown for reliability)
    taskInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            addTask();
        }
    });

    // Function to add a task
    function addTask() {
        const taskText = taskInput.value.trim();

        // Prevent empty tasks
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Add task to array
        tasks.push({
            text: taskText,
            completed: false
        });

        // Clear the input box
        taskInput.value = "";

        saveTasks();
        // Refresh the task list
        displayTasks();
    }

    // Function to display tasks
    function displayTasks() {
        // Clear the current list
        taskList.innerHTML = "";

        // Loop through tasks
        tasks.forEach(function (task, index) {
            const li = document.createElement("li");

            // Task text
            const taskSpan = document.createElement("span");
            taskSpan.textContent = task.text;

            if (task.completed) {
                taskSpan.classList.add("completed");
            }

            // Buttons container
            const buttonContainer = document.createElement("div");

            // Complete button
            const completeBtn = document.createElement("button");
            completeBtn.textContent = task.completed ? "Undo" : "Complete";
            completeBtn.className = "btn";
            completeBtn.addEventListener("click", function () {
                completeTask(index);
            });

            // Delete button
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.className = "btn";
            deleteBtn.addEventListener("click", function () {
                deleteTask(index);
            });

            // Add buttons
            buttonContainer.appendChild(completeBtn);
            buttonContainer.appendChild(deleteBtn);

            // Add content to list item
            li.appendChild(taskSpan);
            li.appendChild(buttonContainer);

            // Add list item to page
            taskList.appendChild(li);
        });
    }

    // Mark task as completed
    function completeTask(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        displayTasks();
    }

    // Delete task
    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        displayTasks();
    }

    // Initial render
    displayTasks();
});