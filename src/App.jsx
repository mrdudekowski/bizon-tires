import { useEffect, useState } from "react";
import BurgerMenu from "./components/BurgerMenu/BurgerMenu.jsx";
import BurgerToggle from "./components/BurgerToggle/BurgerToggle.jsx";
import ProductCarousel from "./components/ProductCarousel/ProductCarousel.jsx";

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const target = document.getElementById(sectionId);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
  }, [menuOpen]);

  return (
    <>
      <div className={`page ${menuOpen ? "page--blurred" : ""}`}>
        <a className="skip-link" href="#main">
          Перейти к контенту
        </a>

        <header className="site-header">
          <div className="navbar">
            <div
              className="burger-button"
              aria-expanded={menuOpen}
              aria-controls="burger-menu"
            >
              <BurgerToggle isOpen={menuOpen} onToggle={setMenuOpen} />
            </div>

            <button
              type="button"
              className="brand"
              aria-label="Bizon Tires"
              onClick={scrollToTop}
            >
              <img
                src="/bizon_inverted_hd.svg"
                alt="Bizon Tires"
                className="brand-logo"
                draggable="false"
                onDragStart={(event) => event.preventDefault()}
              />
            </button>

            <div className="nav-actions">
              <nav className="desktop-nav" aria-label="Основная навигация">
                <a href="#products">Продукты</a>
                <a href="#features">Преимущества</a>
                <a href="#contact">Контакты</a>
              </nav>
              <button
                type="button"
                className="contact-button"
                onClick={() => scrollToSection("contact")}
              >
                Связаться
              </button>
            </div>
          </div>
        </header>

        <main id="main">
          <section id="hero" className="hero">
            <div className="hero-content">
              <p className="eyebrow">Большегрузная резина</p>
              <h1>Уверенное сцепление на любых дорогах</h1>
              <p className="hero-text">
                Bizon Tires — шины для магистралей, карьеров и бездорожья.
                Минималистичный и тестируемый скелет для дальнейшего развития.
              </p>
              <div className="hero-actions">
                <button
                  type="button"
                  className="cta-button"
                  onClick={() => scrollToSection("products")}
                >
                  Каталог
                </button>
                <button
                  type="button"
                  className="ghost-button"
                  onClick={() => scrollToSection("features")}
                >
                  Подробнее
                </button>
              </div>
            </div>
            <div className="hero-media" aria-hidden="true">
              <div className="image-placeholder">IMAGE PLACEHOLDER</div>
            </div>
          </section>

          <section id="products" className="section">
            <h2 className="section-title">Продукты</h2>
            <p className="section-description">
              Линейка шин для магистралей, карьеров и бездорожья. Пока используем
              заглушки для тестирования сетки.
            </p>
            <ProductCarousel />
          </section>

          <section id="features" className="section">
            <h2 className="section-title">Преимущества</h2>
            <p className="section-description">
              Три ключевых преимущества Bizon Tires, на которые будем опираться
              при дальнейшем развитии.
            </p>
            <div className="section-grid">
              <article className="info-card">
                <h3 className="info-card-title">Надежность</h3>
                <p className="info-card-text">Выдерживает тяжелые нагрузки.</p>
              </article>
              <article className="info-card">
                <h3 className="info-card-title">Экономичность</h3>
                <p className="info-card-text">Оптимальный ресурс пробега.</p>
              </article>
              <article className="info-card">
                <h3 className="info-card-title">Сервис</h3>
                <p className="info-card-text">Поддержка и консультации.</p>
              </article>
            </div>
          </section>

          <section id="contact" className="section">
            <h2 className="section-title">Контакты</h2>
            <p className="section-description">
              Свяжитесь с нами для расчета или консультации.
            </p>
            <div className="section-grid">
              <article className="info-card">
                <h3 className="info-card-title">Телефон</h3>
                <p className="info-card-text">+7 (000) 000-00-00</p>
              </article>
              <article className="info-card">
                <h3 className="info-card-title">Email</h3>
                <p className="info-card-text">info@bizontires.example</p>
              </article>
              <article className="info-card">
                <h3 className="info-card-title">География</h3>
                <p className="info-card-text">Работаем по всей стране.</p>
              </article>
            </div>
          </section>
        </main>

        <footer className="site-footer">
          <div className="footer-content">
            <span>Bizon Tires</span>
            <span>info@bizontires.example</span>
          </div>
        </footer>
      </div>

      <BurgerMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

export default App;
