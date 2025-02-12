'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import { FaArrowLeft, FaArrowRight, FaPlay } from 'react-icons/fa'; // Import FaPlay for the video icon
import Styles from './coast-craft.module.css';
import { IBlogArea } from '@/lib/type';
import Image from 'next/image';
import { formatTimeStampToLocalDate } from '@/utils/utilities';

export const VideoArea: React.FC<IBlogArea> = ({ blogArea }) => {
  const sliderRef = useRef<Slider | null>(null);

  // Check if blogArea has at least one item to use its image
  const backgroundImage = blogArea.length > 0 ? blogArea[0].post_image_url : '';
  const firstPost = blogArea[0]; // Get the first post for header

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const nextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const prevSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  return (
    <section
      className={Styles.videoSection}
      id="video-area"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className={Styles.videoHeader}>
        {firstPost && (
          <Link
            href={`./${firstPost.post_url.slice(39)}`}
            className={Styles.videoHeaderLink}
          >
            <FaPlay className={Styles.videoIconHead} />
            <p className={Styles.videoTimestamp}>
              {formatTimeStampToLocalDate(firstPost.time)}
            </p>
            <h2 className={Styles.videoTitle}>{firstPost.title}</h2>
          </Link>
        )}
      </div>

      <div className={Styles.videoContainer}>
        <Slider ref={sliderRef} {...sliderSettings}>
          {blogArea.map((post, index) => (
            <div key={index} className={Styles.videoSlide}>
              <Link href={`./${post.post_url.slice(39)}`}>
                <div className={Styles.videoThumbnail}>
                  <Image
                    src={post.post_image_url}
                    alt={post.title}
                    width={1000}
                    height={1000}
                  />
                  <FaPlay className={Styles.videoIcon} /> {/* Add video icon */}
                </div>
                <div className={Styles.videoDetails}>
                  <p className={Styles.videoTimestamp}>
                    {formatTimeStampToLocalDate(post.time)}
                  </p>
                  <Link
                    href={`./${post.post_url.slice(39)}`}
                    className={Styles.videoTitleLink}
                  >
                    {post.title}
                  </Link>
                  <p className={Styles.videoAuthor}>{post.author}</p>
                </div>
              </Link>
            </div>
          ))}
        </Slider>

        <button
          className={`${Styles.arrowButton} ${Styles.arrowLeft}`}
          onClick={prevSlide}
        >
          <FaArrowLeft />
        </button>
        <button
          className={`${Styles.arrowButton} ${Styles.arrowRight}`}
          onClick={nextSlide}
        >
          <FaArrowRight />
        </button>
      </div>
    </section>
  );
};
