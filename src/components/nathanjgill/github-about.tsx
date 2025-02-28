import { Card } from "../ui/card";
import MarkdownRenderer from "./markdownRenderer";

export function GitHubAbout() {
    return (
        <Card className="p-4 flex grow">
            <div>
                <h1 className="text-2xl font-semibold">About</h1>
                <MarkdownRenderer markdownUrl="https://raw.githubusercontent.com/OldUser101/OldUser101/refs/heads/master/README.md"/>
            </div>
        </Card>
    );
}