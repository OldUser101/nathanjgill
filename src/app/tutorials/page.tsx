import { Tutorial } from '@/lib/tutorial';
import fs from 'fs';
import path from 'path';
import { HeaderPanel } from '@/components/nathanjgill/header';
import { FooterPanel } from '@/components/nathanjgill/footer';

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
        <div className="font-sans">
            <HeaderPanel fixed/>
            <div className="h-14"/>
            <main>
                {tutorials.map((t, i) => {
                    return <a href={`/tutorials/${t.slug}`} key={i}>{t.title}</a>
                })}
            </main>
            <FooterPanel />
        </div>
    );
}

export async function generateStaticParams() {
    const tutorials = loadTutorials();
    return tutorials;
}
