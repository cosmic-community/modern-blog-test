import { createBucketClient } from '@cosmicjs/sdk';
import { Post, Author, Category, CosmicResponse } from '@/types';

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging'
});

// Helper function for error handling
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Get all posts
export async function getAllPosts(): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'posts' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    const posts = response.objects as Post[];
    
    // Sort by publication date (newest first)
    return posts.sort((a, b) => {
      const dateA = new Date(a.metadata.publication_date).getTime();
      const dateB = new Date(b.metadata.publication_date).getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching posts:', error);
    throw new Error('Failed to fetch posts');
  }
}

// Get featured posts
export async function getFeaturedPosts(): Promise<Post[]> {
  try {
    const allPosts = await getAllPosts();
    return allPosts.filter(post => post.metadata.featured === true);
  } catch (error) {
    console.error('Error fetching featured posts:', error);
    return [];
  }
}

// Get a single post by slug
export async function getPost(slug: string): Promise<Post | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'posts', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.object as Post;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Error fetching post:', error);
    throw new Error('Failed to fetch post');
  }
}

// Get all categories
export async function getAllCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects as Category[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories');
  }
}

// Get posts by category
export async function getPostsByCategory(categoryId: string): Promise<Post[]> {
  try {
    const allPosts = await getAllPosts();
    return allPosts.filter(post => 
      post.metadata.categories?.some(cat => cat.id === categoryId)
    );
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    return [];
  }
}

// Get all authors
export async function getAllAuthors(): Promise<Author[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'authors' })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects as Author[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching authors:', error);
    throw new Error('Failed to fetch authors');
  }
}

// Get author by slug
export async function getAuthor(slug: string): Promise<Author | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'authors', slug })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.object as Author;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Error fetching author:', error);
    throw new Error('Failed to fetch author');
  }
}

// Get posts by author
export async function getPostsByAuthor(authorId: string): Promise<Post[]> {
  try {
    const allPosts = await getAllPosts();
    return allPosts.filter(post => post.metadata.author?.id === authorId);
  } catch (error) {
    console.error('Error fetching posts by author:', error);
    return [];
  }
}