// @/components/coast-craft/hero.tsx
import Link from 'next/link';
import Styles from './coast-craft.module.css';
import Image from 'next/image';
import { IPostsProps } from '@/lib/type';
import { formatTimeStampToLocalDate } from '@/utils/utilities';

export const Hero: React.FC<IPostsProps> = ({ posts }) => {
  return (
    <section className={`${Styles.section} ${Styles.heroArea}`}>
      {/* <!--BLOG GRID--> */}
      {posts.map((post, index) => (
        <>
          <Link href={`./${post.post_url.slice(39)}`}>
            <div key={index} className={`${Styles.blog} ${Styles.overlay}`}>
              <Image
                alt={post.title.slice(0, -18)}
                src={post.post_image_url}
                height={1000}
                width={1000}
                className={Styles.blogImage}
              />
              <div className={Styles.date}>
                <p>{formatTimeStampToLocalDate(post.time)}</p>
                {post.title.slice(0, -18)}
              </div>
            </div>
          </Link>
        </>
      ))}
    </section>
  );
};
