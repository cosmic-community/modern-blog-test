import Link from 'next/link'
import { Author } from '@/types'

interface AuthorCardProps {
  author: Author
}

export default function AuthorCard({ author }: AuthorCardProps) {
  return (
    <div className="bg-secondary-50 rounded-xl p-6">
      <div className="flex items-start gap-4">
        {/* Author Photo */}
        {author.metadata?.profile_picture && (
          <Link href={`/authors/${author.slug}`}>
            <img
              src={`${author.metadata.profile_picture.imgix_url}?w=128&h=128&fit=crop&auto=format,compress`}
              alt={author.title}
              width={80}
              height={80}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover hover:ring-4 hover:ring-primary-100 transition-all"
            />
          </Link>
        )}

        <div className="flex-1">
          {/* Author Name */}
          <Link href={`/authors/${author.slug}`}>
            <h3 className="text-xl font-bold mb-2 hover:text-primary-600 transition-colors">
              {author.title}
            </h3>
          </Link>

          {/* Author Bio */}
          {author.metadata?.bio && (
            <p className="text-secondary-600 mb-4 leading-relaxed">
              {author.metadata.bio}
            </p>
          )}

          {/* Social Links */}
          <div className="flex flex-wrap gap-4">
            {author.metadata?.twitter && (
              <a
                href={`https://twitter.com/${author.metadata.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-500 hover:text-primary-600 transition-colors text-sm font-medium"
              >
                @{author.metadata.twitter}
              </a>
            )}
            {author.metadata?.linkedin && (
              <a
                href={author.metadata.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-500 hover:text-primary-600 transition-colors text-sm font-medium"
              >
                LinkedIn
              </a>
            )}
            {author.metadata?.website && (
              <a
                href={author.metadata.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-500 hover:text-primary-600 transition-colors text-sm font-medium"
              >
                Website
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}