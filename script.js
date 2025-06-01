// Получаем элементы
const carImage = document.getElementById('carImage');
const modelItems = document.querySelectorAll('.modelItem');

// Функция изменения изображения
function changeImage(event) {
    // Удаляем активный класс у всех элементов
    modelItems.forEach(item => item.classList.remove('active'));
    
    // Получаем текущий элемент
    const clickedItem = event.target.closest('.modelItem');
    if (!clickedItem) return; // Если элемент не найден
    
    // Добавляем активный класс
    clickedItem.classList.add('active');
    
    // Меняем изображение
    const imageSrc = clickedItem.dataset.image;
    carImage.src = `source/${imageSrc}?v=${Date.now()}`; // Добавлен параметр для кэша
    
    // Обработка ошибок
    carImage.onerror = function() {
        console.error(`Ошибка загрузки изображения: ${imageSrc}`);
        carImage.src = ''; // Очищаем src при ошибке
    };
}

// Добавляем обработчики событий
modelItems.forEach(item => {
    item.addEventListener('click', function(event) {
        console.log('Клик:', event.target.textContent);
        changeImage(event);
    });
});