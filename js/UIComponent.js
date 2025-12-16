export class UIComponent {
    constructor(config = {}) {
        this.id = config.id || `widget-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        this.title = config.title || 'Виджет';
        this.isMinimized = false;
        this.element = null;
    }

    render() {
        const widget = document.createElement('div');
        widget.className = 'widget';
        widget.id = this.id;
        
        widget.innerHTML = `
            <div class="widget-header">
                <h3>${this.title}</h3>
                <div class="widget-controls">
                    <button class="minimize-btn">−</button>
                    <button class="close-btn">×</button>
                </div>
            </div>
            <div class="widget-content">
                ${this.renderContent()}
            </div>
        `;
        
        this.element = widget;
        this.bindEvents();
        return widget;
    }
    
    renderContent() {
        return '<p>Содержимое виджета</p>';
    }
    
    bindEvents() {
        const minimizeBtn = this.element.querySelector('.minimize-btn');
        const closeBtn = this.element.querySelector('.close-btn');
        
        minimizeBtn.addEventListener('click', () => this.toggleMinimize());
        closeBtn.addEventListener('click', () => this.destroy());
    }
    
    toggleMinimize() {
        this.isMinimized = !this.isMinimized;
        const content = this.element.querySelector('.widget-content');
        content.style.display = this.isMinimized ? 'none' : 'block';
    }
    
    destroy() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }
}