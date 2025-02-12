// @/components/coast-craft/BlogArea.tsx
import Link from 'next/link';
import Styles from './coast-craft.module.css';
import { IBlogArea } from '@/lib/type';
import Image from 'next/image';
import { formatTimeStampToLocalDate } from '@/utils/utilities';

export const BlogArea: React.FC<IBlogArea> = ({ blogArea }) => {
  return (
    <section className={Styles.section} id="news-area">
      <div className={Styles.newsContainer}>
        <div className={Styles.onGoing}>
          {blogArea.map((post, index) => (
            <div key={index} className={Styles.news}>
              <Link href={`./${post.post_url.slice(39)}`}>
                <div className={Styles.newsImg}>
                  <Image
                    src={post.post_image_url}
                    alt={post.title}
                    width={1000}
                    height={1000}
                  />
                </div>
                <div className={Styles.blog2Content}>
                  <p className={Styles.postTime}>
                    {formatTimeStampToLocalDate(post.time)}
                  </p>
                  <Link
                    href={`./${post.post_url.slice(39)} py-16`}
                    className={Styles.linkTitle}
                  >
                    {post.title}
                  </Link>
                  <p className={Styles.author}>{post.author}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
