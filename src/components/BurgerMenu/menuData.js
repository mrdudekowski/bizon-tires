import tireTypesData from "../../../data/tireTypes.json";

// Преобразуем данные шин в формат для меню
const tireTypesSubmenu = tireTypesData.map((tire) => ({
  id: tire.id,
  name: tire.name,
  description: tire.description_short,
  link: `#${tire.id}`,
  image: "placeholder.jpg",
}));

const menuItems = [
  {
    id: "models",
    label: "Модели",
    hasSubmenu: true,
    submenu: tireTypesSubmenu,
  },
  {
    id: "about",
    label: "О нас",
    hasSubmenu: true,
    submenu: [
      { name: "Конфигуратор", link: "#" },
      { name: "Финансирование и страхование", link: "#" },
      { name: "E-Performance – Электромобильность", link: "#" },
    ],
  },
  {
    id: "shop",
    label: "Магазин",
    hasSubmenu: false,
  },
  {
    id: "services",
    label: "Услуги",
    hasSubmenu: true,
    submenu: [
      { name: "Porsche 24", link: "#" },
      { name: "Porsche Motorsport", link: "#" },
      { name: "Porsche Communities", link: "#" },
    ],
  },
  {
    id: "account",
    label: "Аккаунт",
    hasSubmenu: false,
    icon: "user",
  },
];

export default menuItems;
