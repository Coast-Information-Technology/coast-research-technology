'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';
import DashboardLayout from '../../DashboardLayout';
import Link from 'next/link';

interface BlogPost {
  id: string;
  meta: {
    description: string;
    author: string;
  };
  blogmeta: {
    title: string;
    post_url: string;
    post_image_url: string;
    time: number;
    read_duration: string;
    tags: string[];
    view_count?: number; // Optional for sorting by views
  };
}

const BlogPostsPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState('newest'); // Sorting state
  const postsPerPage = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api_data.json');
        const data = await res.json();
        setPosts(data.posts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };
    fetchPosts();
  }, []);

  // Extract unique categories
  const categories = Array.from(
    new Set(posts.flatMap((post) => post.blogmeta.tags))
  );

  // Filter and sort posts
  let filteredPosts = posts.filter((post) => {
    const matchesSearch = post.blogmeta.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === null ||
      post.blogmeta.tags.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  // Apply sorting
  filteredPosts = filteredPosts.sort((a, b) => {
    if (sortOption === 'newest') return b.blogmeta.time - a.blogmeta.time;
    if (sortOption === 'oldest') return a.blogmeta.time - b.blogmeta.time;
    if (sortOption === 'most_viewed')
      return (b.blogmeta.view_count || 0) - (a.blogmeta.view_count || 0);
    return 0;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <DashboardLayout>
      <div className="p-6 pt-0">
        <h1 className="text-3xl font-bold mb-2">Blog Posts</h1>

        {/* Search & Sorting */}
        <div className="flex justify-between gap-4 mb-4">
          <Input
            placeholder="Search blog posts..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full"
          />

          {/* Sorting Dropdown */}
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="most_viewed">Most Viewed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Button
            variant={selectedCategory === null ? 'default' : 'outline'}
            onClick={() => {
              setSelectedCategory(null);
              setCurrentPage(1);
            }}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentPage(1);
              }}
              className={cn('capitalize', {
                'bg-primary text-white': selectedCategory === category,
              })}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 custom-scrollbar h-[47.5vh] overflow-y-scroll">
          {currentPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition">
              <img
                src={post.blogmeta.post_image_url}
                alt={post.blogmeta.title}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <CardHeader>
                <CardTitle className="text-lg">{post.blogmeta.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{post.meta.description}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(post.blogmeta.time).toLocaleDateString()} •{' '}
                  {post.blogmeta.read_duration} min read
                </p>
                <Button asChild variant="outline" className="mt-4 w-full">
                  <Link href={`/dashboard/coast-craft/posts/${post.id}`}>
                    Read More
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination className="mt-6 flex justify-center">
            <PaginationContent>
              <PaginationItem>
                <PaginationLink
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  aria-disabled={currentPage === 1}
                  className={
                    currentPage === 1
                      ? 'opacity-50 cursor-not-allowed'
                      : 'cursor-pointer'
                  }
                >
                  Prev
                </PaginationLink>
              </PaginationItem>
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    isActive={currentPage === i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className="cursor-pointer"
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationLink
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  aria-disabled={currentPage === totalPages}
                  className={
                    currentPage === totalPages
                      ? 'opacity-50 cursor-not-allowed'
                      : 'cursor-pointer'
                  }
                >
                  Next
                </PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </DashboardLayout>
  );
};

export default BlogPostsPage;
