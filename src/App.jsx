import { useEffect, useState } from "react";
import BurgerMenu from "./components/BurgerMenu/BurgerMenu.jsx";

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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
            <button
              className="burger-button"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="burger-menu"
              aria-label="Открыть меню"
              onClick={() => setMenuOpen(true)}
            >
              <span className="burger-line"></span>
              <span className="burger-line"></span>
              <span className="burger-line"></span>
            </button>

            <a className="brand" href="#top" aria-label="Bizon Tires">
              <span className="brand-mark">Bizon Tires</span>
            </a>

            <div className="nav-actions">
              <nav className="desktop-nav" aria-label="Основная навигация">
                <a href="#products">Продукты</a>
                <a href="#features">Преимущества</a>
                <a href="#contact">Контакты</a>
              </nav>
              <a className="cta-button" href="#contact">
                Связаться
              </a>
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
                <a className="cta-button" href="#products">
                  Каталог
                </a>
                <a className="ghost-button" href="#features">
                  Подробнее
                </a>
              </div>
            </div>
            <div className="hero-media" aria-hidden="true">
              <div className="image-placeholder">IMAGE PLACEHOLDER</div>
            </div>
          </section>
        </main>

        <footer className="site-footer" id="contact">
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
