// app/coast-craft/[slug]/BlogPostPage.tsx

'use client';

import { useState } from 'react';
import { IBlogMeta, IBlogPost, IBlogPostPageProps } from '@/lib/type';
import { renderContent } from '@/utils/blogContentRender';
import blogPosts from '@/public/api_data.json';
import { formatTimeStampToLocalDate } from '@/utils/utilities';
import Styles from './coast-craft-blog.module.css';
import Image from 'next/image';
import { TrendingNews } from '@/components/coast-craft/TrendingNews2';
import Newsletter from '@/components/coast-craft/Newsletter';
import { BlogPostLatestNews } from '@/components/coast-craft/BlogPostLatestNews';

const BlogPostPage: React.FC<IBlogPostPageProps> = ({ initialPost }) => {
  const [post, setPost] = useState<IBlogPost | null>(initialPost);

  if (!post) {
    return <div>Loading...</div>;
  }

  const blog: IBlogPost[] = blogPosts.posts;
  const blogMetaArray: IBlogMeta[] = blog.map((post) => post.blogmeta);

  return (
    <main>
      <TrendingNews trendingNews={blogMetaArray} />

      <div
        className={Styles.BlogPostHero}
        style={{
          backgroundImage: `url(${post.blogmeta.post_image_url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className={Styles.overlay}>
          <div className={Styles.tags}>{post.blogmeta.tags.join(', ')}</div>
          <h1 className={Styles.title}>{post.blogmeta.title}</h1>
          <div className={`flex gap-4 items-center`}>
            <p className={Styles.date}>
              {formatTimeStampToLocalDate(post.blogmeta.time)}
            </p>
            <p className={Styles.author}>{post.blogmeta.author}</p>
            <p className={Styles.readDuration}>
              {post.blogmeta.read_duration} mins read
            </p>
          </div>
        </div>
      </div>
      <div className={Styles.postContentWrapper}>
        <div className={Styles.postBody}>
          {renderContent(post.blockbody.blocks)}
          <div className={Styles.blogFooter}>
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/coast-craft.appspot.com/o/COAST_CRAFT__1_-removebg-preview.png?alt=media&token=01d3ca68-522a-49c3-b54d-7686d4d5bb6d"
              alt="Coast-Craft"
              width={1000}
              height={1000}
            />
            <p>
              Feel free to leave comments and questions below – we're here to
              help you on your coding voyage.
            </p>
          </div>
          <div className={`${Styles.commentSection} p-6 rounded-lg`}>
            <h2 className="text-3xl font-bold mb-2">Comment</h2>
            <hr className="border-t-2 border-purple-300 mb-6" />

            <h4 className="text-lg font-medium mb-6">Leave a reply</h4>

            <form className="space-y-4">
              <div className="md:flex md:space-x-4">
                <input
                  type="text"
                  placeholder="Name*"
                  required
                  className="w-full p-2 border border-gray-300 rounded mb-4 md:mb-0"
                />
                <input
                  type="email"
                  placeholder="Email*"
                  required
                  className="w-full p-3 border border-gray-300 rounded"
                />
              </div>

              <div>
                <input
                  type="url"
                  placeholder="Website"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <textarea
                  rows={4}
                  placeholder="Message"
                  className="w-full p-2 border border-gray-300 rounded"
                ></textarea>
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-purple-900 text-white font-semibold rounded hover:bg-purple-600"
              >
                Submit Comment
              </button>
            </form>
          </div>
        </div>
        <div className={Styles.sidebar}>
          <Newsletter />
          <BlogPostLatestNews blogArea={blogMetaArray} />
        </div>
      </div>
    </main>
  );
};

export default BlogPostPage;
