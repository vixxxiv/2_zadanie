import { UIComponent } from './UIComponent.js';

export class QuoteWidget extends UIComponent {
    constructor(config = {}) {
        super({ ...config, title: 'Вдохновляющие цитаты' });
        this.quotes = config.quotes || [
            { text: "Лучший способ начать делать — перестать говорить и начать делать.", author: "Уолт Дисней" },
            { text: "Успех — это способность идти от неудачи к неудаче, не теряя энтузиазма.", author: "Уинстон Черчилль" },
            { text: "Единственный способ делать великие дела — любить то, что вы делаете.", author: "Стив Джобс" }
        ];
        this.currentQuoteIndex = 0;
    }
    
    renderContent() {
        const currentQuote = this.quotes[this.currentQuoteIndex];
        
        return `
            <div class="quote-container">
                <div class="quote-text">"${currentQuote.text}"</div>
                <div class="quote-author">— ${currentQuote.author}</div>
                <button class="refresh-quote">Новая цитата</button>
            </div>
        `;
    }
    
    bindEvents() {
        super.bindEvents();
        
        const refreshBtn = this.element.querySelector('.refresh-quote');
        refreshBtn.addEventListener('click', () => this.refreshQuote());
    }
    
    refreshQuote() {
        // Простая циклическая смена цитат
        this.currentQuoteIndex = (this.currentQuoteIndex + 1) % this.quotes.length;
        
        const quoteText = this.element.querySelector('.quote-text');
        const quoteAuthor = this.element.querySelector('.quote-author');
        const currentQuote = this.quotes[this.currentQuoteIndex];
        
        quoteText.textContent = `"${currentQuote.text}"`;
        quoteAuthor.textContent = `— ${currentQuote.author}`;
    }
}