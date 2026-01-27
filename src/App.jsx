import BurgerMenu from "./components/BurgerMenu/BurgerMenu.jsx";
import { Header } from "./components/Header/Header.jsx";
import { Hero } from "./components/Hero/Hero.jsx";
import { ProductsSection } from "./components/ProductsSection/ProductsSection.jsx";
import { FeaturesSection } from "./components/FeaturesSection/FeaturesSection.jsx";
import { ContactSection } from "./components/ContactSection/ContactSection.jsx";
import { Footer } from "./components/Footer/Footer.jsx";
import { useMenuToggle } from "@/hooks/useMenuToggle";
import { useScrollToSection } from "@/hooks/useScrollToSection";

const App = () => {
  const { menuOpen, closeMenu, toggleMenu } = useMenuToggle();
  const scrollToSection = useScrollToSection();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className={`page ${menuOpen ? "page--blurred" : ""}`}>
        <a className="skip-link" href="#main">
          Перейти к контенту
        </a>

        <Header
          menuOpen={menuOpen}
          onMenuToggle={toggleMenu}
          onScrollToSection={scrollToSection}
          onScrollToTop={scrollToTop}
        />

        <main id="main">
          <Hero onScrollToSection={scrollToSection} />
          <ProductsSection />
          <FeaturesSection />
          <ContactSection />
        </main>

        <Footer />
      </div>

      <BurgerMenu isOpen={menuOpen} onClose={closeMenu} />
    </>
  );
};

export default App;
