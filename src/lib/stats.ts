import axios, { AxiosResponse } from "axios";

export type Stats = {
    avatarUrl: string,
    totalDisk: number,
    totalCode: number,
    totalRepos: number,
    htmlUrl: string,
    topLanguages: Language[] | null,
    bio: string
};

export type LanguageEdge = {
    size: number,
    node: {
        name: string;
    };
};

export type RepoNode = {
    name: string,
    diskUsage: number,
    languages: {
        edges: Array<LanguageEdge>;
    };
};

export type StatGraphQLResponse = {
    data: {
        viewer: {
            repositories: {
                nodes: Array<RepoNode>;
            };
        };
    };
}

export type RESTResponse = {
    login: string,
    avatar_url: string,
    html_url: string,
    public_repos: number,
    name: string,
    bio: string,
};

export type Language = {
    name: string,
    size: number
}

export function GetStatsFromGraphQlRestQuery(gres: StatGraphQLResponse, rres: RESTResponse): Stats {
    const stats: Stats = {
        avatarUrl: rres.avatar_url,
        totalDisk: 0,
        totalCode: 0,
        totalRepos: rres.public_repos,
        htmlUrl: rres.html_url,
        topLanguages: null,
        bio: rres.bio,
    };

    let totalDisk = 0;
    let totalCode = 0;
    const languages = new Map<string, number>();

    gres.data.viewer.repositories.nodes.forEach((repo: RepoNode) => {
        totalDisk += repo.diskUsage;
        repo.languages.edges.forEach((language: LanguageEdge) => {
            totalCode += language.size;
            if (languages.has(language.node.name)) {
                languages.set(language.node.name, (languages.get(language.node.name) ?? 0) + language.size);
            }
            else {
                languages.set(language.node.name, language.size);
            }
        });
    });

    stats.totalDisk = totalDisk;
    stats.totalCode = totalCode;

    const sortMapByValue = (map: Map<string, number>): Language[] => {
        const languageArr = new Array<Language>();
        map.forEach((value: number, key: string) => {
            languageArr.push({
                name: key,
                size: value
            });
        });

        return languageArr.sort((a, b) => ((a.size > b.size) ? -1 : 1));
    };

    stats.topLanguages = sortMapByValue(languages);

    return stats;
}

export async function QueryGitHubRestApi(): Promise<AxiosResponse<any, any> | null> {
    const accessToken = process.env.GITHUB_TOKEN;

    if (!accessToken) {
        return null;
    }

    return await axios.get("https://api.github.com/users/OldUser101", {
        headers: {
            "Authorization": process.env.GITHUB_TOKEN
        }
    });
}