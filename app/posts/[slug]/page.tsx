// app/posts/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getPost } from '@/lib/cosmic'
import MarkdownContent from '@/components/MarkdownContent'
import AuthorCard from '@/components/AuthorCard'
import CategoryBadge from '@/components/CategoryBadge'
import { Metadata } from 'next'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.metadata.excerpt || `Read ${post.title} on our blog`,
    openGraph: {
      title: post.title,
      description: post.metadata.excerpt || `Read ${post.title} on our blog`,
      images: post.metadata.featured_image ? [
        {
          url: post.metadata.featured_image.imgix_url,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : [],
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const formattedDate = new Date(post.metadata.publication_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Post Header */}
      <header className="mb-8">
        {/* Categories */}
        {post.metadata.categories && post.metadata.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.metadata.categories.map((category) => (
              <CategoryBadge key={category.id} category={category} />
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          {post.title}
        </h1>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-secondary-600 mb-6">
          <time dateTime={post.metadata.publication_date}>
            {formattedDate}
          </time>
          {post.metadata.featured && (
            <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-sm font-medium">
              Featured
            </span>
          )}
        </div>

        {/* Excerpt */}
        {post.metadata.excerpt && (
          <p className="text-xl text-secondary-700 mb-8 leading-relaxed">
            {post.metadata.excerpt}
          </p>
        )}

        {/* Featured Image */}
        {post.metadata.featured_image && (
          <div className="mb-8">
            <img
              src={`${post.metadata.featured_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
              alt={post.title}
              width={1200}
              height={600}
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </div>
        )}
      </header>

      {/* Post Content */}
      <div className="prose prose-lg max-w-none mb-12">
        <MarkdownContent content={post.metadata.content} />
      </div>

      {/* Author Card */}
      {post.metadata.author && (
        <div className="border-t pt-8">
          <AuthorCard author={post.metadata.author} />
        </div>
      )}
    </article>
  )
}