// Функция анимации надписи "наряди его"
(function () {
  const images = [
    "images/dress_up1.png",
    "images/dress_up2.png",
    "images/dress_up3.png",
    "images/dress_up4.png"
  ];
  let currentIndex = 0;
  const dressUpImage = document.getElementById('dressUpImage');

  function changeImage() {
      currentIndex = (currentIndex + 1) % images.length;
      dressUpImage.src = images[currentIndex];
  }
  setInterval(changeImage, 250);
})();
 // Получаем элементы зрачков
 const leftPupil = document.getElementById('left-pupil');
 const rightPupil = document.getElementById('right-pupil');
 // Получаем границы глаз (эллипсы)
 const leftEye = { cx: 492.965, cy: 106.748, rx: 12.6022, ry: 16.3087 };
 const rightEye = { cx: 570.063, cy: 106.748, rx: 12.6022, ry: 16.3087 };
 // Функция для обновления позиции зрачков
 function updatePupils(event) {
   const mouseX = event.clientX;
   const mouseY = event.clientY;
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
   const maxDx = eye.rx - pupil.getAttribute('r');
   const maxDy = eye.ry - pupil.getAttribute('r');
   const sensitivity = 0.9;
   const newX = eyeCenterX + Math.cos(angle) * maxDx * sensitivity;
   const newY = eyeCenterY + Math.sin(angle) * maxDy * sensitivity;
   pupil.setAttribute('cx', newX);
   pupil.setAttribute('cy', newY);
 }
 // Добавляем обработчик события движения мыши
 document.addEventListener('mousemove', updatePupils);

// Одевание медведя

// Получаем все элементы с классом draggable
const draggableElements = document.querySelectorAll('.draggable');
// Добавляем обработчики перетаскивания к каждому элементу
draggableElements.forEach(element => {
    addDragAndDrop(element);
});
// Функции для перетаскивания
function addDragAndDrop(element) {
    let isDragging = false;
    let offsetX, offsetY;
// Функция для начала перетаскивания
function startDrag(e) {
    isDragging = true;
    const clientX = e.clientX || e.touches[0].clientX;
    const clientY = e.clientY || e.touches[0].clientY;
    const rect = element.getBoundingClientRect();
    offsetX = clientX - rect.left;
    offsetY = clientY - rect.top;
    const computedStyle = window.getComputedStyle(element);
    const transform = computedStyle.transform;

    if (transform !== 'none') {
        const matrix = transform.match(/matrix.*\((.+)\)/)[1].split(', ');
        const translateX = parseFloat(matrix[4]); // X-смещение
        const translateY = parseFloat(matrix[5]); // Y-смещение

        // Устанавливаем left и top на основе transform
        element.style.left = `${translateX}px`;
        element.style.top = `${translateY}px`;
        element.style.transform = 'none'; // Убираем transform
    }
    // Отключаем стандартное поведение браузера для перетаскивания
    e.preventDefault();
}
// Функция для перемещения элемента
function drag(e) {
    if (isDragging) {
        const clientX = e.clientX || e.touches[0].clientX;
        const clientY = e.clientY || e.touches[0].clientY;

        // Устанавливаем новые координаты через left и top
        element.style.left = `${clientX - offsetX}px`;
        element.style.top = `${clientY - offsetY}px`;
    }
}
// Функция для завершения перетаскивания
function endDrag() {
    isDragging = false;
    element.style.zIndex = 4;
}
// Добавляем обработчики для мыши
element.addEventListener('mousedown', startDrag);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', endDrag);

// Добавляем обработчики для сенсорных устройств
element.addEventListener('touchstart', startDrag);
document.addEventListener('touchmove', drag);
document.addEventListener('touchend', endDrag);

// Отключаем стандартное поведение для события dragstart
element.addEventListener('dragstart', (e) => {
    e.preventDefault();
});
}
// Перенос на секцию 4
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
    // Показываем медведя с барабаном и декорации
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
    // Через 3 секунд убираем фильтр прожектора
    setTimeout(() => {
      filter.classList.remove('active');
    }, 3000); 
  });
});