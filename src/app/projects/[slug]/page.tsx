import { notFound } from 'next/navigation';
import { Project } from '@/lib/project';
import fs from 'fs';
import path from 'path';
import { ProjectPage } from '@/components/nathanjgill/project';

interface ProjectLoaderProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectLoaderProps) {
  const { slug } = await params;
  const tutorials = loadProjects();
  const tutorial = tutorials.find(t => t.slug === slug);

  if (!tutorial) {
    return {
      title: 'Nathan Gill | Not Found',
    };
  }

  return {
    title: `Nathan Gill | ${tutorial.title}`,
  };
}

const loadProjects = (): Project[] => {
  return JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'public', 'projects.json'), 'utf8')
  );
};

export default async function TutorialLoader({ params }: ProjectLoaderProps) {
  const { slug } = await params;

  const projects = loadProjects();
  const project = projects.find(t => t.slug === slug);

  if (!project) return notFound();

  return (
      <ProjectPage project={project}/>
  );
}

export async function generateStaticParams() {
  const projects = loadProjects();
  return projects.map(t => ({ slug: t.slug }));
}
