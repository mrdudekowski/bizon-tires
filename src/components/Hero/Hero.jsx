import { SECTIONS } from "@/constants/sections";

/**
 * Компонент hero секции
 * Главный экран с призывом к действию
 */
export const Hero = ({ onScrollToSection }) => {
  return (
    <section id={SECTIONS.HERO} className="hero">
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
            onClick={() => onScrollToSection(SECTIONS.PRODUCTS)}
          >
            Каталог
          </button>
          <button
            type="button"
            className="ghost-button"
            onClick={() => onScrollToSection(SECTIONS.FEATURES)}
          >
            Подробнее
          </button>
        </div>
      </div>
      <div className="hero-media" aria-hidden="true">
        <div className="image-placeholder">IMAGE PLACEHOLDER</div>
      </div>
    </section>
  );
};
