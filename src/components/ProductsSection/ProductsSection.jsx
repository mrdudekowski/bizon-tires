import ProductCarousel from "../ProductCarousel/ProductCarousel.jsx";
import { SECTIONS } from "@/constants/sections";

/**
 * Компонент секции продуктов
 * Отображает карусель с типами шин
 */
export const ProductsSection = () => {
  return (
    <section id={SECTIONS.PRODUCTS} className="section">
      <h2 className="section-title">Продукты</h2>
      <p className="section-description">
        Линейка шин для магистралей, карьеров и бездорожья. Пока используем
        заглушки для тестирования сетки.
      </p>
      <ProductCarousel />
    </section>
  );
};
