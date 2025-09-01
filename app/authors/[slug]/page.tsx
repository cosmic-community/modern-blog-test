// app/authors/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getAuthor, getPostsByAuthor, getAllAuthors } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import { Metadata } from 'next'

interface AuthorPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const authors = await getAllAuthors()
  return authors.map((author) => ({
    slug: author.slug,
  }))
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params
  const author = await getAuthor(slug)

  if (!author) {
    return {
      title: 'Author Not Found',
    }
  }

  return {
    title: `${author.title} - Modern Blog Platform`,
    description: author.metadata.bio || `Read posts by ${author.title}`,
  }
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params
  const author = await getAuthor(slug)

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Author Header */}
      <header className="mb-12 text-center">
        {/* Author Photo */}
        {author.metadata.profile_picture && (
          <div className="mb-6">
            <img
              src={`${author.metadata.profile_picture.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
              alt={author.title}
              width={200}
              height={200}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto shadow-lg object-cover"
            />
          </div>
        )}

        {/* Author Name */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {author.title}
        </h1>

        {/* Author Bio */}
        {author.metadata.bio && (
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto mb-6">
            {author.metadata.bio}
          </p>
        )}

        {/* Social Links */}
        <div className="flex justify-center gap-4">
          {author.metadata.twitter && (
            <a
              href={`https://twitter.com/${author.metadata.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-500 hover:text-primary-600 transition-colors"
            >
              Twitter
            </a>
          )}
          {author.metadata.linkedin && (
            <a
              href={author.metadata.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-500 hover:text-primary-600 transition-colors"
            >
              LinkedIn
            </a>
          )}
          {author.metadata.website && (
            <a
              href={author.metadata.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-500 hover:text-primary-600 transition-colors"
            >
              Website
            </a>
          )}
        </div>
      </header>

      {/* Posts */}
      <section>
        <h2 className="text-3xl font-bold mb-8">
          Posts by {author.title} ({posts.length})
        </h2>
        
        {posts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-secondary-600 text-lg">
              No posts by this author yet.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}