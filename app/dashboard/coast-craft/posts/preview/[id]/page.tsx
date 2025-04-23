'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

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
  };
  blockbody: {
    blocks: { type: string; data: any }[];
  };
}

const BlogPostPage = () => {
  const { id } = useParams() as { id: string }; // Ensure ID is string
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch('/api_data.json'); // Fetch JSON
        const data = await res.json();
        const foundPost = data.posts.find((post: BlogPost) => post.id === id);
        setPost(foundPost || null);

        if (foundPost) {
          // Filter related posts by the same author, excluding the current post
          const related = data.posts
            .filter(
              (p: BlogPost) =>
                p.meta.author === foundPost.meta.author && p.id !== id
            )
            .slice(0, 3); // Limit to 3 related posts
          setRelatedPosts(related);
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-xl font-bold">Blog Post Not Found</h2>
        <Button
          variant="outline"
          onClick={() => router.push('/dashboard/coast-craft/posts')}
        >
          Back to Blog
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto px-4 md:px-16 pt-12">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => router.push('/dashboard/coast-craft/posts')}
        >
          ← Back to Blog
        </Button>

        <Button
          variant="outline"
          onClick={() =>
            router.push(`/dashboard/coast-craft/posts/edit/${post.id}`)
          }
        >
          Edit
        </Button>
      </div>

      <Card className="mt-6">
        <img
          src={post.blogmeta.post_image_url}
          alt={post.blogmeta.title}
          className="w-full h-64 object-cover rounded-t-lg"
        />
        <CardHeader>
          <CardTitle className="text-2xl">{post.blogmeta.title}</CardTitle>
          <p className="text-sm text-gray-500">
            {new Date(post.blogmeta.time).toLocaleDateString()} •{' '}
            {post.blogmeta.read_duration} min read
          </p>
          <p className="text-sm text-gray-600 italic">By {post.meta.author}</p>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">{post.meta.description}</p>

          {/* Render Blog Content */}
          <div className="mt-4 space-y-4">
            {post.blockbody?.blocks.map((block, index) => {
              if (block.type === 'header') {
                const level = block.data.level || 2;
                const Tag = `h${level}` as keyof JSX.IntrinsicElements;
                return (
                  <Tag key={index} className="text-xl font-bold">
                    {block.data.text}
                  </Tag>
                );
              }

              if (block.type === 'paragraph') {
                return (
                  <p key={index} className="text-gray-700">
                    {block.data.text}
                  </p>
                );
              }

              if (block.type === 'image') {
                return (
                  <img
                    key={index}
                    src={block.data.file?.url}
                    alt={block.data.caption || 'Blog image'}
                    className="w-full rounded-lg"
                  />
                );
              }

              if (block.type === 'list') {
                const isOrdered = block.data.style === 'ordered';
                const ListTag = isOrdered ? 'ol' : 'ul';
                return (
                  <ListTag
                    key={index}
                    className={`ml-5 space-y-1 text-gray-700 ${
                      isOrdered ? 'list-decimal' : 'list-disc'
                    }`}
                  >
                    {block.data.items.map((item: any, i: number) => (
                      <li key={i}>{item.content || item}</li>
                    ))}
                  </ListTag>
                );
              }

              if (block.type === 'quote') {
                return (
                  <blockquote
                    key={index}
                    className="border-l-4 pl-4 italic text-gray-600 border-gray-400"
                  >
                    {block.data.text}
                    {block.data.caption && (
                      <footer className="text-xs text-gray-500 mt-1">
                        — {block.data.caption}
                      </footer>
                    )}
                  </blockquote>
                );
              }

              if (block.type === 'code') {
                return (
                  <pre
                    key={index}
                    className="bg-gray-100 text-sm p-4 rounded-md overflow-x-auto font-mono text-gray-800"
                  >
                    <code>{block.data.code}</code>
                  </pre>
                );
              }

              return null;
            })}
          </div>
        </CardContent>
      </Card>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4">
            More from {post.meta.author}
          </h2>
          <div className="grid grid-cols-1 sm:grid-col-2 md:grid-cols-4 gap-6">
            {relatedPosts.map((related) => (
              <Link href={`/blog/${related.id}`}>
                <Card key={related.id} className="hover:shadow-lg transition">
                  <img
                    src={related.blogmeta.post_image_url}
                    alt={related.blogmeta.title}
                    className="w-full h-30 object-cover rounded-t-lg"
                  />
                  <CardHeader>
                    <CardTitle className="text-[14px]">
                      {related.blogmeta.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[12px] -mt-2 text-gray-600 line-clamp-2">
                      {related.meta.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(related.blogmeta.time).toLocaleDateString()} •{' '}
                      {related.blogmeta.read_duration} min read
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPostPage;
