class TaskScript extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <section class="taskContainer"></section>
            <form id="taskForm">
                <input type="text" id="newTaskInput" placeholder="New Task">
                <button type="submit">Add Task</button>
            </form>
        `;
        this.taskContainer = this.shadowRoot.querySelector('.taskContainer');
        this.newTaskInput = this.shadowRoot.getElementById('newTaskInput');

        this.shadowRoot.getElementById('taskForm').addEventListener('submit', (event) => {
            event.preventDefault();
            this.addTask();
        });
    }

    addTask() {
        const newTaskText = this.newTaskInput.value.trim();
        if (newTaskText === '') return;

        const taskId = `task${this.taskContainer.children.length + 1}`;
        const newTask = document.createElement('section');
        newTask.innerHTML = `
            <input type="checkbox" id="${taskId}">
            <label for="${taskId}">${newTaskText}</label>
            <button class="editBtn">Edit</button>
            <button class="deleteBtn">Delete</button>
        `;

        const editBtn = newTask.querySelector('.editBtn');
        const deleteBtn = newTask.querySelector('.deleteBtn');
        editBtn.addEventListener('click', () => this.editTask(taskId, newTaskText));
        deleteBtn.addEventListener('click', () => this.deleteTask(newTask));

        this.taskContainer.appendChild(newTask);
        this.newTaskInput.value = '';
    }


    editTask(taskId, taskText) {
    }

    deleteTask(taskElement) {
    }
}

window.customElements.define('task-widget', TaskScript);

