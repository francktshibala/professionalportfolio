import { MDXComponents } from 'mdx/types';
import { Typography } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';

export const mdxComponents: MDXComponents = {
  h1: ({ children }) => (
    <Typography variant="h1" className="mb-6 mt-8 first:mt-0">
      {children}
    </Typography>
  ),
  h2: ({ children }) => (
    <Typography variant="h2" className="mb-4 mt-6">
      {children}
    </Typography>
  ),
  h3: ({ children }) => (
    <Typography variant="h3" className="mb-3 mt-5">
      {children}
    </Typography>
  ),
  p: ({ children }) => (
    <Typography variant="body" className="mb-4">
      {children}
    </Typography>
  ),
  ul: ({ children }) => (
    <ul className="mb-4 list-disc pl-6 space-y-2">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 list-decimal pl-6 space-y-2">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="text-gray-700 dark:text-gray-300">{children}</li>
  ),
  code: ({ children }) => (
    <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4 text-sm">
      {children}
    </pre>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4 text-gray-600 dark:text-gray-400">
      {children}
    </blockquote>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  ),
  Card,
};