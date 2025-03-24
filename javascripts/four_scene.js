// Анимация медведя с барабаном
(function () {
    const images = [
      "images/beardrum_1.svg",
      "images/beardrum_2.svg"
    ];
    let currentIndex = 0;
    const beardrumImage = document.getElementById('beardrumImage');
  
    function changeImage() {
        currentIndex = (currentIndex + 1) % images.length;
        beardrumImage.src = images[currentIndex];
    }
    setInterval(changeImage, 300);
 })();

 