import BurgerToggle from "../BurgerToggle/BurgerToggle.jsx";
import { SECTIONS } from "@/constants/sections";

/**
 * Компонент хедера сайта
 * Содержит навигацию, логотип и кнопку контакта
 */
export const Header = ({ menuOpen, onMenuToggle, onScrollToSection, onScrollToTop }) => {
  return (
    <header className="site-header">
      <div className="navbar">
        <div
          className="burger-button"
          aria-expanded={menuOpen}
          aria-controls="burger-menu"
        >
          <BurgerToggle isOpen={menuOpen} onToggle={onMenuToggle} />
        </div>

        <button
          type="button"
          className="brand"
          aria-label="Bizon Tires"
          onClick={onScrollToTop}
        >
          <img
            src="bizon_inverted_hd.svg"
            alt="Bizon Tires"
            className="brand-logo"
            draggable="false"
            onDragStart={(event) => event.preventDefault()}
          />
        </button>

        <div className="nav-actions">
          <nav className="desktop-nav" aria-label="Основная навигация">
            <a href={`#${SECTIONS.PRODUCTS}`}>Продукты</a>
            <a href={`#${SECTIONS.FEATURES}`}>Преимущества</a>
            <a href={`#${SECTIONS.CONTACT}`}>Контакты</a>
          </nav>
          <button
            type="button"
            className="contact-button"
            onClick={() => onScrollToSection(SECTIONS.CONTACT)}
          >
            Связаться
          </button>
        </div>
      </div>
    </header>
  );
};
