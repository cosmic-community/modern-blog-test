import Link from 'next/link'
import { Category } from '@/types'

interface CategoryFilterProps {
  categories: Category[]
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  return (
    <div className="text-center">
      <h3 className="text-2xl font-bold mb-6">Explore by Category</h3>
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((category) => (
          <Link key={category.id} href={`/categories/${category.slug}`}>
            <div
              className="px-6 py-3 rounded-lg text-white font-medium hover:scale-105 transform transition-all duration-200 shadow-md hover:shadow-lg"
              style={{ backgroundColor: category.metadata.color || '#6b7280' }}
            >
              <div className="text-lg font-semibold mb-1">{category.title}</div>
              {category.metadata.description && (
                <div className="text-sm opacity-90">{category.metadata.description}</div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}