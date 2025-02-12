// @/components/coast-craft/TopBlogArea.tsx
import Link from 'next/link';
import Styles from './coast-craft.module.css';
import { IBlogArea } from '@/lib/type';
import Image from 'next/image';
import { formatTimeStampToLocalDate } from '@/utils/utilities';

export const TopBlogArea: React.FC<IBlogArea> = ({ blogArea }) => {
  // Limit the number of blog posts to 6
  const limitedBlogArea = blogArea.slice(0, 6);

  return (
    <section className={Styles.topBlogSection} id="news-area">
      <div className={Styles.topBlogContainer}>
        <div className={Styles.topBlogList}>
          {limitedBlogArea.map((post, index) => (
            <div key={index} className={Styles.topBlogItem}>
              <Link href={`./${post.post_url.slice(39)}`}>
                <div className={Styles.topBlogImage}>
                  <Image
                    src={post.post_image_url}
                    alt={post.title}
                    width={1000}
                    height={1000}
                  />
                </div>
                <div className={Styles.topBlogContent}>
                  <p className={Styles.topBlogTime}>
                    {formatTimeStampToLocalDate(post.time)}
                  </p>
                  <Link
                    href={`./${post.post_url.slice(39)}`}
                    className={Styles.topBlogLinkTitle}
                  >
                    {post.title}
                  </Link>
                  <p className={Styles.topBlogAuthor}>{post.author}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Learn More Button */}
        <div className={Styles.learnMoreContainer}>
          <Link href="#" className={Styles.learnMoreButton}>
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};
