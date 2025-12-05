# БИЗОН ТИРС - Лендинг

Профессиональный лендинг для продажи большегрузной резины.

## Структура проекта

```
bizon_tires/
├── index.html                 # Главная страница
├── README.md                  # Документация проекта
├── package.json               # Зависимости проекта (если используется)
│
├── assets/                    # Все статические ресурсы
│   ├── images/               # Изображения
│   │   ├── hero/             # Изображения для hero-секции
│   │   ├── products/         # Фото продукции
│   │   ├── advantages/       # Иллюстрации преимуществ
│   │   ├── testimonials/     # Фото клиентов/отзывы
│   │   ├── logos/            # Логотипы (партнеры, бренды)
│   │   └── icons/            # Иконки
│   ├── fonts/                # Шрифты
│   ├── videos/               # Видео материалы
│   └── documents/            # PDF каталоги, сертификаты
│
├── css/                       # Стили
│   ├── main.css              # Основные стили
│   ├── variables.css         # CSS переменные
│   ├── components/           # Стили компонентов
│   │   ├── header.css
│   │   ├── hero.css
│   │   ├── about.css
│   │   ├── advantages.css
│   │   ├── trust.css
│   │   ├── order.css
│   │   └── footer.css
│   ├── utilities/           # Утилиты
│   │   ├── reset.css
│   │   └── animations.css
│   └── responsive/           # Адаптивные стили
│       ├── mobile.css
│       └── tablet.css
│
├── js/                        # JavaScript
│   ├── main.js              # Главный файл
│   ├── config.js            # Конфигурация
│   ├── modules/             # Модули
│   │   ├── form.js          # Обработка форм
│   │   ├── navigation.js    # Навигация
│   │   ├── animations.js    # Анимации
│   │   └── validation.js    # Валидация
│   └── utils/               # Утилиты
│       ├── helpers.js
│       └── api.js           # API запросы
│
├── sections/                  # HTML секции (для модульности)
│   ├── header.html
│   ├── hero.html
│   ├── about.html
│   ├── advantages.html
│   ├── trust.html
│   ├── order.html
│   └── footer.html
│
├── data/                      # Данные (JSON, конфиги)
│   ├── products.json         # Данные о продукции
│   ├── advantages.json       # Преимущества
│   └── config.json           # Общая конфигурация
│
├── docs/                      # Документация
│   ├── architecture.md       # Описание архитектуры
│   ├── deployment.md         # Инструкции по деплою
│   └── questions_for_manufacturer.md
│
└── .gitignore                 # Git ignore файл
```

## Принципы организации

### Single Source of Truth
- Все данные о продукции хранятся в `data/products.json`
- Конфигурация в `data/config.json`
- CSS переменные в `css/variables.css`

### Explicit Dependencies
- Все зависимости явно указаны в `package.json` (если используется)
- Импорты четко видны в коде

### Self-Documenting Code
- Понятные имена файлов и папок
- Комментарии только для объяснения "почему"
- Структура отражает логику приложения

## Разработка

### Локальная разработка
Откройте `index.html` в браузере или используйте локальный сервер.

### Сборка (опционально)
Если в будущем понадобится сборщик (Webpack, Vite и т.д.), структура готова к расширению.

## Деплой

Статические файлы можно деплоить на любой хостинг:
- GitHub Pages
- Netlify
- Vercel
- Обычный веб-сервер

