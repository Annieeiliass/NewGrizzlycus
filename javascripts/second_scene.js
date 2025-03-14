// Функция изменения надписи "вырежи их"
const images = [
    "images/cut_1.png",
    "images/cut_2.png",
    "images/cut_3.png",
    "images/cut_4.png"
];
let currentIndex = 0;
const cutImage = document.getElementById('cutImage');
function changeImage() {
    currentIndex = (currentIndex + 1) % images.length;
    cutImage.src = images[currentIndex];
}
setInterval(changeImage, 250);

// Функция для вырезания картинок
// Получаем все элементы с классом item
const items = document.querySelectorAll('.item');
// Добавляем обработчик события click для каждого элемента
items.forEach(item => {
    item.addEventListener('click', function() {
        // Получаем значения из атрибутов data-cut и data-new
        const cutImageSrc = this.getAttribute('data-cut');
        const newImageSrc = this.getAttribute('data-new');
        // Меняем src текущей картинки
        this.src = cutImageSrc;
        // Создаем новую картинку
        const newImage = document.createElement('img');
        newImage.src = newImageSrc;
         // Добавляем класс для стилизации
        newImage.classList.add('draggable');
        // Вставляем новую картинку рядом с текущей
        this.insertAdjacentElement('afterend', newImage);
        // Позиционируем новую картинку чуть правее исходной
        const rect = this.getBoundingClientRect();
        newImage.style.position = 'absolute';
        newImage.style.left = `${rect.left}px`;
        newImage.style.top = `${rect.top}px`;
        // Убираем обработчик события, чтобы предотвратить повторное нажатие
        this.removeEventListener('click', arguments.callee);
        // Доавляем обработчики для перетаскивания
        addDragAndDrop(newImage);
    });
});
function addDragAndDrop(element) {
    let isDragging = false;
    let offsetX, offsetY;

// Функции для перетаскивания вырезанных картинок
function startDrag(clientX, clientY) {
    isDragging = true;
    offsetX = clientX - element.getBoundingClientRect().left;
    offsetY = clientY - element.getBoundingClientRect().top;
    element.style.position = 'absolute';
    element.style.zIndex = 2;
}
function moveDrag(clientX, clientY) {
    if (isDragging) {
        element.style.left = `${clientX - offsetX}px`;
        element.style.top = `${clientY - offsetY}px`;
    }
}
// завершение перетаскивания
function endDrag() {
    isDragging = false;
}
// Обработчики для мыши
element.addEventListener('mousedown', (e) => {
    startDrag(e.clientX, e.clientY);
    e.preventDefault();
});
document.addEventListener('mousemove', (e) => {
    moveDrag(e.clientX, e.clientY);
});
document.addEventListener('mouseup', endDrag);
// Обработчики для сенсорных устройств
element.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    startDrag(touch.clientX, touch.clientY);
    e.preventDefault();
});
document.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    moveDrag(touch.clientX, touch.clientY);
});
document.addEventListener('touchend', endDrag);
// Отключаем стандартное поведение для события dragstart
element.addEventListener('dragstart', (e) => {
    e.preventDefault();
});
}
// Перенос на секцию 3
document.addEventListener('DOMContentLoaded', function() {
    const toggleButton2 = document.getElementById('toggleButton2');
    const section3 = document.getElementById('section3');
    toggleButton2.addEventListener('click', function() {
      section3.classList.toggle('visible');
    });
});