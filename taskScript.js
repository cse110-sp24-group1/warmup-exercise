class TaskScript extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" type="text/css" href="style.css" media="screen">
            <link href="https://fonts.googleapis.com/css2?family=Platypi:ital,wght@0,300..800;1,300..800" rel="stylesheet"> 
            <section class="taskContainer"></section>
            <form id="taskForm" action="https://httpbin.org/post" method="POST">
                <input type="text" id="newTaskInput" placeholder="New Task">
                <input type="date" id="taskDueDate" placeholder="Due date (optional)">
                <button type="submit">Add Task</button>
            </form>
        `;
        this.taskContainer = this.shadowRoot.querySelector('.taskContainer');
        this.newTaskInput = this.shadowRoot.getElementById('newTaskInput');
        this.taskDueDate = this.shadowRoot.getElementById('taskDueDate');

        this.shadowRoot.getElementById('taskForm').addEventListener('submit', (event) => {
            event.preventDefault();
            this.addTask();
        });
    }

    addTask() {
        const newTaskText = this.newTaskInput.value.trim();
        const dueDate = this.taskDueDate.value; 
        const dateMade = new Date().toISOString().slice(0, 10); 
      
        if (newTaskText === '') return;

        const taskId = `task${this.taskContainer.children.length + 1}`;
        const newTask = document.createElement('section');
        newTask.classList.add('taskItem');
        newTask.innerHTML = `
            <input type="checkbox" id="${taskId}">
            <label for="${taskId}">${newTaskText}</label>
            <label>${dueDate ? `Due: ${new Date(dueDate).toLocaleDateString()}` : ''}</label>
            <button class="editBtn">Edit</button>
            <button class="deleteBtn">Delete</button>
        `;

        const editBtn = newTask.querySelector('.editBtn');
        const deleteBtn = newTask.querySelector('.deleteBtn');
        editBtn.addEventListener('click', () => this.editTask(taskId, newTaskText));
        deleteBtn.addEventListener('click', () => this.deleteTask(newTask));

        this.taskContainer.appendChild(newTask);
        this.newTaskInput.value = '';
        this.taskDueDate.value = '';
    }


    editTask(taskId, taskText) {
        const taskLabel = this.shadowRoot.querySelector(`#${taskId} + label`);
        const newTaskText = prompt('Edit task:', taskText);

        if (newTaskText !== null) {
            taskLabel.textContent = newTaskText;
        }
    }

    deleteTask(taskElement) {
        taskElement.remove();
    }
}

window.customElements.define('task-widget', TaskScript);