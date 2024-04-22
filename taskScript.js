class TaskScript extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <div id="taskContainer"></div>
            <input type="text" id="newTaskInput" placeholder="New Task">
            <button id="addTaskBtn">Add Task</button>
        `;
        this.taskContainer = this.shadowRoot.getElementById('taskContainer');
        this.newTaskInput = this.shadowRoot.getElementById('newTaskInput');
        this.addTaskBtn = this.shadowRoot.getElementById('addTaskBtn');

        this.addTaskBtn.addEventListener('click', () => this.addTask());
    }

    addTask() {
        newTask.innerHTML = `
            <input type="checkbox" id="${taskId}">
            <label for="${taskId}">${newTaskText}</label>
            <button class="editBtn">Edit</button>
            <button class="deleteBtn">Delete</button>
        `;
    }

    editTask(taskId, taskText) {
    }

    deleteTask(taskElement) {
    }
}

window.customElements.define('task-widget', TaskScript);

