var Cal = function (divId) {
  //Сохраняем идентификатор div
  this.divId = divId;

  // Месяцы начиная с января
  this.Months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  // Конфигурация подписок
  this.subscriptions = [
    {
      date: new Date(2024, 10, 6),
      service: "VK Music",
      icon: "../static/icons/vk_music-icon.png",
    },
    {
      date: new Date(2024, 10, 16),
      service: "Apple",
      icon: "../static/icons/apple-icon.png",
    },
    {
      date: new Date(2024, 10, 21),
      service: "Spotify",
      icon: "../static/icons/spotify-icon.png",
    },
    {
      date: new Date(2024, 10, 26),
      service: "Netflix",
      icon: "../static/icons/netflix-icon.png",
    },
  ];

  //Устанавливаем текущий месяц, год
  var d = new Date();
  this.currMonth = d.getMonth();
  this.currYear = d.getFullYear();
  this.currDay = d.getDate();
};

// Переход к следующему месяцу
Cal.prototype.nextMonth = function () {
  if (this.currMonth == 11) {
    this.currMonth = 0;
    this.currYear = this.currYear + 1;
  } else {
    this.currMonth = this.currMonth + 1;
  }
  this.showcurr();
};

// Переход к предыдущему месяцу
Cal.prototype.previousMonth = function () {
  if (this.currMonth == 0) {
    this.currMonth = 11;
    this.currYear = this.currYear - 1;
  } else {
    this.currMonth = this.currMonth - 1;
  }
  this.showcurr();
};

// Показать текущий месяц
Cal.prototype.showcurr = function () {
  this.showMonth(this.currYear, this.currMonth);
};

// Показать месяц (год, месяц)
Cal.prototype.showMonth = function (y, m) {
  var d = new Date(),
    // Первый день недели в выбранном месяце
    firstDayOfMonth = new Date(y, m, 7).getDay(),
    // Последний день выбранного месяца
    lastDateOfMonth = new Date(y, m + 1, 0).getDate(),
    // Последний день предыдущего месяца
    lastDayOfLastMonth =
      m == 0 ? new Date(y - 1, 11, 0).getDate() : new Date(y, m, 0).getDate();
  var html = '<div id="calendar-cells">';
  // Запись выбранного месяца и года
  html += '<span id="month-name">' + this.Months[m] + " " + y + "</span>";

  // Записываем дни
  var i = 1;
  do {
    var dow = new Date(y, m, i).getDay();
    // Начать новую строку в понедельник
    if (dow == 1) {
      html += '<div class="calendar-row">';
    }
    // Если первый день недели не понедельник показать последние дни предыдущего месяца
    else if (i == 1) {
      html += '<div class="calendar-row">';
      var k = lastDayOfLastMonth - firstDayOfMonth + 1;
      for (var j = 0; j < firstDayOfMonth; j++) {
        html += '<div class="day other-month">' + k + "</div>";
        k++;
      }
    }

    // Проверяем, есть ли подписка на текущую дату
    const subscription = this.subscriptions.find(
      (sub) =>
        sub.date.getFullYear() === y &&
        sub.date.getMonth() === m &&
        sub.date.getDate() === i
    );

    // Записываем текущий день в цикл
    var chk = new Date();
    var chkY = chk.getFullYear();
    var chkM = chk.getMonth();
    if (chkY == this.currYear && chkM == this.currMonth && i == this.currDay) {
      html += '<div class="day current">' + i + "</div>";
    } else if (subscription) {
      // Подсветка и иконка подписки
      html += '<div class="day subscription">';
      html += i;
      html += `<img  class="subscription-icon" src="${subscription.icon}" alt="${subscription.service}">`;
      html += "</div>";
    } else {
      html += '<div class="day">' + i + "</div>";
    }

    // закрыть строку в воскресенье
    if (dow == 0) {
      html += "</div>";
    }

    // Если последний день месяца не воскресенье, показать первые дни следующего месяца
    else if (i == lastDateOfMonth) {
      var k = 1;
      for (dow; dow < 7; dow++) {
        html += '<div class="day other-month">' + k + "</div>";
        k++;
      }
    }
    i++;
  } while (i <= lastDateOfMonth);
  // Конец таблицы
  html += "</div>";
  // Записываем HTML в div
  document.getElementById(this.divId).innerHTML = html;
};

// При загрузке окна
window.onload = function () {
  // Начать календарь
  var c = new Cal("divCal");
  c.showcurr();
  // Привязываем кнопки «Следующий» и «Предыдущий»
  getId("btnNext").onclick = function () {
    c.nextMonth();
  };
  getId("btnPrev").onclick = function () {
    c.previousMonth();
  };
};
// Получить элемент по id
function getId(id) {
  return document.getElementById(id);
}