import { Stats } from "@/lib/stats";
import { Card } from "../ui/card";
import { Language } from "@/lib/stats";

interface GitHubTopLangProps {
    stats: Stats
}

export function GitHubTopLang({ stats }: GitHubTopLangProps) {
    return (
        <Card className="p-4 flex flex-col">
            <h1 className="text-2xl font-semibold mb-2">Top Languages</h1>
            <div className="ml-4 text-lg flex flex-col h-full grow">
                {stats.topLanguages?.slice(0, 5).map((language: Language) => (
                    <p key={language.name} className="grow">
                        {language.name} - <span className="font-semibold">{language.size}</span> bytes
                    </p>
                ))}
            </div>
        </Card>
    );
}