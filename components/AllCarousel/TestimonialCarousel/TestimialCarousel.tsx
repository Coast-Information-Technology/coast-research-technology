'use client';

import React, { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';
import { FaArrowLeft, FaArrowRight, FaQuoteLeft, FaStar } from 'react-icons/fa';
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
  const [isMounted, setIsMounted] = useState(false);
  const [isServicesPage, setIsServicesPage] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      if (currentPath === '/services') {
        setIsServicesPage(true);
      }
    }
  }, [isMounted]);

  const settings = {
    infinite: true,
    speed: 600,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
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

  const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(' ');
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(' ') + '...'
      : text;
  };

  if (!isMounted) return null;

  return (
    <section className={styles.testimonialSection}>
      <div className={styles.container}>
        <div className={styles.headerSection}>
          <div className={styles.headerContent}>
            <div className={styles.graphicWrapper}>
              <Image
                src="/heading_polygon.png"
                alt=""
                width={50}
                height={50}
                className={styles.graphic}
              />
            </div>
            <h2 className={`${styles.sectionTitle} ${styles.testimonialTitle}`}>
              What Our Students Say
            </h2>
          </div>
          <p className={styles.sectionSubtitle}>
            Discover why businesses and students trust Coast Research Technology for their digital transformation journey
          </p>
        </div>

        <div className={styles.carouselContainer}>
          <Slider ref={sliderRef} {...settings}>
            {slides.map((slide, index) => (
              <div key={index} className={styles.slide}>
                <Link href={slide.url} className={styles.slideLink}>
                  <div className={styles.testimonialCard}>
                    <div className={styles.cardHeader}>
                      <div className={styles.avatarContainer}>
                        <Image
                          src={slide.image}
                          alt={slide.name}
                          className={styles.avatar}
                          width={80}
                          height={80}
                        />
                        <div className={styles.quoteIcon}>
                          <FaQuoteLeft />
                        </div>
                      </div>
                      <div className={styles.rating}>
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={styles.star} />
                        ))}
                      </div>
                    </div>
                    
                    <div className={styles.cardContent}>
                      <p className={styles.testimonialText}>
                        {truncateText(slide.text, 35)}
                      </p>
                      
                      <div className={styles.authorInfo}>
                        <h4 className={styles.authorName}>{slide.name}</h4>
                        {slide.ceoName && (
                          <p className={styles.authorTitle}>{slide.ceoName}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
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
      </div>
    </section>
  );
};

export default TestimonialCarousel;
