export class SkillsPage {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
    }

    render() {
        const skills = [
            { name: '3D Моделирование', level: 90 },
            { name: 'Планирование пространства', level: 95 },
            { name: 'Подбор материалов', level: 85 },
            { name: 'AutoCAD', level: 88 },
            { name: 'SketchUp', level: 92 },
            { name: 'Adobe Photoshop', level: 80 }
        ];

        // Средний уровень через reduce
        const avgLevel = skills.reduce((sum, skill) => sum + skill.level, 0) / skills.length;

        const skillsHTML = skills.map(skill => `
            <div class="skill__item">
                <h3>${skill.name} <span class="skill__percent">${skill.level}%</span></h3>
                <div class="skill__bar">
                    <div class="skill__progress" style="width: ${skill.level}%"></div>
                </div>
            </div>
        `).join('');

        this.container.innerHTML = `
            <section class="skills">
                <h1 class="skills__title">Мои навыки</h1>
                <div class="skills__summary">
                    <p>Средний уровень мастерства: <strong>${avgLevel.toFixed(1)}%</strong></p>
                    <p>Всего навыков: <strong>${skills.length}</strong></p>
                </div>
                <div class="skills__list">${skillsHTML}</div>
            </section>
        `;
    }
}