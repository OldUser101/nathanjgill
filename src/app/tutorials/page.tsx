import { Tutorial } from '@/lib/tutorial';
import fs from 'fs';
import path from 'path';
import { HeaderPanel } from '@/components/nathanjgill/header';
import { FooterPanel } from '@/components/nathanjgill/footer';
import { TutorialGrid } from '@/components/nathanjgill/tutorial_grid';

export function generateMetadata() {
    return {
        title: "Nathan Gill | Tutorials"
    };
}

const loadTutorials = (): Tutorial[] => {
    return JSON.parse(
        fs.readFileSync(path.join(process.cwd(), 'public', 'tutorials.json'), 'utf8')
    );
};

export default function TutorialIndex() {
    const tutorials = loadTutorials();
    return (
        <div>
            <HeaderPanel fixed/>
            <div className="h-14"/>
            <TutorialGrid tutorials={tutorials}/>
            <FooterPanel/>
        </div>
    );
}

export async function generateStaticParams() {
    const tutorials = loadTutorials();
    return tutorials;
}
