// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getAllCategories, getPostsByCategory } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import { Metadata } from 'next'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const categories = await getAllCategories()
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const categories = await getAllCategories()
  const category = categories.find(cat => cat.slug === slug)

  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: `${category.title} - Modern Blog Platform`,
    description: category.metadata.description || `Browse all ${category.title} posts`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const categories = await getAllCategories()
  const category = categories.find(cat => cat.slug === slug)

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category.id)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category Header */}
      <header className="mb-12 text-center">
        <div className="inline-flex items-center px-4 py-2 rounded-full text-white text-sm font-medium mb-4"
             style={{ backgroundColor: category.metadata.color || '#6b7280' }}>
          {category.title}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {category.title}
        </h1>
        {category.metadata.description && (
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            {category.metadata.description}
          </p>
        )}
      </header>

      {/* Posts */}
      <section>
        {posts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-secondary-600 text-lg">
              No posts found in this category yet.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}