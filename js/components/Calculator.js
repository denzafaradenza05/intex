export class Calculator {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.num1 = 0;
        this.num2 = 0;
        this.result = 0;
    }
    
    render() {
        this.container.innerHTML = `
            <section class="calculator-section">
                <h2 class="section-title">🧮 Калькулятор</h2>
                <div class="calculator">
                    <input type="text" inputmode="numeric" 
                           class="calculator__input" 
                           data-num="1" 
                           placeholder="Число">
                    <div class="calculator__buttons">
                        <button class="calculator__op-btn" data-op="+">+</button>
                        <button class="calculator__op-btn" data-op="-">−</button>
                        <button class="calculator__op-btn" data-op="*">×</button>
                        <button class="calculator__op-btn" data-op="/">÷</button>
                    </div>
                    <input type="text" inputmode="numeric" 
                           class="calculator__input" 
                           data-num="2" 
                           placeholder="Число">
                    <div class="calculator__result">=</div>
                </div>
            </section>
        `;
        
        this.attachEvents();
    }
    
    attachEvents() {
        const inputs = this.container.querySelectorAll('.calculator__input');
        const buttons = this.container.querySelectorAll('.calculator__op-btn');
        const resultEl = this.container.querySelector('.calculator__result');
        
        // Фильтрация ввода (только цифры и точка)
        inputs.forEach(input => {
            input.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/[^0-9.\-]/g, '');
            });
        });
        
        // Обработка операций через reduce
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const nums = Array.from(inputs)
                    .map(input => parseFloat(input.value))
                    .filter(n => !isNaN(n));
                
                if (nums.length !== 2) {
                    resultEl.textContent = '❌ Введите оба числа';
                    return;
                }
                
                const [a, b] = nums;
                const op = btn.dataset.op;
                
                const operations = {
                    '+': (x, y) => x + y,
                    '-': (x, y) => x - y,
                    '*': (x, y) => x * y,
                    '/': (x, y) => y !== 0 ? x / y : NaN
                };
                
                const result = operations[op](a, b);
                resultEl.textContent = isNaN(result) ? '❌ Ошибка' : `= ${result}`;
            });
        });
    }
}