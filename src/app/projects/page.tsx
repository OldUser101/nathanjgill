import { HeaderPanel } from "@/components/nathanjgill/header";
import { FooterPanel } from "@/components/nathanjgill/footer";
import { ProjectGrid } from "@/components/nathanjgill/projects_grid";
import fs from 'fs';
import path from 'path';
import { Project } from "@/lib/project";

const loadProjects = (): Project[] => {
  return JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'public', 'projects.json'), 'utf8')
  );
};

export function generateMetadata() {
  return {
      title: "Nathan Gill | Projects"
  };
}

export default function Projects() {
  const projects = loadProjects();
  return (
    <div className="font-sans">
        <HeaderPanel fixed/>
        <div className="h-14"/>
        <main>
          <ProjectGrid projects={projects}/>
        </main>
        <FooterPanel/>
    </div>
  );
}

export async function generateStaticParams() {
  const projects = loadProjects();
  return projects.map(t => ({ slug: t.slug }));
}