import { useEffect, useMemo, useState } from "react";
import menuItems from "./menuData.js";
import styles from "./BurgerMenu.module.css";

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const media = window.matchMedia(query);
    const handler = (event) => setMatches(event.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, [query]);

  return matches;
};

const BurgerMenu = ({ isOpen, onClose }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [activeId, setActiveId] = useState(menuItems[0]?.id ?? null);
  const [contentId, setContentId] = useState(menuItems[0]?.id ?? null);
  const [submenuView, setSubmenuView] = useState(false);

  const activeContentItem = useMemo(
    () => menuItems.find((item) => item.id === contentId),
    [contentId]
  );

  const showRightPane = !isMobile || submenuView;
  const showLeftPane = !isMobile || !submenuView;

  useEffect(() => {
    if (!isOpen) {
      setSubmenuView(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleItemClick = (item) => {
    setActiveId(item.id);
    if (item.id !== "account") {
      setContentId(item.id);
    }
    if (!isMobile) return;
    if (item.id === "account") {
      setSubmenuView(false);
      return;
    }
    setSubmenuView(true);
  };

  const handleBack = () => {
    setSubmenuView(false);
  };

  return (
    <div
      id="burger-menu"
      className={`${styles.menuOverlay} ${isOpen ? styles.menuOpen : ""}`}
      aria-hidden={!isOpen}
    >
      <div
        className={styles.menuBackdrop}
        onClick={onClose}
        role="presentation"
      />

      <aside className={styles.menuPanel} role="dialog" aria-modal="true">
        <div className={styles.menuHeader}>
          <button
            className={styles.closeButton}
            type="button"
            aria-label="Закрыть меню"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className={styles.menuBody}>
          {showLeftPane && (
            <nav className={styles.leftPane} role="navigation">
              <ul className={styles.menuList}>
                {menuItems.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      className={`${styles.menuItem} ${
                        activeId === item.id ? styles.menuItemActive : ""
                      }`}
                      onClick={() => handleItemClick(item)}
                      aria-current={activeId === item.id ? "page" : undefined}
                    >
                      <span>{item.label}</span>
                      {item.hasSubmenu && (
                        <span className={styles.menuArrow} aria-hidden="true">
                          &gt;
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {showRightPane && (
            <section className={styles.rightPane}>
              {isMobile && submenuView && (
                <button
                  type="button"
                  className={styles.backButton}
                  onClick={handleBack}
                >
                  ← Назад
                </button>
              )}

              <h2 className={styles.sectionTitle}>
                {activeContentItem?.label ?? "Раздел"}
              </h2>

              {activeContentItem?.hasSubmenu ? (
                <div className={styles.submenuContent}>
                  {activeContentItem.submenu?.map((submenuItem) => (
                    <div className={styles.submenuCard} key={submenuItem.id || submenuItem.name}>
                      {"image" in submenuItem && (
                        <div className={styles.imagePlaceholder}>
                          IMAGE PLACEHOLDER
                        </div>
                      )}
                      <div className={styles.submenuText}>
                        <span className={styles.submenuName}>
                          {submenuItem.name}
                        </span>
                        {submenuItem.type && (
                          <span className={styles.submenuMeta}>
                            {submenuItem.type}
                          </span>
                        )}
                        {submenuItem.description && (
                          <div className={styles.submenuDescription}>
                            {submenuItem.description.split("•").filter(Boolean).map((item, index) => (
                              <span key={index} className={styles.descriptionItem}>
                                • {item.trim()}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={styles.comingSoon}>Скоро будет доступно.</p>
              )}
            </section>
          )}
        </div>
      </aside>
    </div>
  );
};

export default BurgerMenu;
