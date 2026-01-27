import { SECTIONS } from "@/constants/sections";

/**
 * Компонент секции преимуществ
 * Отображает карточки с ключевыми преимуществами
 */
export const FeaturesSection = () => {
  const features = [
    {
      title: "Надежность",
      description: "Выдерживает тяжелые нагрузки.",
    },
    {
      title: "Экономичность",
      description: "Оптимальный ресурс пробега.",
    },
    {
      title: "Сервис",
      description: "Поддержка и консультации.",
    },
  ];

  return (
    <section id={SECTIONS.FEATURES} className="section">
      <h2 className="section-title">Преимущества</h2>
      <p className="section-description">
        Три ключевых преимущества Bizon Tires, на которые будем опираться
        при дальнейшем развитии.
      </p>
      <div className="section-grid">
        {features.map((feature) => (
          <article key={feature.title} className="card-base info-card">
            <h3 className="info-card-title">{feature.title}</h3>
            <p className="info-card-text">{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
};
