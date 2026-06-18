import { TABLE_DATA } from '../data/tableData.js';

export class InteractivePage {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.tableData = [];
        this.startTime = Date.now(); // Засекаем время входа
    }

    async init() {
        this.render();
        this.tableData = await this.fetchData();
        this.renderTable();
        this.attachEvents();
    }

initCalculator() {
    const buttons = document.querySelectorAll('.calculator__op-btn');
    const input1 = document.getElementById('calcInput1');
    const input2 = document.getElementById('calcInput2');
    const resultElement = document.getElementById('calcResult');

    // Ограничение ввода только числами
    const restrictToNumbers = (input) => {
        input.addEventListener('keydown', (e) => {
            const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End'];
            if (allowedKeys.includes(e.key)) return;
            if (!/[0-9\.\-]/.test(e.key)) e.preventDefault();
            if (e.key === '-' && input.value.includes('-')) e.preventDefault();
            if (e.key === '.' && input.value.includes('.')) e.preventDefault();
        });

        input.addEventListener('paste', (e) => {
            e.preventDefault();
            const text = (e.clipboardData || window.clipboardData).getData('text');
            if (/^-?\d+(\.\d+)?$/.test(text)) {
                document.execCommand('insertText', false, text);
            }
        });
    };

    restrictToNumbers(input1);
    restrictToNumbers(input2);

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const num1 = parseFloat(input1.value);
            const num2 = parseFloat(input2.value);
            const op = btn.dataset.op;

            if (isNaN(num1) || isNaN(num2)) {
                resultElement.textContent = '❌ Введите числа';
                return;
            }

            let result;
            switch(op) {
                case '+': result = num1 + num2; break;
                case '-': result = num1 - num2; break;
                case '*': result = num1 * num2; break;
                case '/': 
                    if (num2 === 0) {
                        resultElement.textContent = '❌ На 0 нельзя';
                        return;
                    }
                    result = num1 / num2; 
                    break;
            }

            resultElement.textContent = `= ${result}`;
        });
    });
}
    

    fetchData() {
        return new Promise((resolve) => {
            setTimeout(() => resolve([...TABLE_DATA]), 500);
        });
    }

    getStats() {
    
    let visits = Number(localStorage.getItem('visitCount')) || 0;
    let totalTime = Number(localStorage.getItem('totalTime')) || 0;

    visits++;
    localStorage.setItem('visitCount', String(visits));

    window.addEventListener('beforeunload', () => {
        const timeSpent = Math.floor((Date.now() - this.startTime) / 1000);
        const newTotalTime = totalTime + timeSpent;
        localStorage.setItem('totalTime', String(newTotalTime));
    });

    
    const avgSeconds = visits > 0 ? Math.floor(totalTime / visits) : 0;
    const avgMinutes = Math.floor(avgSeconds / 60);

    return { visits, avgMinutes };
}
    render() {
         // Запрашиваем имя пользователя
    const userName = prompt('Как вас зовут?', 'Гость') || 'Гость';
    const capitalizedUserName = userName.charAt(0).toUpperCase() + userName.slice(1);

    const hour = new Date().getHours();
    let greeting;
    if (hour >= 5 && hour < 12) greeting = `Доброе утро, ${capitalizedUserName}! ☀️`;
    else if (hour >= 12 && hour < 17) greeting = `Добрый день, ${capitalizedUserName}! 🌤️`;
    else if (hour >= 17 && hour < 23) greeting = `Добрый вечер, ${capitalizedUserName}! 🌙`;
    else greeting = `Доброй ночи, ${capitalizedUserName}! 🌟`;

    const { visits, avgMinutes } = this.getStats();

        this.container.innerHTML = `
            <section class="greeting-section">
                <h1 class="greeting-section__title">${greeting}</h1>
                <p class="greeting-section__text">Рады видеть вас на нашем сайте!</p>
            </section>

            <section class="stats-section">
                <h2 class="section-title">Ваша статистика</h2>
                <div class="stats-grid">
                    <div class="stats-card">
                        <div class="stats-card__value">${visits}</div>
                        <div class="stats-card__label">Посещений сайта</div>
                    </div>
                    <div class="stats-card">
                        <div class="stats-card__value">${avgMinutes} мин</div>
                        <div class="stats-card__label">Среднее время на сайте</div>
                    </div>
                </div>
            </section>

            <section class="converter-section">
                <h2 class="section-title">💱 Конвертер валют</h2>
                <div class="converter">
                    <input type="number" id="currencyAmount" class="converter__input" placeholder="Сумма" value="1000">
                    <select id="currencyFrom" class="converter__select">
                        <option value="RUB">RUB</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                    </select>
                    <span class="converter__arrow">→</span>
                    <select id="currencyTo" class="converter__select">
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="RUB">RUB</option>
                    </select>
                    <button class="converter__btn" id="convertBtn">Конвертировать</button>
                    <div class="converter__result" id="convertResult">Результат: —</div>
                </div>
            </section>

            <!-- Калькулятор -->
        <section class="calculator-section">
            <h2 class="section-title">🧮 Калькулятор</h2>
            <div class="calculator">
                <input type="text" inputmode="numeric" id="calcInput1" class="calculator__input" placeholder="Число">
                <div class="calculator__buttons">
                    <button class="calculator__op-btn" data-op="+">+</button>
                    <button class="calculator__op-btn" data-op="-">−</button>
                    <button class="calculator__op-btn" data-op="*">×</button>
                    <button class="calculator__op-btn" data-op="/">÷</button>
                </div>
                <input type="text" inputmode="numeric" id="calcInput2" class="calculator__input" placeholder="Число">
                <div class="calculator__result" id="calcResult">=</div>
            </div>
        </section>

        

        

            <section class="table-section">
                <h2 class="section-title">📊 Таблица проектов</h2>
                <div class="table-controls">
                    <input type="text" id="tableSearch" class="search-input" placeholder="🔍 Поиск...">
                    <select id="tableSort" class="converter__select">
                        <option value="name">По имени</option>
                        <option value="amount">По сумме</option>
                        <option value="status">По статусу</option>
                    </select>
                </div>
                <div class="table-wrapper">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Клиент</th>
                                <th>Проект</th>
                                <th>Статус</th>
                                <th>Сумма</th>
                            </tr>
                        </thead>
                        <tbody id="tableBody"></tbody>
                    </table>
                </div>
            </section>

            <section class="modal-trigger-section">
                <h2 class="section-title">✨ Модальное окно</h2>
                <button class="modal-trigger-btn" id="openModalBtn">Открыть модальное окно</button>
            </section>

            <div class="modal" id="modal">
                <div class="modal__content">
                    <button class="modal__close" id="closeModalBtn">&times;</button>
                    <h2 class="modal__title"> Специальное предложение!</h2>
                    <p class="modal__text">Скидка 15% на дизайн-проект в этом месяце по промокоду postavte61ballpozhalyista</p>
                    <button class="modal__btn" id="modalActionBtn">Отлично!</button>
                </div>
            </div>
        `;
    }



    renderTable() {
    const tbody = document.getElementById('tableBody');
    const total = this.tableData.reduce((sum, row) => sum + row.amount, 0);

    tbody.innerHTML = this.tableData.map(row => `
        <tr>
            <td>${row.name}</td>
            <td>${row.project}</td>
            <td><span class="status-badge status-${row.status.toLowerCase().replace(/\s+/g, '-')}">${row.status}</span></td>
            <td style="text-align: right;">${row.amount.toLocaleString('ru-RU')} ₽</td>
        </tr>
    `).join('') + `
        <tr style="font-weight: bold; background-color: var(--color-nav-bg);">
            <td colspan="3" style="text-align: right; padding: var(--spacing-sm) var(--spacing-md);">Итого:</td>
            <td style="text-align: right; padding: var(--spacing-sm) var(--spacing-md);">${total.toLocaleString('ru-RU')} ₽</td>
        </tr>
    `;
}

    attachEvents() {
        

        this.initCalculator();
         // Конвертер
        const RATES = { RUB: 1, USD: 74, EUR: 83 };
        document.getElementById('convertBtn').addEventListener('click', () => {
            const amount = parseFloat(document.getElementById('currencyAmount').value);
            const from = document.getElementById('currencyFrom').value;
            const to = document.getElementById('currencyTo').value;
            
            if (isNaN(amount)) {
                document.getElementById('convertResult').textContent = '❌ Введите сумму';
                return;
            }
            
            const result = (amount * RATES[from]) / RATES[to];
            document.getElementById('convertResult').textContent = `${amount} ${from} = ${result.toFixed(2)} ${to}`;
        });

        // Поиск в таблице
        document.getElementById('tableSearch').addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            this.tableData = TABLE_DATA.filter(row => 
                Object.values(row).some(val => String(val).toLowerCase().includes(query))
            );
            this.renderTable();
        });

        // Сортировка
        document.getElementById('tableSort').addEventListener('change', (e) => {
            const field = e.target.value;
            this.tableData.sort((a, b) => {
                if (typeof a[field] === 'string') return a[field].localeCompare(b[field]);
                return a[field] - b[field];
            });
            this.renderTable();
        });

        // Модальное окно
        const modal = document.getElementById('modal');
        document.getElementById('openModalBtn').addEventListener('click', () => {
            modal.classList.add('modal--active');
        });
        document.getElementById('closeModalBtn').addEventListener('click', () => {
            modal.classList.remove('modal--active');
        });
        document.getElementById('modalActionBtn').addEventListener('click', () => {
            modal.classList.remove('modal--active');
        });
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('modal--active');
        });
    }
}