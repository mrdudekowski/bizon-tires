import React, { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import TireTypeCard from "./TireTypeCard.jsx";
import tireTypesData from "../../../data/tireTypes.json";

// Lightweight runtime validator
const validateTireType = (item) => {
  if (!item || typeof item !== "object") return false;
  if (typeof item.id !== "string" || !item.id.trim()) return false;
  if (typeof item.name !== "string" || !item.name.trim()) return false;
  if (typeof item.description_short !== "string" || !item.description_short.trim()) return false;
  return true;
};

const ProductCarousel = () => {
  // Validate and filter data
  const tireTypes = React.useMemo(() => {
    const validated = tireTypesData.filter((item) => {
      const isValid = validateTireType(item);
      if (!isValid) {
        console.warn("Invalid tire type data:", item);
      }
      return isValid;
    });
    return validated;
  }, []);

  // Embla carousel setup with proper configuration
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    containScroll: "trimSnaps"
  });

  const [prevBtnDisabled, setPrevBtnDisabled] = React.useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = React.useState(true);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  // Don't render if no valid data
  if (tireTypes.length === 0) {
    console.warn("No valid tire types to display");
    return null;
  }

  return (
    <div className="carousel-container">
      <div className="carousel-viewport" ref={emblaRef}>
        <div className="carousel-track">
          {tireTypes.map((tireType) => (
            <div key={tireType.id} className="carousel-slide">
              <TireTypeCard tireType={tireType} />
            </div>
          ))}
        </div>
      </div>

      <button
        className="carousel-arrow carousel-arrow-prev"
        onClick={scrollPrev}
        disabled={prevBtnDisabled}
        aria-label="Previous slide"
      >
        <FaArrowLeft />
      </button>

      <button
        className="carousel-arrow carousel-arrow-next"
        onClick={scrollNext}
        disabled={nextBtnDisabled}
        aria-label="Next slide"
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default ProductCarousel;
