import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors">
            ModernBlog
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-secondary-700 hover:text-primary-600 transition-colors font-medium">
              Home
            </Link>
            <Link href="/categories/technology" className="text-secondary-700 hover:text-primary-600 transition-colors font-medium">
              Technology
            </Link>
            <Link href="/categories/travel" className="text-secondary-700 hover:text-primary-600 transition-colors font-medium">
              Travel
            </Link>
            <Link href="/categories/lifestyle" className="text-secondary-700 hover:text-primary-600 transition-colors font-medium">
              Lifestyle
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-secondary-700 hover:text-primary-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}