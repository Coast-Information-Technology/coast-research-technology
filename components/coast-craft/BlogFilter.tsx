// @/components/coast-craft/BlogFilter.tsx
'use client';

import { IBlogArea, IBlogMeta } from '@/lib/type';
import { Button } from "@heroui/react";
import React, { useEffect, useState } from 'react';
import Styles from './coast-craft.module.css';
import { BlogArea } from './BlogArea';
import Newsletter from './Newsletter';

export const BlogFilter: React.FC<IBlogArea> = ({ blogArea }) => {
  // State to hold filtered blogs
  const [filteredBlogs, setFilteredBlogs] = useState<IBlogMeta[]>([]);

  const handleFilter = (type: string) => {
    let filteredBlogs: IBlogMeta[];

    switch (type) {
      case 'latest':
        filteredBlogs = blogArea.sort((a, b) => b.time - a.time).slice(0, 8);
        break;
      case 'popular':
        filteredBlogs = blogArea
          .sort((a, b) => b.view_count - a.view_count)
          .slice(0, 8);
        break;
      case 'coding':
        filteredBlogs = blogArea
          .filter((blog) => blog.tags.includes('coding'))
          .slice(0, 8);
        break;
      case 'insights':
        filteredBlogs = blogArea
          .filter((blog) => blog.tags.includes('insights'))
          .slice(0, 8);
        break;
      default:
        filteredBlogs = blogArea.sort((a, b) => b.time - a.time).slice(0, 8);
        break;
    }

    // Update the state with the filtered blogs
    setFilteredBlogs(filteredBlogs);
  };

  // Set initial filter to 'latest' on component mount
  useEffect(() => {
    handleFilter('latest');
  }, [blogArea]); // Run this effect when the blogArea prop changes

  return (
    <>
      <div className={Styles.containerContent}>
        <div className={Styles.containerFirstCol}>
          <div>
            <div className={Styles.blogTags}>
              <h2>ALL POSTS</h2>
              <nav className={Styles.blogTagsLists}>
                <ul role="list" className={Styles.tagLists}>
                  <li role="listItem">
                    <button
                      className={Styles.buttons}
                      onClick={() => handleFilter('latest')}
                    >
                      LATEST
                    </button>
                  </li>
                  <li role="listItem">
                    <button
                      className={Styles.buttons}
                      onClick={() => handleFilter('popular')}
                    >
                      POPULAR
                    </button>
                  </li>
                  <li role="listItem">
                    <button
                      className={Styles.buttons}
                      onClick={() => handleFilter('coding')}
                    >
                      CODING
                    </button>
                  </li>
                  <li role="listItem">
                    <button
                      className={Styles.buttons}
                      onClick={() => handleFilter('insights')}
                    >
                      INSIGHTS
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
            <div>
              <BlogArea blogArea={filteredBlogs} />
            </div>
          </div>
        </div>
        <div className={Styles.secondContainer}>
          <Newsletter />
        </div>
      </div>
    </>
  );
};
