document.addEventListener("DOMContentLoaded", () => {
  const dropdownButton = document.querySelector(".dropdown-btn"); // Получаем один элемент с этим классом
  const dropdown = document.querySelector(".dropdown"); // Получаем один элемент с этим классом

  // Проверяем, существуют ли элементы
  if (!dropdownButton) {
    console.error("Элемент с классом 'dropdown-btn' не найден.");
    return;
  }

  if (!dropdown) {
    console.error("Элемент с классом 'dropdown' не найден.");
    return;
  }

  // Показать/скрыть dropdown-список
  dropdownButton.addEventListener("click", (event) => {
    event.stopPropagation(); // Останавливаем всплытие события
    dropdown.style.display =
      dropdown.style.display === "flex" ? "none" : "flex";
  });

  // Скрыть dropdown-список при клике вне
  document.addEventListener("click", (event) => {
    if (
      !dropdown.contains(event.target) &&
      !dropdownButton.contains(event.target)
    ) {
      dropdown.style.display = "none";
    }
  });
});