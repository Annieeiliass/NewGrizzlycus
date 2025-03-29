// Медведь барабанит при нажатии на него
(function () {
  const images = [
      "images/beardrum_1.svg",
      "images/beardrum_2.svg"
  ];
  let currentIndex = 0;
  const beardrumImage = document.getElementById('beardrumImage');
  // Звук барабана
  const drumSound = new Audio('audio/drum.mp3');
  drumSound.volume = 0.2;
  function handleClick() {
      // Смена изображения
      currentIndex = (currentIndex + 1) % images.length;
      beardrumImage.src = images[currentIndex];
      // Воспроизведение звука
      drumSound.currentTime = 0;
      drumSound.play();
  }
  beardrumImage.addEventListener('click', handleClick);
})();