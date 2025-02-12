'use client';

import React, { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import styles from './TestimonialCarousel.module.css';
import Image from 'next/image';
import Link from 'next/link';

interface Slide {
  image: string;
  name: string;
  ceoName?: string;
  text: string;
  url: string;
}

interface CarouselProps {
  slides: Slide[];
}

const TestimonialCarousel: React.FC<CarouselProps> = ({ slides }) => {
  const sliderRef = useRef<Slider>(null);
  const [isMounted, setIsMounted] = useState(false); // Track if the component is mounted
  const [isServicesPage, setIsServicesPage] = useState(false); // Track if we're on the /services page

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && typeof window !== 'undefined') {
      // Check the current path using window.location.pathname
      const currentPath = window.location.pathname;
      if (currentPath === '/services') {
        setIsServicesPage(true);
      }
    }
  }, [isMounted]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          // slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          // slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 630,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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

  // Function to truncate text to 30 words
  const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(' ');
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(' ') + '... Read More'
      : text;
  };

  // Don't render the carousel until it's mounted
  if (!isMounted) return null;

  return (
    <div className={styles.carouselContainer}>
      {/* <h2 className={`${styles.aboutHeading}`}>
        <Image
          className={`${styles.graphic}`}
          src="/heading_polygon.png"
          alt=""
          width={50}
          height={50}
        />{" "}
        Testimonial
      </h2> */}
      <Slider ref={sliderRef} {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className={styles.slide}>
            <Link href={slide.url}>
              <div
                className={
                  isServicesPage
                    ? styles.slideContainerServices
                    : styles.slideContainer
                }
              >
                <Image
                  src={slide.image}
                  alt={`Slide ${index}`}
                  className={
                    isServicesPage
                      ? styles.slideImageServices // Apply different style on /services page
                      : styles.slideImage
                  }
                  width={1000}
                  height={1000}
                />
                <div className={styles.slideContent}>
                  <h3 className={styles.slideName}>{slide.name}</h3>
                  <div className={styles.slideText}>
                    {truncateText(slide.text, 30)}
                    <div className={styles.ceoName}>{slide.ceoName}</div>
                  </div>
                </div>
              </div>
            </Link>
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

export default TestimonialCarousel;
