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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@radix-ui/react-dialog';
import { MoreVertical, Edit, Eye, Trash2, Undo } from 'lucide-react';
import {
  Toast,
  ToastProvider,
  ToastTitle,
  ToastDescription,
  ToastViewport,
} from '@radix-ui/react-toast';
import { cn } from '@/lib/utils';
import DashboardLayout from '../../DashboardLayout';
import Link from 'next/link';
import { DialogHeader } from '@/components/ui/dialog-header';
import { DialogFooter } from '@/components/ui/dialog-footer';

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

const page = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState('newest');
  const [deletePostId, setDeletePostId] = useState<string | null>(null);
  const [deletedPost, setDeletedPost] = useState<BlogPost | null>(null);
  const [showToast, setShowToast] = useState(false);
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

  // Function to confirm delete
  const confirmDelete = () => {
    if (deletePostId) {
      const postToDelete = posts.find((post) => post.id === deletePostId);
      if (postToDelete) {
        setDeletedPost(postToDelete);
        setShowToast(true);
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post.id !== deletePostId)
        );
      }
      setDeletePostId(null);
    }
  };

  // Restore deleted post
  const restorePost = () => {
    if (deletedPost) {
      setPosts((prevPosts) => [deletedPost, ...prevPosts]);
      setDeletedPost(null);
      setShowToast(false);
    }
  };

  return (
    <DashboardLayout>
      <ToastProvider>
        <div className="p-6 pt-0">
          <h1 className="text-3xl font-bold mb-2">All Posts</h1>

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
              <Card
                key={post.id}
                className="hover:shadow-lg transition relative"
              >
                {/* 3-Dot Menu */}
                <Popover>
                  <PopoverTrigger className="absolute top-2 right-2 p-2 rounded-md bg-gray-200 hover:bg-gray-200">
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                  </PopoverTrigger>
                  <PopoverContent className="bg-white border shadow-lg rounded-md p-2 w-36 text-sm">
                    <Link
                      href={`/dashboard/coast-craft/posts/edit/${post.id}`}
                      className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
                    >
                      <Edit className="w-4 h-4" /> Edit
                    </Link>
                    <Link
                      href={`/dashboard/coast-craft/posts/preview/${post.id}`}
                      className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
                    >
                      <Eye className="w-4 h-4" /> Preview
                    </Link>
                    <Dialog>
                      <DialogTrigger asChild>
                        <button
                          onClick={() => setDeletePostId(post.id)}
                          className="flex items-center gap-2 p-2 text-red-500 hover:bg-red-100 rounded w-full"
                        >
                          <Trash2 className="w-4 h-4" /> Delete
                        </button>
                      </DialogTrigger>
                      <DialogContent className="bg-white p-6 rounded-lg shadow-lg">
                        <DialogHeader>
                          <DialogTitle>Confirm Deletion</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to delete this post?
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="flex justify-end gap-4 mt-4">
                          <Button
                            variant="outline"
                            onClick={() => setDeletePostId(null)}
                          >
                            Cancel
                          </Button>
                          <Button variant="destructive" onClick={confirmDelete}>
                            Delete
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </PopoverContent>
                </Popover>
                <Link href={`/dashboard/coast-craft/posts/preview/${post.id}`}>
                  <img
                    src={post.blogmeta.post_image_url}
                    alt={post.blogmeta.title}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {post.blogmeta.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      {post.meta.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(post.blogmeta.time).toLocaleDateString()} •{' '}
                      {post.blogmeta.read_duration} min read
                    </p>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>

          {/* Toast for Delete Confirmation */}
          {showToast && (
            <Toast>
              <ToastTitle>Post Deleted</ToastTitle>
              <ToastDescription>
                <Button
                  variant="ghost"
                  onClick={restorePost}
                  className="text-blue-500"
                >
                  <Undo className="w-4 h-4 inline-block mr-1" /> Undo
                </Button>
              </ToastDescription>
            </Toast>
          )}
          <ToastViewport />

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
      </ToastProvider>
    </DashboardLayout>
  );
};

export default page;
