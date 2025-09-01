import Link from 'next/link'
import { Category } from '@/types'

interface CategoryBadgeProps {
  category: Category
  size?: 'sm' | 'md'
}

export default function CategoryBadge({ category, size = 'md' }: CategoryBadgeProps) {
  const sizeClasses = size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-sm'

  return (
    <Link href={`/categories/${category.slug}`}>
      <span
        className={`category-badge inline-flex items-center rounded-full font-medium text-white hover:opacity-80 transition-opacity ${sizeClasses}`}
        style={{ backgroundColor: category.metadata.color || '#6b7280' }}
      >
        {category.title}
      </span>
    </Link>
  )
}