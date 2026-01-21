const menuItems = [
  {
    id: "models",
    label: "Модели",
    hasSubmenu: true,
    submenu: [
      { name: "718", type: "Бензин", image: "placeholder.jpg" },
      { name: "911", type: "Бензин", image: "placeholder.jpg" },
      { name: "Taycan", type: "Электрический", image: "placeholder.jpg" },
    ],
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
