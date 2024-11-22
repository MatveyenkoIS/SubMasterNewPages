// Обновление гистограммы (отображение 5 месяцев с месяцем по центру)
function renderBars(currentMonth, monthsData, _currentYear, currentRealMonth) {
    // Находим элемент гистограммы
    const barGraphContainer = document.querySelector(".bar-graph");
  
    if (!barGraphContainer) {
      console.error("Элемент с классом 'bar-graph' не найден");
      return;
    }
  
    // Очищаем содержимое контейнера
    barGraphContainer.innerHTML = "";
  
    const totalMonths = monthsData.length;
  
    // Вычисляем диапазон отображения (5 месяцев с центром на currentMonth)
    const indices = [];
    for (let i = -2; i <= 2; i++) {
      indices.push((currentMonth + i + totalMonths) % totalMonths); // Используем модуль для кругового цикла
    }
  
    indices.forEach((monthIndex) => {
      const data = monthsData[monthIndex];
      const barContainer = document.createElement("div");
      barContainer.className = "bar-container";
  
      // Подпись месячных трат
      const barLabelExpense = document.createElement("div");
      barLabelExpense.className = "bar-label";
      barLabelExpense.textContent = `${data.value}₽`;
  
      // Создаём полосу
      const bar = document.createElement("div");
      bar.className = "bar";
      bar.style.height = `calc(0.08 * ${data.value}px)`; // Высота пропорциональна значению
  
      // Подсветка текущего реального месяца (по текущей дате)
      bar.style.backgroundColor =
        monthIndex === currentRealMonth ? "#1a56db" : "#ffab04";
  
      // Подпись месяца
      const barLabelMonth = document.createElement("div");
      barLabelMonth.className = "bar-label";
      barLabelMonth.textContent = `${data.name}`;
  
      // Добавляем полосу и подпись в контейнер
      barContainer.appendChild(barLabelExpense)
      barContainer.appendChild(bar);
      barContainer.appendChild(barLabelMonth);
      barGraphContainer.appendChild(barContainer);
    });
  }
  
  // Генерация данных гистограммы
  function generateMockData() {
    return [
      { name: "Январь", value: 2306 },
      { name: "Февраль", value: 0 },
      { name: "Март", value: 0 },
      { name: "Апрель", value: 0 },
      { name: "Май", value: 0 },
      { name: "Июнь", value: 0 },
      { name: "Июль", value: 0 },
      { name: "Август", value: 0 },
      { name: "Сентябрь", value: 1867 },
      { name: "Октябрь", value: 3975 },
      { name: "Ноябрь", value: 2758 },
      { name: "Декабрь", value: 1423 },
    ];
  }
  
  // Синхронизация календаря и гистограммы
  function syncBarsWithCalendar(cal, monthsData, currentRealMonth) {
    // Функция для обновления гистограммы
    function updateBars() {
      renderBars(cal.currMonth, monthsData, cal.currYear, currentRealMonth);
    }
  
    updateBars()
  
    // Привязка кнопок календаря
    getId("btnNextCalendar").onclick = function () {
      cal.nextMonth();
      updateBars();
    };
    getId("btnPrevCalendar").onclick = function () {
      cal.previousMonth();
      updateBars();
    };
  
    // Привязка кнопок гистограммы
    getId("btnNextGraph").onclick = function () {
      cal.nextMonth();
      updateBars();
    };
    getId("btnPrevGraph").onclick = function () {
      cal.previousMonth();
      updateBars();
    };
  }
  
  // Запуск после загрузки страницы
  window.onload = function () {
    // Проверяем, что календарь существует
    const calendarContainer = document.getElementById("divCal");
    if (!calendarContainer) {
      console.error("Элемент с id 'divCal' не найден");
      return;
    }
  
    // Инициализируем календарь
    const cal = new Cal("divCal");
    cal.showcurr();
  
    // Генерируем данные для гистограммы
    const monthsData = generateMockData();
  
    // Определяем текущую дату
    const today = new Date();
    const currentRealMonth = today.getMonth();
  
    // Связываем гистограмму с календарём
    syncBarsWithCalendar(cal, monthsData, currentRealMonth);
  }