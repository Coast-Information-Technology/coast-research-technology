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
        <Button variant="outline" onClick={() => router.push('/blog')}>
          Back to Blog
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Button variant="outline" onClick={() => router.push('/blog')}>
        ← Back to Blog
      </Button>

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
            {post.blockbody.blocks.map((block, index) => {
              if (block.type === 'header') {
                return (
                  <h2 key={index} className="text-xl font-bold">
                    {block.data.text}
                  </h2>
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
                    src={block.data.file.url}
                    alt={block.data.caption}
                    className="w-full rounded-lg"
                  />
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map((related) => (
              <Card key={related.id} className="hover:shadow-lg transition">
                <img
                  src={related.blogmeta.post_image_url}
                  alt={related.blogmeta.title}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
                <CardHeader>
                  <CardTitle className="text-lg">
                    {related.blogmeta.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    {related.meta.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(related.blogmeta.time).toLocaleDateString()} •{' '}
                    {related.blogmeta.read_duration} min read
                  </p>
                  <Button asChild variant="outline" className="mt-4 w-full">
                    <Link href={`/blog/${related.id}`}>Read More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPostPage;
