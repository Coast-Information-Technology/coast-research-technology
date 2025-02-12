// @/components/coast-craft/TrendingNews.tsx
'use client';

import Link from 'next/link';
import Styles from './coast-craft.module.css';
import { ITrendingNewsProps } from '@/lib/type';
import { useEffect, useState } from 'react';

export const TrendingNews: React.FC<ITrendingNewsProps> = ({
  trendingNews,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const items = document.querySelectorAll(`.${Styles.carouselItem}`);
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={`${Styles.section} ${Styles.trendingNews}`}>
      <Link href="/coast-craft">
        <h2>Trending</h2>
      </Link>

      <ul role="list" className={Styles.list}>
        {trendingNews.map((trend, index) => (
          <li
            key={index}
            role="listItem"
            className={`${Styles.carouselItem} ${
              activeIndex === index ? Styles.active : ''
            }`}
          >
            <Link href={`./${trend.post_url.slice(51)}`}>{trend.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
