"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import {remark} from 'remark';
import html from 'remark-html';

interface MarkdownRendererProps {
  markdownUrl: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdownUrl }) => {
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const response = await axios.get<string>(markdownUrl);
        const markdownText = response.data;

        const result = await remark().use(html).process(markdownText);
        setMarkdownContent(result.toString());
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
    <div className="markdown-container" dangerouslySetInnerHTML={{ __html: markdownContent }} />
  );
};

export default MarkdownRenderer;
