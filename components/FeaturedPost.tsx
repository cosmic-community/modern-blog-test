import Link from 'next/link'
import { Post } from '@/types'
import CategoryBadge from '@/components/CategoryBadge'

interface FeaturedPostProps {
  post: Post
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  const formattedDate = new Date(post.metadata.publication_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <article className="card overflow-hidden">
      <Link href={`/posts/${post.slug}`} className="block">
        <div className="md:flex">
          {/* Featured Image */}
          {post.metadata.featured_image && (
            <div className="md:w-1/2">
              <div className="aspect-video md:aspect-auto md:h-full overflow-hidden">
                <img
                  src={`${post.metadata.featured_image.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
                  alt={post.title}
                  width={800}
                  height={500}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-8 md:w-1/2 flex flex-col justify-center">
            {/* Featured Badge */}
            <div className="mb-4">
              <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                Featured Post
              </span>
            </div>

            {/* Categories */}
            {post.metadata.categories && post.metadata.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.metadata.categories.map((category) => (
                  <CategoryBadge key={category.id} category={category} />
                ))}
              </div>
            )}

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-bold mb-4 hover:text-primary-600 transition-colors">
              {post.title}
            </h2>

            {/* Excerpt */}
            {post.metadata.excerpt && (
              <p className="text-secondary-600 text-lg mb-6 leading-relaxed">
                {post.metadata.excerpt}
              </p>
            )}

            {/* Meta */}
            <div className="flex items-center gap-4 text-secondary-500">
              <div className="flex items-center gap-2">
                {post.metadata.author?.metadata?.profile_picture && (
                  <img
                    src={`${post.metadata.author.metadata.profile_picture.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                    alt={post.metadata.author.title}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <span className="font-medium">{post.metadata.author?.title}</span>
              </div>
              <time dateTime={post.metadata.publication_date}>
                {formattedDate}
              </time>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}