# Web-сайт для тестового задания (Sber)

## Технологии
- Express.js
- JavaScript ES6
- Аутентификация по логину паролю
- Хранение авторизации в сессии на сервере
- библиотека Chart.js
- Responsive верстка (plain css)
- Pug-шаблоны
- Webpack (для импорта библиотеки Chart.js)
- Минификация (сжатие) не используется
- Образ Docker

## Установка
````
Сборка и запуск в Docker:
docker compose up -d --build

После установки сайт доступен:
http://localhost:3000

Остановка:
docker compose down
````

## Структура проекта
````
/         - Root сайта (форма авторизации)
/service  - Выбор чарта
/chart    - Отображении чарта
````

## Структура файлов
````
sber-chart-test/
├── bin/
│   └── www /* Node.js-сервер */
├── public/
│   ├── css/
│   │   ├── normalize.css
│   │   ├── fonts.css
│   │   └── styles.css
│   ├── html/ /* Статические шаблоны страниц */
│   ├── img/
│   └── js/
│       ├── auth.js /* Аутентификация */
│       ├── chart-setup.js /* Отрисовка чарта */
│       ├── logout.js /* Выход */
│       └── modal.js /* Модальные окна */
├── routes/ /* Маршрутизация */
├── views/ /* Динамические шаблоны */
├── app.js  /* Инициализация и API */
├── config.js /* Данные */
└── user.js /* Данные */
````
