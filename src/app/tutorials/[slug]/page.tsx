import { notFound } from 'next/navigation';
import MarkdownRenderer from '@/components/nathanjgill/markdownRenderer';
import { Tutorial } from '@/lib/tutorial';
import TutorialPage from '@/components/nathanjgill/tutorial';
import fs from 'fs';
import path from 'path';

interface TutorialLoaderProps {
  params: { slug: string };
  searchParams?: { chapter?: string };
}

export async function generateMetadata({ params }: TutorialLoaderProps) {
  const { slug } = await params;
  const tutorials = loadTutorials();
  const tutorial = tutorials.find(t => t.slug === slug);

  if (!tutorial) {
    return {
      title: 'Nathan Gill | Tutorial Not Found',
    };
  }

  return {
    title: `Nathan Gill | ${tutorial.title}`,
  };
}

const loadTutorials = (): Tutorial[] => {
  return JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'public', 'tutorials.json'), 'utf8')
  );
};

export default async function TutorialLoader({ params, searchParams }: TutorialLoaderProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const chapterNumber = parseInt(await resolvedSearchParams?.chapter || '1');

  const tutorials = loadTutorials();
  const tutorial = tutorials.find(t => t.slug === slug);

  if (!tutorial) return notFound();

  const currentChapter = tutorial.chapters[chapterNumber - 1];
  if (!currentChapter) return notFound();

  return (
      <TutorialPage chapterNumber={chapterNumber - 1} tutorial={tutorial} slug={slug} completedChapters={[]}/>
  );
}

export async function generateStaticParams() {
  const tutorials = loadTutorials();
  return tutorials.map(t => ({ slug: t.slug }));
}
