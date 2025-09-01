import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-bold mb-4 block">
              ModernBlog
            </Link>
            <p className="text-secondary-300 mb-4 max-w-md">
              Discover insights on technology, explore amazing travel destinations, and learn tips for better living.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-secondary-300">
              <li>
                <Link href="/categories/technology" className="hover:text-white transition-colors">
                  Technology
                </Link>
              </li>
              <li>
                <Link href="/categories/travel" className="hover:text-white transition-colors">
                  Travel
                </Link>
              </li>
              <li>
                <Link href="/categories/lifestyle" className="hover:text-white transition-colors">
                  Lifestyle
                </Link>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <ul className="space-y-2 text-secondary-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  RSS Feed
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-800 mt-8 pt-8 text-center text-secondary-400">
          <p>&copy; {currentYear} ModernBlog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}