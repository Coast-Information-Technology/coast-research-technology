"use client";

import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight, FaQuoteLeft, FaStar } from "react-icons/fa";
import styles from "./trainingcarousel.module.css";
import Image from "next/image";
import { trainingSlides } from "@/lib/data";

interface Slide {
  image: string;
  name: string;
  text: string;
  position: string;
}

interface CarouselProps {
  slides: Slide[];
}

const TrainingCarousel: React.FC<CarouselProps> = ({ slides }) => {
  const sliderRef = useRef<Slider>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const settings = {
    fade: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: false,
    dots: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          speed: 500,
        },
      },
    ],
  };

  const nextSlide = () => {
    sliderRef.current?.slickNext();
  };

  const prevSlide = () => {
    sliderRef.current?.slickPrev();
  };

  if (!isMounted) return null;

  return (
    <div className={styles.carouselContainer}>
      <Slider ref={sliderRef} {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className={styles.slide}>
            <div className={styles.slideContainer}>
              <div className={styles.imageSection}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={slide.image}
                    alt={slide.name}
                    className={styles.slideImage}
                    width={300}
                    height={300}
                  />
                  <div className={styles.quoteIcon}>
                    <FaQuoteLeft />
                  </div>
                </div>
                <div className={styles.studentInfo}>
                  <h3 className={styles.studentName}>{slide.name}</h3>
                  <p className={styles.studentPosition}>{slide.position}</p>
                  <div className={styles.rating}>
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={styles.star} />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className={styles.contentSection}>
                <div className={styles.testimonialContent}>
                  <p className={styles.testimonialText}>{slide.text}</p>
                </div>
                
                <div className={styles.testimonialFooter}>
                  <div className={styles.successIndicator}>
                    <span className={styles.successDot}></span>
                    <span className={styles.successText}>Success Story</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <button
        className={`${styles.navigationButton} ${styles.prevButton}`}
        onClick={prevSlide}
        aria-label="Previous testimonial"
      >
        <FaArrowLeft />
      </button>
      <button
        className={`${styles.navigationButton} ${styles.nextButton}`}
        onClick={nextSlide}
        aria-label="Next testimonial"
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default TrainingCarousel;
