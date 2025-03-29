// Функция анимации надписи "наряди его"
// Виды надписей
(function () {
  const images = [
    "images/dress_up1.png",
    "images/dress_up2.png",
    "images/dress_up3.png",
    "images/dress_up4.png"
  ];
  let currentIndex = 0;
  const dressUpImage = document.getElementById('dressUpImage');
// Изменение надписей
  function changeImage() {
      currentIndex = (currentIndex + 1) % images.length;
      dressUpImage.src = images[currentIndex];
  }
  setInterval(changeImage, 250);
})();
// svg картинка медведя (через простой тег <img> нельзя обращаться к айди глаз)
fetch("images/bear.svg")
  .then(response => response.text())
  .then(svg => {
    document.getElementById('bear').innerHTML = svg;
      //svg встроивается в DOM
    setTimeout(() => {
        initEyeTracking();
    }, 0); 
});
function initEyeTracking() {
// Медведь следит за курсором. Находим элементы зрачков.
const leftPupil = document.getElementById('left-pupil');
const rightPupil = document.getElementById('right-pupil');
// Получаем границы глаз 
const leftEye = { cx: 492.965, cy: 106.748, rx: 12.6022, ry: 16.3087 };
const rightEye = { cx: 570.063, cy: 106.748, rx: 12.6022, ry: 16.3087 };
// Функция для обновления позиции зрачков
function updatePupils(event) {
  const svgRect = document.querySelector('svg').getBoundingClientRect();
  const mouseX = event.clientX - svgRect.left;
  const mouseY = event.clientY - svgRect.top;
  // Обновляем позицию левого зрачка
  updatePupilPosition(leftPupil, leftEye, mouseX, mouseY);
  // Обновляем позицию правого зрачка
  updatePupilPosition(rightPupil, rightEye, mouseX, mouseY);
}
// Функция для обновления позиции зрачков
function updatePupilPosition(pupil, eye, mouseX, mouseY) {
  const eyeCenterX = eye.cx;
  const eyeCenterY = eye.cy;
  const dx = mouseX - eyeCenterX;
  const dy = mouseY - eyeCenterY;
  const angle = Math.atan2(dy, dx);
  // Получаем радиус зрачка
  const pupilRadius = parseFloat(pupil.getAttribute('r'));
  // Ограничиваем движение зрачка в пределах глаза
  const maxDx = eye.rx - pupilRadius;
  const maxDy = eye.ry - pupilRadius;
  // Рассчитываем новые координаты зрачка
  const newX = eyeCenterX + Math.cos(angle) * maxDx;
  const newY = eyeCenterY + Math.sin(angle) * maxDy;
  // Устанавливаем новые координаты зрачка
  pupil.setAttribute('cx', newX);
  pupil.setAttribute('cy', newY);
}
// Добавляем обработчик события движения мыши
document.addEventListener('mousemove', updatePupils);

// Одевание медведя
const draggableElements = document.querySelectorAll('.draggable');

draggableElements.forEach(element => {
    let isDragging = false;
    let offsetX, offsetY;
    // Отключаем стандартное поведение браузера при перетаскивания
    element.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });
    // Обработчики для мыши
    element.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - parseFloat(getComputedStyle(element).transform.split(',')[4]);
        offsetY = e.clientY - parseFloat(getComputedStyle(element).transform.split(',')[5]);
    });
    // Обработчики для сенсорных устройств
    element.addEventListener('touchstart', (e) => {
        isDragging = true;
        const touch = e.touches[0];
        offsetX = touch.clientX - parseFloat(getComputedStyle(element).transform.split(',')[4]);
        offsetY = touch.clientY - parseFloat(getComputedStyle(element).transform.split(',')[5]);
    });
    // Общий обработчик для перемещения (мышка и сенсорные экраны)
    const moveHandler = (clientX, clientY) => {
        if (isDragging) {
            const x = clientX - offsetX;
            const y = clientY - offsetY;
            element.style.transform = `translate(${x}px, ${y}px)`;
        }
    };
    // Перемещение для мыши
    document.addEventListener('mousemove', (e) => {
        moveHandler(e.clientX, e.clientY);
    });
    // Перемещение для сенсорных устройств
    document.addEventListener('touchmove', (e) => {
        const touch = e.touches[0]; // Получаем первый тач
        moveHandler(touch.clientX, touch.clientY);
    });
    // Завершение перетаскивания
    const stopDragging = () => {
        isDragging = false;
    };
    document.addEventListener('mouseup', stopDragging);
    document.addEventListener('touchend', stopDragging);
});
}
// Перенос на секцию 4
// Элементы секции 4
document.addEventListener('DOMContentLoaded', function() {
const toggleButton3 = document.getElementById('toggleButton3');
const section4 = document.getElementById('section4');
const curtains = document.querySelector('.curtains');
const filter = document.createElement('div');
const bearDrum = document.querySelector('.bear_drum');
const Items = document.querySelectorAll('.items');
// Добавляем фильтр в секцию
filter.classList.add('filter');
section4.appendChild(filter);
  toggleButton3.addEventListener('click', function() {
    // Показываем медведя с барабаном, декорации
    bearDrum.style.display = 'block';
    Items.forEach(item => {
      item.style.display = 'block';
    });
    // Переключаем видимость секции 4
    section4.classList.toggle('visible');
    curtains.classList.remove('active');
    filter.classList.remove('active');
    setTimeout(() => {
    // Показ занавесов и фильтра (прожектора)
      curtains.classList.add('active');
      filter.classList.add('active');
    }, 100);
    // Через 3 секунды убирается фильтр прожектора
    setTimeout(() => {
      filter.classList.remove('active');
    }, 3200); 
    // Убираем в z-index -10 фильтр и занавески, чтоб они не мешали взаимодействовать с медведем
    setTimeout(() => {
      filter.style.zIndex = '-10';
      curtains.style.zIndex = '-10';
    }, 4000); 
  });
});