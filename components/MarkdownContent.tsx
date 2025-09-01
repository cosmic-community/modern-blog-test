'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypePrism from 'rehype-prism-plus'

interface MarkdownContentProps {
  content: string
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypePrism]}
      components={{
        h1: ({ children }) => (
          <h1 className="text-4xl font-bold mb-6 text-gray-900">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-3xl font-semibold mb-4 text-gray-900">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-2xl font-semibold mb-3 text-gray-900">{children}</h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-xl font-semibold mb-2 text-gray-900">{children}</h4>
        ),
        p: ({ children }) => (
          <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700">{children}</ol>
        ),
        li: ({ children }) => (
          <li className="text-gray-700">{children}</li>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-primary-300 pl-4 py-2 mb-4 italic text-gray-600 bg-gray-50">
            {children}
          </blockquote>
        ),
        code: ({ inline, children, ...props }) => {
          return inline ? (
            <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono" {...props}>
              {children}
            </code>
          ) : (
            <code className="block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto font-mono text-sm" {...props}>
              {children}
            </code>
          )
        },
        pre: ({ children }) => (
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
            {children}
          </pre>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            className="text-primary-500 hover:text-primary-600 underline transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-gray-900">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="italic text-gray-800">{children}</em>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}