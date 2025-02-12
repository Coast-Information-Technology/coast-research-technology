import BlogPostPage from './BlogPost';
import NotFoundPage from '@/app/NotFoundPage';
import { IBlogPost, IMetadata } from '@/lib/type';
import Posts from '@/public/api_data.json';
import { post } from 'jquery';

// Memoized slug generation function to improve performance
const slugCache = new Map<string, string>();
const slugifyTitle = (title: string): string => {
  if (slugCache.has(title)) return slugCache.get(title)!;

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  slugCache.set(title, slug);
  return slug;
};

// Function to fetch post data by slug
const fetchPostData = async (slug: string): Promise<IBlogPost | null> => {
  const posts: IBlogPost[] = Posts.posts;
  // posts.find((post) =>
  //   console.log('The post is: ', post.blogmeta.post_url.slice(51))
  // );
  // console.log('The slug is: ', slug);
  return (
    posts.find(
      (post) => slugifyTitle(post.blogmeta.post_url.slice(51) || '') === slug
    ) || null
  );
};

// Generate Metadata for the blog post
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<IMetadata> {
  const post = await fetchPostData(params.slug);

  if (!post) {
    return {
      title: 'Post not found',
      description: '',
      keywords: [],
      openGraph: { title: '', description: '', url: '', images: [], type: '' },
      twitter: { card: '', title: '', description: '', images: [] },
      authors: [{ name: '' }],
    };
  }

  return {
    title: post.opengraph.title,
    description: post.meta.description,
    keywords: post.meta.keywords,
    openGraph: {
      title: post.opengraph.title,
      description: post.opengraph.description,
      url: post.opengraph.post_url,
      images: [
        { url: post.opengraph.post_image_url, alt: post.opengraph.title },
      ],
      type: post.opengraph.type,
    },
    twitter: {
      card: post.twittermeta.card,
      title: post.twittermeta.title,
      description: post.twittermeta.description,
      images: [post.twittermeta.post_image_url],
    },
    authors: [{ name: post.meta.author }],
  };
}

const Page = async ({ params }: { params: { slug: string } }) => {
  const post = await fetchPostData(params.slug);

  if (!post) return <NotFoundPage />;

  return <BlogPostPage initialPost={post} />;
};

export default Page;
