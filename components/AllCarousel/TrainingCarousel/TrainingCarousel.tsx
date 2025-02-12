"use client";

import React, { useRef } from "react";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import styles from "./trainingcarousel.module.css";
import Image from "next/image";
import { trainingSlides } from "@/lib/data";

interface Slide {
  image: string;
  heading?: string;
  text: string;
}

interface CarouselProps {
  slides: Slide[];
}

const TrainingCarousel: React.FC<CarouselProps> = ({ slides }) => {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const nextSlide = () => {
    sliderRef.current?.slickNext();
  };

  const prevSlide = () => {
    sliderRef.current?.slickPrev();
  };

  return (
    <div className={styles.carouselContainer}>
      <Slider ref={sliderRef} {...settings}>
        {trainingSlides.map((slide, index) => (
          <div key={index} className={styles.slide}>
            <div className={styles.slideContainer}>
              <div>
                {/* <div className={styles.clipPath}></div> */}
                <Image
                  src={slide.image}
                  alt={`Slide ${index}`}
                  className={styles.slideImage}
                  width={1000}
                  height={1000}
                />
                <p className={styles.position}>{slide.position}</p>
              </div>
              <div className={styles.slideContent}>
                <h2 className={styles.slideHead}>{slide.heading}</h2>
                <div className={styles.slideText}>{slide.text}</div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <button
        className={`${styles.arrowButton} ${styles.arrowLeft}`}
        onClick={prevSlide}
      >
        <FaArrowLeft />
      </button>
      <button
        className={`${styles.arrowButton} ${styles.arrowRight}`}
        onClick={nextSlide}
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default TrainingCarousel;
