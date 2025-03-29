// Перенос к следующей сцене
const toggleButton = document.getElementById('toggleButton');
const section2 = document.getElementById('section2');
toggleButton.addEventListener('click', function() {
section2.classList.toggle('visible');
});
// Рисование
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
// Кнопка для изменения цвета и сами цвета кисточки
const paletteButton = document.querySelector('.palette');
const colors = ['crimson', 'skyblue', 'darkgreen'];
let currentColorIndex = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Толщина линии кисточки и ее тип
ctx.lineWidth = 10;
ctx.lineCap = 'round';

// Обработчик для смены цвета
paletteButton.addEventListener('click', () => {
    currentColorIndex = (currentColorIndex + 1) % colors.length;
});

// Функция для получения координат касания
function getTouchPos(canvasDom, touchEvent) {
    const rect = canvasDom.getBoundingClientRect();
    return {
        x: touchEvent.touches[0].clientX - rect.left,
        y: touchEvent.touches[0].clientY - rect.top
    };
}

// Обработчики для рисования мышью
// Начало рисования, получение первой точки  (зажатие мышки)
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});
// Продолжение рисования из начатой точки (мышка зажата)
canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        ctx.strokeStyle = colors[currentColorIndex];
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }
});
// Конец рисования  (мышка отпущена)
canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});
// Рисование прерывается если покинуло зону рисования (канвас)
canvas.addEventListener('mouseleave', () => {
    isDrawing = false;
});

// Обработчики для рисования на сенсорных устройствах
// Начало рисования, получение первой точки  (зажатие тача)
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touchPos = getTouchPos(canvas, e);
    isDrawing = true;
    [lastX, lastY] = [touchPos.x, touchPos.y];
});
// Продолжение рисования из начатой точки
canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if (isDrawing) {
        const touchPos = getTouchPos(canvas, e);
        ctx.strokeStyle = colors[currentColorIndex];
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(touchPos.x, touchPos.y);
        ctx.stroke();
        [lastX, lastY] = [touchPos.x, touchPos.y];
    }
});
// Конец рисование (отпускание тача)
canvas.addEventListener('touchend', () => {
    isDrawing = false;
});

// Обработчик изменения размера окна
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
