import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="text-3xl md:text-4xl font-extrabold text-brand-900 mt-8 mb-4 leading-tight">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl md:text-3xl font-bold text-brand-900 mt-10 mb-4 leading-tight">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl md:text-2xl font-bold text-brand-900 mt-8 mb-3 leading-snug">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-lg font-bold text-brand-900 mt-6 mb-2">{children}</h4>
  ),
  p: ({ children }) => (
    <p className="text-base md:text-lg text-brand-800 leading-relaxed my-4">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc pl-6 my-4 space-y-2 text-brand-800">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-6 my-4 space-y-2 text-brand-800">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="text-base md:text-lg leading-relaxed">{children}</li>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-brand-600 font-semibold underline decoration-brand-300 underline-offset-2 hover:decoration-brand-600"
    >
      {children}
    </a>
  ),
  strong: ({ children }) => (
    <strong className="font-bold text-brand-900">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-accent-400 bg-accent-50 pl-5 pr-4 py-3 my-6 rounded-r-[12px] text-brand-800 italic">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-10 border-brand-200" />,
  code: ({ children }) => (
    <code className="bg-brand-100 text-brand-900 px-1.5 py-0.5 rounded-[6px] text-sm font-mono">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="bg-brand-900 text-brand-100 p-4 rounded-[12px] overflow-x-auto my-6 text-sm font-mono">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="bg-brand-100 border border-brand-200 px-4 py-2 text-left font-bold text-brand-900">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-brand-200 px-4 py-2 text-brand-800">
      {children}
    </td>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
