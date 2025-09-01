import Link from 'next/link'
import { Post } from '@/types'
import CategoryBadge from '@/components/CategoryBadge'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const formattedDate = new Date(post.metadata.publication_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })

  return (
    <article className="card hover:shadow-lg transition-shadow duration-300">
      <Link href={`/posts/${post.slug}`} className="block">
        {/* Featured Image */}
        {post.metadata.featured_image && (
          <div className="aspect-video overflow-hidden">
            <img
              src={`${post.metadata.featured_image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
              alt={post.title}
              width={400}
              height={250}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        <div className="p-6">
          {/* Categories */}
          {post.metadata.categories && post.metadata.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {post.metadata.categories.map((category) => (
                <CategoryBadge key={category.id} category={category} size="sm" />
              ))}
            </div>
          )}

          {/* Title */}
          <h3 className="text-xl font-bold mb-3 line-clamp-2 hover:text-primary-600 transition-colors">
            {post.title}
          </h3>

          {/* Excerpt */}
          {post.metadata.excerpt && (
            <p className="text-secondary-600 mb-4 line-clamp-3">
              {post.metadata.excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="flex items-center justify-between text-sm text-secondary-500">
            <div className="flex items-center gap-2">
              {post.metadata.author?.metadata?.profile_picture && (
                <img
                  src={`${post.metadata.author.metadata.profile_picture.imgix_url}?w=48&h=48&fit=crop&auto=format,compress`}
                  alt={post.metadata.author.title}
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded-full"
                />
              )}
              <span>{post.metadata.author?.title}</span>
            </div>
            <time dateTime={post.metadata.publication_date}>
              {formattedDate}
            </time>
          </div>

          {/* Featured Badge */}
          {post.metadata.featured && (
            <div className="mt-3">
              <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs font-medium">
                Featured
              </span>
            </div>
          )}
        </div>
      </Link>
    </article>
  )
}