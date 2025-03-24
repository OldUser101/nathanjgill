"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
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
        const response = await axios.get<string>(markdownUrl);
        const markdownText = response.data;

        const result = await unified()
          .use(remarkParse)
          .use(remarkRehype, { allowDangerousHtml: true })
          .use(rehypeRaw)
          .use(remarkGfm)
          .use(rehypeHighlight)
          .use(rehypeStringify)
          .process(markdownText);

        const htmlContent = result.toString();

        // const rehypeHtml = await rehype()
        //   .data('settings', { fragment: true })
        //   .use(remarkParse)
        //   .use(remarkGfm)
        //   .use(remarkRehype, {allowDangerousHtml: true})
        //   .use(rehypeRaw)
        //   .use(rehypeStringify)
        //   .use(rehypeCodeTitles)
        //   .use(rehypePrism)
        //   .use(rehypeReact)
        //   .process(htmlContent);

          // const rehypeHtml = await rehype()
          // .data('settings', { fragment: true })
          // .use(rehypeRaw)
          // .use(rehypePrism)
          // .process(htmlContent);

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
