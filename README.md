# RSS агрегатор

[![Actions Status](https://github.com/daria-z/frontend-project-11/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/daria-z/frontend-project-11/actions)
[![Maintainability](https://qlty.sh/badges/c844bad3-843c-45f0-818d-ce89db985001/maintainability.svg)](https://qlty.sh/gh/daria-z/projects/frontend-project-11)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=daria-z_frontend-project-11&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=daria-z_frontend-project-11)

---
## ℹ️ О приложении

Учебное приложение, созданное в рамках курса по фронтенд-разработке.

---

🔗 [Открыть в браузере (Vercel)](https://frontend-project-11-vvax.vercel.app/)

---

## 🎯 Цель проекта

- Практика управления состоянием
- Работа с представлением (view)

---

## ⚙️ Основной функционал

- Добавление RSS-лент с валидацией ввода
- Поддержка нескольких лент
- Автоматическое обновление и отслеживание новых постов
- Отображение списка фидов и их публикаций
- Просмотр содержимого постов в модальном окне

---

## 🛠️ Стек

- JavaScript (ES6+, модульная структура, без фреймворков)
- [Vite](https://vitejs.dev/) — сборщик
- [ESLint](https://eslint.org/) — линтер
- [i18next](https://www.i18next.com/) — тексты и локализация
- [Playwright](https://playwright.dev/) — e2e тестирование
- [Yup](https://github.com/jquense/yup) — валидация форм
- [Axios](https://axios-http.com/) — HTTP-клиент
- [on-change](https://github.com/sindresorhus/on-change) — наблюдение за изменениями состояния
- [Bootstrap](https://getbootstrap.com/) — UI-компоненты


---

## 🧪 Makefile команды

**Установка и разработка**
- `make install` — установка зависимостей
- `make develop` — запуск dev-сервера

**Качество и проверка**
- `make lint` — линтинг кода
- `make qlty-check` — проверка качества
- `make qlty-metrics` — метрики кода

**Сборка и тесты**
- `make build` — продакшн-сборка
- `make test` — запуск e2e тестов
- `make test-report` — отчёт по тестам

---

## 📁 Основная структура приложения

> Только ключевые части приложения, без вспомогательных файлов и конфигураций


```text
├── 📁 src/                  # Исходный код приложения
│   ├── 📁 js/
│   │   ├── 📁 model/        # Логика приложения
│   │   ├── 📁 view/         # Рендеринг интерфейса (фиды, посты, форма, UI)
│   │   ├── 📝 main.js       # Обработчики событий
│   │   └── 📝 state.js      # Работа с состоянием приложения
│   └── 📝 i18n.js           # Локализация
├── 📁 test-data/            # End-to-End тесты (Playwright)
├── 📝 index.html            # Точка входа приложения и основная разметка
```

