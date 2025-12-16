import { ToDoWidget } from './ToDoWidget.js';
import { QuoteWidget } from './QuoteWidget.js';


export class Dashboard {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.widgets = [];
        this.nextPosition = { x: 0, y: 0 };
    }
    
    addWidget(widgetType, config = {}) {
        let widget;
        
        switch(widgetType) {
            case 'todo':
                widget = new ToDoWidget(config);
                break;
            case 'quote':
                widget = new QuoteWidget(config);
                break;
            case 'weather':
                widget = new WeatherWidget(config);
                break;
            case 'stats':
                widget = new StatsWidget(config);
                break;
            default:
                console.error('Неизвестный тип виджета:', widgetType);
                return;
        }
        
        this.widgets.push(widget);
        const widgetElement = widget.render();
        
        // Позиционирование виджета в сетке
        widgetElement.style.gridColumn = `${this.nextPosition.x + 1}`;
        widgetElement.style.gridRow = `${this.nextPosition.y + 1}`;
        
        this.container.appendChild(widgetElement);
        
        // Обновление позиции для следующего виджета
        this.nextPosition.x = (this.nextPosition.x + 1) % 3;
        if (this.nextPosition.x === 0) {
            this.nextPosition.y++;
        }
    }
    
    removeWidget(widgetId) {
        const widgetIndex = this.widgets.findIndex(w => w.id === widgetId);
        
        if (widgetIndex !== -1) {
            const widget = this.widgets[widgetIndex];
            widget.destroy();
            this.widgets.splice(widgetIndex, 1);
        }
    }
    
    getWidgets() {
        return this.widgets;
    }
}