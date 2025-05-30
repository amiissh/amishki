document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault(); // Предотвращение стандартного поведения ссылки

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth", // Плавный скроллинг
    });
  });
});

const menuBtn = document.querySelector(".menu-btn");
const menuMobile = document.querySelector(".menu-mobile");

menuBtn.addEventListener("click", () => {
  menuMobile.classList.toggle("menu--open");
});

const swiper = new Swiper(".swiper", {
  loop: true,
  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-right",
    prevEl: ".swiper-button-left",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
  },
});

ymaps.ready(init);
function init() {
  var myMap = new ymaps.Map("map", {
    center: [50.5, 8.0], // Пример центра (приблизительно середина маршрута) - заменить!
    zoom: 8,
    controls: ["zoomControl", "geolocationControl"], // Добавили управление геолокацией
  });

  // Получаем координаты маршрута (ВЫ ДОЛЖНЫ ЗАПОЛНИТЬ ЭТОТ МАССИВ!)
  var routeCoordinates = [
    // [широта_Дюссельдорф, долгота_Дюссельдорф],
    // [широта_точка2, долгота_точка2],
    // ...,
    // [широта_Майнц, долгота_Майнц]
  ];

  // Создаем полилинию
  var myPolyline = new ymaps.Polyline(
    routeCoordinates,
    {
      strokeColor: "#007bff", // Цвет линии
      strokeWidth: 5, // Ширина линии
      balloonContent: "Веломаршрут Дюссельдорф - Майнц",
    },
    {
      // geodesic: true // Использовать геодезические линии.
    }
  );

  myMap.geoObjects.add(myPolyline);
  myMap.setBounds(myPolyline.getBounds(), { checkZoomRange: true }); // Подгонка масштаба, проверка диапазона зума

  // Добавляем метки на начало и конец маршрута
  var startPlacemark = new ymaps.Placemark(routeCoordinates[0], {
    balloonContent: "Дюссельдорф",
  });
  var endPlacemark = new ymaps.Placemark(
    routeCoordinates[routeCoordinates.length - 1],
    {
      balloonContent: "Майнц",
    }
  );
  myMap.geoObjects.add(startPlacemark);
  myMap.geoObjects.add(endPlacemark);
}
