'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import EditorJS from '@editorjs/editorjs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardLayout from '@/app/dashboard/DashboardLayout';

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

const EditBlogPostPage = () => {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const editorRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch('/api_data.json');
        const data = await res.json();
        const foundPost = data.posts.find((p: BlogPost) => p.id === id);
        setPost(foundPost || null);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPost();
  }, [id]);

  // Initialize Editor.js
  useEffect(() => {
    if (post && post.blockbody && !editorRef.current) {
      const sanitizedBlocks = post.blockbody.blocks.map((block) => {
        if (block.type === 'list') {
          return {
            ...block,
            data: {
              ...block.data,
              items: block.data.items.map((item: any) =>
                typeof item === 'string' ? item : item.content
              ),
            },
          };
        }
        return block;
      });

      editorRef.current = new EditorJS({
        holder: 'editorjs',
        autofocus: true,
        data: { blocks: sanitizedBlocks },
        placeholder: 'Write your blog content...',
        tools: {
          header: require('@editorjs/header'),
          list: require('@editorjs/list'),
          quote: require('@editorjs/quote'),
          code: require('@editorjs/code'),
          image: {
            class: require('@editorjs/image'),
            config: {
              endpoints: {
                byFile: '/api_data.json', // Mock for now
                byUrl:
                  '/https://firebasestorage.googleapis.com/v0/b/coast-craft.appspot.com',
              },
            },
          },
        },
        onReady: () => console.log('Editor.js is ready'),
        onChange: async () => {
          const content = await editorRef.current?.save();
          console.log('Changed content:', content);
        },
      });
    }
  }, [post]);

  const handleSave = async () => {
    const content = await editorRef.current?.save();

    const updatedPost = {
      ...post,
      blogmeta: {
        ...post!.blogmeta,
        title: post!.blogmeta.title,
        post_image_url: post!.blogmeta.post_image_url,
      },
      meta: {
        ...post!.meta,
        description: post!.meta.description,
      },
      blockbody: content,
    };

    console.log('Saving post:', updatedPost);

    // TODO: send to API or save locally
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-xl font-bold">Post not found</h2>
        <Button
          variant="outline"
          onClick={() => router.push('/dashboard/coast-craft/posts')}
        >
          Back
        </Button>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 pt-0">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="outline"
            onClick={() =>
              router.push(`/dashboard/coast-craft/posts/preview/${id}`)
            }
          >
            ← Cancel
          </Button>
          <Button variant="default" onClick={handleSave}>
            Save Changes
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Edit Blog Post</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Title */}
            <Input
              placeholder="Post Title"
              value={post.blogmeta.title}
              onChange={(e) =>
                setPost((prev) =>
                  prev
                    ? {
                        ...prev,
                        blogmeta: { ...prev.blogmeta, title: e.target.value },
                      }
                    : null
                )
              }
            />

            {/* Description */}
            <Input
              placeholder="Short Description"
              value={post.meta.description}
              onChange={(e) =>
                setPost((prev) =>
                  prev
                    ? {
                        ...prev,
                        meta: { ...prev.meta, description: e.target.value },
                      }
                    : null
                )
              }
            />

            {/* Cover Image URL */}
            <Input
              placeholder="Post Image URL"
              value={post.blogmeta.post_image_url}
              onChange={(e) =>
                setPost((prev) =>
                  prev
                    ? {
                        ...prev,
                        blogmeta: {
                          ...prev.blogmeta,
                          post_image_url: e.target.value,
                        },
                      }
                    : null
                )
              }
            />

            {/* Image Preview */}
            {post.blogmeta.post_image_url && (
              <img
                src={post.blogmeta.post_image_url}
                alt="Cover"
                className="w-full h-48 object-cover rounded-md"
              />
            )}

            {/* Editor.js */}
            <div
              id="editorjs"
              className="border rounded-lg p-4 min-h-[300px] bg-white"
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EditBlogPostPage;
