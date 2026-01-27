# Рефакторинг стилей карточек - Single Source of Truth

**Дата:** 2026-01-28  
**Цель:** Унификация стилей карточек из единого источника

---

## 🔍 Проблема

До рефакторинга стили карточек дублировались в двух местах:

1. **`.info-card`** - для карточек в секциях (Features, Contact)
2. **`.product-card`** - для карточек в карусели продуктов

**Дублирование:**
- `background: var(--color-surface)` - дублировалось
- `border: 1px solid var(--color-border)` - дублировалось
- `padding: 20px` - дублировалось
- `border-radius: var(--radius)` - дублировалось

**Нарушение принципа:** Single Source of Truth

---

## ✅ Решение

Создан единый базовый класс `.card-base` с общими стилями для всех карточек:

```css
/* Base card styles - Single Source of Truth */
.card-base {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  padding: 20px;
  border-radius: var(--radius);
}
```

### Структура классов:

1. **`.card-base`** - базовые стили (фон, граница, отступы, радиус)
2. **`.info-card`** - специфичные стили для информационных карточек (grid layout, gap)
3. **`.product-card`** - специфичные стили для карточек продуктов (flex layout, scroll-snap, user-select)

---

## 📝 Изменения в CSS

### До:
```css
.info-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  padding: 20px;
  display: grid;
  gap: 8px;
  border-radius: var(--radius);
}

.product-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  min-height: 180px;
  user-select: none;
  border-radius: var(--radius);
}
```

### После:
```css
/* Base card styles - Single Source of Truth */
.card-base {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  padding: 20px;
  border-radius: var(--radius);
}

.info-card {
  display: grid;
  gap: 8px;
}

.product-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  min-height: 180px;
  user-select: none;
}
```

---

## 📝 Изменения в JSX

### App.jsx - Информационные карточки:
```jsx
// До
<article className="info-card">

// После
<article className="card-base info-card">
```

### ProductCarousel.jsx - Карточки продуктов:
```jsx
// До
<article key={tire.id} className="product-card">

// После
<article key={tire.id} className="card-base product-card">
```

---

## ✅ Преимущества

1. **Single Source of Truth** - базовые стили карточек определены в одном месте
2. **Легкость поддержки** - изменения базовых стилей применяются ко всем карточкам автоматически
3. **Консистентность** - все карточки используют одинаковые базовые стили
4. **Масштабируемость** - легко добавить новые типы карточек, расширяя `.card-base`

---

## 🎯 Использование

### Для информационных карточек:
```jsx
<article className="card-base info-card">
  <h3 className="info-card-title">Заголовок</h3>
  <p className="info-card-text">Текст</p>
</article>
```

### Для карточек продуктов:
```jsx
<article className="card-base product-card">
  <h3 className="product-card-title">Название</h3>
  <ul className="product-card-list">
    <li className="product-card-item">Элемент</li>
  </ul>
</article>
```

---

## 📊 Унифицированные стили заголовков

Теперь `.info-card-title` и `.product-card-title` имеют одинаковые базовые стили:

```css
.info-card-title,
.product-card-title {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: var(--color-foreground);
  line-height: 1.3;
}
```

---

## ✅ Результат

- ✅ Базовые стили карточек определены в одном месте (`.card-base`)
- ✅ Все карточки используют единый источник истины
- ✅ Легко поддерживать и расширять
- ✅ Соответствует принципу Single Source of Truth

---

**Статус:** ✅ Рефакторинг завершен
