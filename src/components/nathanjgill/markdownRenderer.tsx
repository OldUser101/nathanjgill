"use client"

import { useState, useEffect } from 'react';
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkGfm from 'remark-gfm';
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";

import '@/app/markdown.css';

interface MarkdownRendererProps {
  markdownUrl: string;
  className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdownUrl, className = "" }) => {
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const response = await fetch(markdownUrl);

        if (!response.ok) {
            throw Error("Failed to retrieve Markdown content.");
        }

        const markdownText = await response.text();

        const result = await unified()
          .use(remarkParse)
          .use(remarkRehype, { allowDangerousHtml: true })
          .use(rehypeRaw)
          .use(remarkGfm)
          .use(rehypeHighlight)
          .use(rehypeStringify)
          .process(markdownText);

        const htmlContent = result.toString();

        setMarkdownContent(htmlContent);
      } catch (err) {
        setError('Failed to fetch Markdown content.');
        console.error(err);
      }
    };

    fetchMarkdown();
  }, [markdownUrl]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={`markdown-content ${className}`} dangerouslySetInnerHTML={{ __html: markdownContent }} />
  );
};

export default MarkdownRenderer;
