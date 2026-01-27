import React, { useRef, useState, useEffect } from 'react';
import tireTypesData from '../../../data/tireTypes.json';

const ProductCarousel = () => {
  const trackRef = useRef(null);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollLeftRef = useRef(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const updateArrowState = () => {
    const track = trackRef.current;
    if (!track) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = track;
    setCanScrollPrev(scrollLeft > 0);
    setCanScrollNext(scrollLeft < scrollWidth - clientWidth - 1);
  };

  const scrollPrev = () => {
    trackRef.current?.scrollBy({ left: -trackRef.current.clientWidth, behavior: 'smooth' });
  };

  const scrollNext = () => {
    trackRef.current?.scrollBy({ left: trackRef.current.clientWidth, behavior: 'smooth' });
  };

  const handleMouseDown = (event) => {
    const track = trackRef.current;
    if (!track) return;
    isDraggingRef.current = true;
    dragStartXRef.current = event.clientX;
    dragStartScrollLeftRef.current = track.scrollLeft;
  };

  const handleMouseMove = (event) => {
    if (!isDraggingRef.current) return;
    const track = trackRef.current;
    if (!track) return;
    const deltaX = event.clientX - dragStartXRef.current;
    track.scrollLeft = dragStartScrollLeftRef.current - deltaX;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateArrowState();
    track.addEventListener('scroll', updateArrowState);
    window.addEventListener('resize', updateArrowState);

    return () => {
      track.removeEventListener('scroll', updateArrowState);
      window.removeEventListener('resize', updateArrowState);
    };
  }, []);

  // Split description_short by bullet points
  const renderCard = (tire) => {
    const bulletPoints = tire.description_short
      .split('•')
      .map((item) => item.trim())
      .filter(Boolean);

    return (
      <article key={tire.id} className="product-card">
        <h3 className="product-card-title">{tire.name}</h3>
        <ul className="product-card-list">
          {bulletPoints.map((item, index) => (
            <li key={index} className="product-card-item">
              • {item}
            </li>
          ))}
        </ul>
      </article>
    );
  };

  return (
    <div className="product-carousel">
      <div
        className="product-carousel-track"
        ref={trackRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUpOrLeave}
        onMouseUp={handleMouseUpOrLeave}
      >
        {tireTypesData.map(renderCard)}
      </div>

      <button
        className="carousel-nav carousel-nav-prev"
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        aria-label="Предыдущий слайд"
      >
        ←
      </button>

      <button
        className="carousel-nav carousel-nav-next"
        onClick={scrollNext}
        disabled={!canScrollNext}
        aria-label="Следующий слайд"
      >
        →
      </button>
    </div>
  );
};

export default ProductCarousel;
