// Select DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Load tasks from Local Storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
tasks.forEach(task => addTaskToDOM(task.text, task.completed));

// Add task event
addTaskBtn.addEventListener('click', () => {
    const text = taskInput.value.trim();
    if (text !== '') {
        addTaskToDOM(text);
        tasks.push({ text: text, completed: false });
        saveTasks();
        taskInput.value = '';
    }
});

// Function to add task to DOM
function addTaskToDOM(text, completed = false) {
    const li = document.createElement('li');
    li.textContent = text;
    if (completed) li.classList.add('completed');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    checkbox.addEventListener('change', () => {
        li.classList.toggle('completed');
        updateTaskInStorage(text, checkbox.checked);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'deleteBtn';
    deleteBtn.addEventListener('click', () => {
        li.remove();
        deleteTaskFromStorage(text);
    });

    li.prepend(checkbox);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// Save tasks to Local Storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update task completion
function updateTaskInStorage(text, completed) {
    tasks = tasks.map(task => task.text === text ? { ...task, completed } : task);
    saveTasks();
}

// Delete task from storage
function deleteTaskFromStorage(text) {
    tasks = tasks.filter(task => task.text !== text);
    saveTasks();
}
