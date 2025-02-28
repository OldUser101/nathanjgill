import { Stats } from "@/lib/stats";
import { Card } from "../ui/card";
import { NumericStat } from "./numericStat";

interface GitHubStatsCardProps {
    stats: Stats
};

export function GitHubStatsCard({ stats }: GitHubStatsCardProps) {
    return (
        <Card className="flex flex-col md:flex-row gap-4 p-4">
            <div>
                {
                    // eslint-disable-next-line @next/next/no-img-element
                    <img alt="GitHub Avatar" src={stats.avatarUrl} width={128} height={128} className="rounded-full"/>
                }
            </div>
            <div>
                <a className="flex pb-2 hover:underline" target="_blank" rel="noopener noreferrer" href={stats.htmlUrl}>
                    <h1 className="text-3xl font-semibold">Nathan Gill</h1>
                    <h1 className="text-2xl mt-auto ml-4">OldUser101</h1>
                </a>
                <div className="border-b border-b-neutral-700 my-2 mx-2"/>
                <NumericStat title="bytes of public code" value={stats.totalCode}/>
                <div className="border-b border-b-neutral-700 my-2 mx-2"/>
                <NumericStat title=" languages" prefix="in" className="ml-2" value={stats.topLanguages?.length ?? 0}/>
                <div className="border-b border-b-neutral-700 my-2 mx-2"/>
                <NumericStat title="public repositories" prefix="across" className="ml-2" value={stats.totalRepos}/>
            </div>
        </Card>
    );
}