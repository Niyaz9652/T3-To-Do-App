document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to render tasks
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.textContent = task.name;
            if (task.completed) {
                li.classList.add('completed');
            }
            li.addEventListener('click', () => {
                toggleTaskStatus(index);
            });
            taskList.appendChild(li);
        });
        saveTasks();
    }

    // Function to add a new task
    function addTask() {
        const taskName = taskInput.value.trim();
        if (taskName !== '') {
            tasks.push({ name: taskName, completed: false });
            renderTasks();
            taskInput.value = '';
        }
    }

    // Function to toggle task status (completed/pending)
    function toggleTaskStatus(index) {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    }

    // Function to save tasks to local storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Event listener for add task button
    addTaskBtn.addEventListener('click', addTask);

    // Initial render
    renderTasks();
});