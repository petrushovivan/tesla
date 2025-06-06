document.addEventListener('DOMContentLoaded', () => {
  const carImage = document.getElementById('carImage');
  const modelItems = document.querySelectorAll('.modelItem');
  const blocks = document.querySelectorAll('.pageSixteen .block');
  const video = document.querySelector('.pageSixteen #feature-video');

  // Проверка на наличие элементов
  if (!carImage) {
    console.warn('Элемент carImage не найден в DOM');
  }
  if (!video) {
    console.warn('Элемент feature-video не найден в DOM');
  }
  if (blocks.length === 0) {
    console.warn('Блоки .pageSixteen .block не найдены в DOM');
  }

  // Функция изменения изображения
  function changeImage(event) {
    if (!carImage) return; // Пропускаем, если элемент не найден
    modelItems.forEach(item => item.classList.remove('active'));
    const clickedItem = event.target.closest('.modelItem');
    if (clickedItem) {
      console.log('Клик по modelItem:', clickedItem.textContent);
      clickedItem.classList.add('active');
      const imageSrc = clickedItem.dataset.image;
      carImage.src = `source/${imageSrc}?v=${Date.now()}`;
      carImage.onerror = function() {
        console.error(`Ошибка загрузки изображения: ${imageSrc}`);
        carImage.src = '';
      };
    }
  }

  // Функция изменения видео
  function changeVideo(event) {
    if (!video) return; // Пропускаем, если элемент не найден
    blocks.forEach(b => b.classList.remove('selected'));
    const clickedBlock = event.target.closest('.pageSixteen .block');
    if (clickedBlock) {
      console.log('Клик по блоку:', clickedBlock.textContent);
      clickedBlock.classList.add('selected');
      const videoSrc = clickedBlock.getAttribute('data-video');
      console.log('Меняем видео на:', videoSrc);
      video.src = videoSrc;
      video.load();
      video.play().catch(error => {
        console.error('Ошибка воспроизведения видео:', error);
      });
    }
  }

  // Общий обработчик событий для всех кликов
  function handleClick(event) {
    console.log('Клик:', event.target.textContent);
    changeImage(event);
    changeVideo(event);
  }

  // Добавляем обработчики событий
  modelItems.forEach(item => {
    item.addEventListener('click', handleClick);
  });

  blocks.forEach(block => {
    block.addEventListener('click', handleClick);
  });
});


document.addEventListener('DOMContentLoaded', function () {
    const videos = document.querySelectorAll('.videoItem');
    const indicators = document.querySelectorAll('.indicator');
    const texts = document.querySelectorAll('.text');
    const pauseButtons = document.querySelectorAll('.pauseButton');

    let currentVideo = 0;
    let isPlaying = true;

    // Переключение видео
    function switchVideo(index) {
        videos.forEach((video, i) => {
            if (i === index) {
                video.classList.add('active');
                texts[i].classList.add('active');
                indicators[i].classList.add('active');
            } else {
                video.classList.remove('active');
                texts[i].classList.remove('active');
                indicators[i].classList.remove('active');
            }
        });
    }

    // Обработчики для индикаторов
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            switchVideo(index);
        });
    });

    // Автоматическое переключение через 5 секунд
    setInterval(() => {
        currentVideo = (currentVideo + 1) % 5;
        switchVideo(currentVideo);
    }, 5000);

    // Пауза/воспроизведение
    pauseButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const video = videos[index].querySelector('video');
            isPlaying = !isPlaying;
            if (isPlaying) {
                video.play();
                button.querySelector('svg').style.stroke = 'white';
            } else {
                video.pause();
                button.querySelector('svg').style.stroke = '#ff0000';
            }
        });
    });

    // Инициализация
    switchVideo(0);
});

document.addEventListener('DOMContentLoaded', function () {
    const routeItems = document.querySelectorAll('.routeItem');
    const routes = document.querySelectorAll('.route');

    function switchRoute(event) {
        // Сбрасываем активные классы
        routeItems.forEach(item => item.classList.remove('active'));
        routes.forEach(route => route.classList.remove('active'));

        // Получаем ID маршрута
        const routeId = event.target.dataset.route;
        const activeRoute = document.querySelector(`.route[data-route="${routeId}"]`);

        if (activeRoute) {
            activeRoute.classList.add('active');
            event.target.classList.add('active');
        }
    }

    // Добавляем обработчики событий
    routeItems.forEach(item => {
        item.addEventListener('click', switchRoute);
    });

    // Инициализация — активируем первый маршрут
    routeItems[0].classList.add('active');
    routes[0].classList.add('active');
});