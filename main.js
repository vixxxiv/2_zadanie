import { Dashboard } from './js/Dashboard.js';

document.addEventListener('DOMContentLoaded', () => {
    const dashboard = new Dashboard('dashboard');
    
    // Обработчики для кнопок добавления виджетов
    document.getElementById('add-todo').addEventListener('click', () => {
        dashboard.addWidget('todo');
    });
    
    document.getElementById('add-quote').addEventListener('click', () => {
        dashboard.addWidget('quote');
    });
    

    
    // Добавим несколько виджетов по умолчанию
    dashboard.addWidget('todo', {
        tasks: [
            { id: '1', text: 'Изучить JavaScript', completed: true },
            { id: '2', text: 'Создать дашборд', completed: false },
            { id: '3', text: 'Написать документацию', completed: false }
        ]
    });
    
    dashboard.addWidget('quote');
    dashboard.addWidget('weather', { city: 'Москва' });
    dashboard.addWidget('stats');
});