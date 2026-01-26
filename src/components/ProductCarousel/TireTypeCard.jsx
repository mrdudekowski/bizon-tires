import React from "react";

const TireTypeCard = React.memo(({ tireType }) => {
  const bulletPoints = tireType.description_short
    .split("•")
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <article className="tire-card">
      <h3 className="tire-card-title">{tireType.name}</h3>
      <ul className="tire-card-list">
        {bulletPoints.map((item, index) => (
          <li key={index} className="tire-card-item">
            • {item}
          </li>
        ))}
      </ul>
    </article>
  );
});

TireTypeCard.displayName = "TireTypeCard";

export default TireTypeCard;
