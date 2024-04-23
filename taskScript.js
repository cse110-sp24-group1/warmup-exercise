class TaskScript extends HTMLElement {
  constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
          <section class="taskContainer"></section>
          <form id="taskForm">
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

    const newTask = document.createElement('section');
    newTask.innerHTML = `
        <input type="checkbox" id="task${this.taskContainer.children.length + 1}">
        <label>${newTaskText} - Created: ${dateMade}${dueDate ? ` - Due: ${dueDate}` : ''}</label>
        <button class="deleteBtn">Delete</button>
    `;
    this.taskContainer.appendChild(newTask);
    this.newTaskInput.value = '';
    this.taskDueDate.value = ''; 
}


  editTask(taskId, taskText) {
  }

  deleteTask(taskElement) {
  }
}

window.customElements.define('task-widget', TaskScript);