// @/components/coast-craft/BlogPostLatestNews.tsx
import Link from 'next/link';
import Styles from './coast-craft.module.css';
import { IBlogArea } from '@/lib/type';
import Image from 'next/image';
import { formatTimeStampToLocalDate } from '@/utils/utilities';

export const BlogPostLatestNews: React.FC<IBlogArea> = ({ blogArea }) => {
  // Limit the number of blog posts to 6
  const limitedBlogArea = blogArea.slice(0, 6);

  return (
    <section className={Styles.latestNewsSection} id="news-area">
      <h2>Latest News</h2>
      <div className={Styles.latestNewsContainer}>
        <div className={Styles.latestNewsList}>
          {limitedBlogArea.map((post, index) => (
            <div
              key={index}
              className={`${Styles.latestNewsCard} ${
                index < 4 ? Styles.horizontalCard : Styles.verticalCard
              }`}
            >
              <Link href={`./${post.post_url.slice(51)}`}>
                <div className={Styles.latestNewsImage}>
                  <Image
                    src={post.post_image_url}
                    alt={post.title}
                    width={1000} // Adjusted width for horizontal cards
                    height={1000} // Adjusted height for horizontal cards
                    style={{ objectFit: 'cover' }} // Maintain aspect ratio
                  />
                </div>
                <div className={Styles.latestNewsContent}>
                  <p className={Styles.latestNewsTime}>
                    {formatTimeStampToLocalDate(post.time)}
                  </p>
                  <Link
                    href={`./${post.post_url.slice(51)}`}
                    className={Styles.latestNewsLinkTitle}
                  >
                    {post.title}
                  </Link>
                  <p className={Styles.latestNewsAuthor}>{post.author}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
