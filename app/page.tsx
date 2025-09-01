import { getAllPosts, getFeaturedPosts, getAllCategories } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import FeaturedPost from '@/components/FeaturedPost'
import CategoryFilter from '@/components/CategoryFilter'

export default async function HomePage() {
  const [posts, featuredPosts, categories] = await Promise.all([
    getAllPosts(),
    getFeaturedPosts(),
    getAllCategories()
  ])

  const recentPosts = posts.slice(0, 6)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section with Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
            Welcome to Our Blog
          </h1>
          <p className="text-xl text-secondary-600 text-center mb-12 max-w-3xl mx-auto">
            Discover insights on technology, explore amazing travel destinations, and learn tips for better living.
          </p>
          
          <div className="grid gap-8">
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Categories Filter */}
      {categories.length > 0 && (
        <section className="mb-12">
          <CategoryFilter categories={categories} />
        </section>
      )}

      {/* Recent Posts */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Recent Posts</h2>
        </div>
        
        {recentPosts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-secondary-600 text-lg">No posts found.</p>
          </div>
        )}
      </section>
    </div>
  )
}