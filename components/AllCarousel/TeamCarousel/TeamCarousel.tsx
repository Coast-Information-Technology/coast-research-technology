"use client";

import React, { useRef } from "react";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import styles from "./TeamCarousel.module.css";
import Image from "next/image";

interface Slide {
  image: string;
  position: string;
  name: string;
}

interface ITeamProps {
  slides: Slide[];
}

const TeamCarousel: React.FC<ITeamProps> = ({ slides }) => {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
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
        {slides.map((slide, index) => (
          <div key={index} className={styles.slide}>
            <div className={styles.slideContainer}>
              <Image
                src={slide.image}
                alt={`Slide ${index}`}
                className={styles.slideImage}
                width={1000}
                height={1000}
              />
              <div className={styles.slideContent}>
                <h3 className={styles.slidePos}>{slide.position}</h3>
                <div className={styles.slideName}>NAME: {slide.name}</div>
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

export default TeamCarousel;
