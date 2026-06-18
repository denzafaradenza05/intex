export class ContactsPage {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
    }

    render() {
        const today = new Date().toISOString().split('T')[0];

        this.container.innerHTML = `
            <section class="contacts">
                <h1 class="contacts__title">Контакты</h1>
                <div class="contacts__info">
                    <p class="contacts__item">📧 Email: designer@example.com</p>
                    <p class="contacts__item"> Телефон: +7 (999) 123-45-67</p>
                    <p class="contacts__item"> Адрес: г. Москва</p>
                </div>
                
                <form class="contacts__form" id="contactForm" novalidate>
                    <div class="form-group">
                        <label>ФИО</label>
                        <input type="text" id="fullName" class="contacts__input" placeholder="Иванов Иван Иванович" required>
                        <div class="form-error" id="fullNameError"></div>
                    </div>
                    
                    <div class="fio-output" id="fioOutput" style="display: none;">
                        <h3>Извлечённые данные:</h3>
                        <p><strong>Фамилия:</strong> <span id="fioLast"></span></p>
                        <p><strong>Имя:</strong> <span id="fioFirst"></span></p>
                        <p><strong>Отчество:</strong> <span id="fioMiddle"></span></p>
                    </div>
                    
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" id="email" class="contacts__input" placeholder="example@mail.com" required>
                        <div class="form-error" id="emailError"></div>
                    </div>
                    
                    <div class="form-group">
                        <label>Телефон</label>
                        <input type="text" inputmode="numeric" id="phone" class="contacts__input" placeholder="+7 (___) ___-__-__" maxlength="18" required>
                        <div class="form-error" id="phoneError"></div>
                    </div>
                    
                    <div class="form-group">
                        <label>Желаемая дата связи</label>
                        <input type="date" id="contactDate" class="contacts__input" min="${today}" required>
                        <div class="form-error" id="dateError"></div>
                    </div>
                    
                    <div class="form-group">
                        <label>Фото (только JPEG/PNG)</label>
                        <input type="file" id="photo" class="contacts__input" accept="image/jpeg,image/png">
                        <div class="form-error" id="photoError"></div>
                        <div class="photo-preview" id="photoPreview"></div>
                    </div>
                    
                    <div class="form-group">
                        <label>Сообщение</label>
                        <textarea id="message" class="contacts__textarea" rows="5" placeholder="Ваше сообщение..." required></textarea>
                        <div class="form-error" id="messageError"></div>
                    </div>
                    
                    <button type="submit" class="contacts__btn">Отправить</button>
                </form>
            </section>
        `;

        this.attachEvents();
    }

    attachEvents() {
        const form = document.getElementById('contactForm');
        const fullNameInput = document.getElementById('fullName');
        const phoneInput = document.getElementById('phone');
        const dateInput = document.getElementById('contactDate');
        const photoInput = document.getElementById('photo');

        // Маска телефона
        phoneInput.addEventListener('input', (e) => {
            let digits = e.target.value.replace(/\D/g, '');
            if (digits.startsWith('7') || digits.startsWith('8')) digits = digits.substring(1);
            digits = digits.substring(0, 10);
            
            let formatted = '+7';
            if (digits.length > 0) formatted += ' (' + digits.substring(0, 3);
            if (digits.length >= 4) formatted += ') ' + digits.substring(3, 6);
            if (digits.length >= 7) formatted += '-' + digits.substring(6, 8);
            if (digits.length >= 9) formatted += '-' + digits.substring(8, 10);
            e.target.value = formatted;
        });

        // ФИО — только буквы
        fullNameInput.addEventListener('keydown', (e) => {
            const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End'];
            if (allowedKeys.includes(e.key)) return;
            if (e.key === ' ') return;
            if (e.key === '-') return;
            if (!/[а-яА-ЯёЁ]/.test(e.key)) e.preventDefault();
        });

        fullNameInput.addEventListener('input', (e) => {
            this.parseFIO(e.target.value);
        });

        // Дата — проверка в реальном времени
        dateInput.addEventListener('input', () => {
            const errorElement = document.getElementById('dateError');
            if (dateInput.value < dateInput.min) {
                errorElement.textContent = 'Дата не может быть раньше сегодняшней';
            } else {
                errorElement.textContent = '';
            }
        });

        // Превью фото (только JPEG/PNG)
        photoInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            const errorElement = document.getElementById('photoError');
            const preview = document.getElementById('photoPreview');
            
            errorElement.textContent = '';
            preview.innerHTML = '';
            
            if (!file) return;
            
            if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                errorElement.textContent = '❌ Можно загружать только файлы JPEG и PNG';
                photoInput.value = '';
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (event) => {
                preview.innerHTML = `<img src="${event.target.result}" alt="Превью" class="photo-preview__img">`;
            };
            reader.readAsDataURL(file);
        });

        // Отправка формы
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;
            
            // ФИО
            const fioValue = fullNameInput.value.trim();
            const fioParts = fioValue.split(/\s+/);
            if (fioParts.length < 2 || !/^[а-яА-ЯёЁ\s\-]+$/.test(fioValue)) {
                document.getElementById('fullNameError').textContent = 'Введите ФИО (минимум 2 слова, только буквы)';
                isValid = false;
            } else {
                document.getElementById('fullNameError').textContent = '';
            }
            
            // Email
            const email = document.getElementById('email').value;
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                document.getElementById('emailError').textContent = 'Введите корректный email';
                isValid = false;
            } else {
                document.getElementById('emailError').textContent = '';
            }
            
            // Телефон
            const phoneDigits = phoneInput.value.replace(/\D/g, '');
            if (phoneDigits.length !== 11) {
                document.getElementById('phoneError').textContent = 'Введите полный номер: +7 (XXX) XXX-XX-XX';
                isValid = false;
            } else {
                document.getElementById('phoneError').textContent = '';
            }
            
            // Сообщение
            const message = document.getElementById('message').value;
            if (message.trim().length < 10) {
                document.getElementById('messageError').textContent = 'Минимум 10 символов';
                isValid = false;
            } else {
                document.getElementById('messageError').textContent = '';
            }
            
            if (isValid) {
                alert('✅ Форма успешно отправлена!');
                form.reset();
                document.getElementById('photoPreview').innerHTML = '';
                document.getElementById('fioOutput').style.display = 'none';
            }
        });
    }

    parseFIO(value) {
        const parts = value.trim().split(/\s+/);
        const fioOutput = document.getElementById('fioOutput');
        
        if (parts.length >= 2) {
            document.getElementById('fioLast').textContent = parts[0] || '—';
            document.getElementById('fioFirst').textContent = parts[1] || '—';
            document.getElementById('fioMiddle').textContent = parts[2] || '—';
            fioOutput.style.display = 'block';
        } else {
            fioOutput.style.display = 'none';
        }
    }
}