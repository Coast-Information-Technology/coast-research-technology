// app/coast-craft/pages.tsx

import React from 'react';
import Styles from './coast-craft.module.css';
import { TrendingNews } from '@/components/coast-craft/TrendingNews';
import blogPosts from '@/public/api_data.json';
import { IBlogMeta, IBlogPost } from '@/lib/type';
import { Hero } from '@/components/coast-craft/Hero';
import { BlogArea } from '@/components/coast-craft/BlogArea';
import { BlogFilter } from '@/components/coast-craft/BlogFilter';
import { VideoArea } from '@/components/coast-craft/VideoArea';
import { TopBlogArea } from '@/components/coast-craft/TopBlogArea';

const CoastCraftPage: React.FC = () => {
  const blog: IBlogPost[] = blogPosts.posts;

  // Ensure that the extracted blogMetaArray matches IBlogMeta[]
  const blogMetaArray: IBlogMeta[] = blog.map((post) => post.blogmeta);

  return (
    <main className="first-section">
      <section className="visually-hidden">
        <h1>Coast Craft</h1>
        <p>Crafting Code, Shaping the Future.</p>
      </section>

      {/* <!--TRENDING NEWS SECTION--> */}
      <TrendingNews trendingNews={blogMetaArray} />

      {/* <!--HERO AREA WITH ANIMATION SECTION--> */}
      <Hero posts={blogMetaArray} />

      {/* <!-- BLOG AREA TAGS --> */}
      <BlogFilter blogArea={blogMetaArray} />

      {/* VIDEO AREA SECTION */}
      <VideoArea blogArea={blogMetaArray} />

      {/* TOP AREA SECTION */}
      <TopBlogArea blogArea={blogMetaArray} />
    </main>
  );
};

export default CoastCraftPage;
