import { UIComponent } from './UIComponent.js';

export class ToDoWidget extends UIComponent {
    constructor(config = {}) {
        super({ ...config, title: 'Список дел' });
        this.tasks = config.tasks || [];
    }
    
    renderContent() {
        return `
            <div class="todo-container">
                <div class="todo-input">
                    <input type="text" placeholder="Новая задача..." class="task-input">
                    <button class="add-task-btn">Добавить</button>
                </div>
                <ul class="task-list">
                    ${this.tasks.map(task => `
                        <li class="task ${task.completed ? 'completed' : ''}" data-id="${task.id}">
                            <input type="checkbox" ${task.completed ? 'checked' : ''}>
                            <span class="task-text">${task.text}</span>
                            <button class="delete-task">×</button>
                        </li>
                    `).join('')}
                </ul>
                <div class="todo-stats">
                    Всего: ${this.tasks.length} | Выполнено: ${this.tasks.filter(t => t.completed).length}
                </div>
            </div>
        `;
    }
    
    bindEvents() {
        super.bindEvents();
        
        const addBtn = this.element.querySelector('.add-task-btn');
        const input = this.element.querySelector('.task-input');
        const taskList = this.element.querySelector('.task-list');
        
        addBtn.addEventListener('click', () => this.addTask());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });
        
        taskList.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-task')) {
                this.deleteTask(e.target.closest('.task').dataset.id);
            } else if (e.target.type === 'checkbox') {
                this.toggleTask(e.target.closest('.task').dataset.id);
            }
        });
    }
    
    addTask() {
        const input = this.element.querySelector('.task-input');
        const text = input.value.trim();
        
        if (text) {
            const task = {
                id: Date.now().toString(),
                text,
                completed: false
            };
            
            this.tasks.push(task);
            this.updateDisplay();
            input.value = '';
        }
    }
    
    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.updateDisplay();
    }
    
    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.updateDisplay();
        }
    }
    
    updateDisplay() {
        const taskList = this.element.querySelector('.task-list');
        const stats = this.element.querySelector('.todo-stats');
        
        taskList.innerHTML = this.tasks.map(task => `
            <li class="task ${task.completed ? 'completed' : ''}" data-id="${task.id}">
                <input type="checkbox" ${task.completed ? 'checked' : ''}>
                <span class="task-text">${task.text}</span>
                <button class="delete-task">×</button>
            </li>
        `).join('');
        
        stats.textContent = `Всего: ${this.tasks.length} | Выполнено: ${this.tasks.filter(t => t.completed).length}`;
    }
}