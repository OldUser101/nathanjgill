export type Repository = {
    name: string;
    description: string | null;
    forkCount: number;
    stargazerCount: number;
    url: string;
    isPrivate: boolean;
    languageName: string | null;
    avatarUrl: string;
    login: string;
    ownerType: string,
    watchersCount: number;
    totalCommits: number;
    lastCommit: string | null;
};

export type GraphQLResponse = {
    data: {
        viewer: {
            contributionsCollection: {
                commitContributionsByRepository: Array<{
                    contributions: {
                        totalCount: number;
                        edges: Array<{
                            node: {
                                occurredAt: string;
                            };
                        }>;
                    },
                    repository: {
                        name: string;
                        description: string | null;
                        forkCount: number;
                        stargazerCount: number;
                        url: string;
                        isPrivate: boolean;
                        languages: {
                            edges: Array<{
                                node: {
                                    name: string;
                                };
                            }>;
                        };
                        owner: {
                            avatarUrl: string;
                            login: string;
                            __typename: string;
                        };
                        watchers: {
                            totalCount: number;
                        };
                    };
                }>;
                pullRequestContributionsByRepository: Array<{
                    contributions: {
                        totalCount: number;
                        edges: Array<{
                            node: {
                                occurredAt: string;
                            };
                        }>;
                    },
                    repository: {
                        name: string;
                        description: string | null;
                        forkCount: number;
                        stargazerCount: number;
                        url: string;
                        isPrivate: boolean;
                        languages: {
                            edges: Array<{
                                node: {
                                    name: string;
                                };
                            }>;
                        };
                        owner: {
                            avatarUrl: string;
                            login: string;
                            __typename: string;
                        };
                        watchers: {
                            totalCount: number;
                        };
                    };
                }>;
            };
        };
    };
};
  
export function GetRepoListFromGraphQlQuery(res: GraphQLResponse): Repository[] {
    const { commitContributionsByRepository, pullRequestContributionsByRepository } = res.data.viewer.contributionsCollection;

    const parseRepositories = (contributionsArray: typeof commitContributionsByRepository): Map<string, Repository> => {
        const repositoryMap = new Map<string, Repository>();

        contributionsArray.forEach(({ contributions, repository }) => {
            const repoKey = repository.url;
            const occurredAtDates = contributions.edges.map(({ node }) => node.occurredAt);

            if (!repositoryMap.has(repoKey)) {
                repositoryMap.set(repoKey, {
                    name: repository.name,
                    description: repository.description,
                    forkCount: repository.forkCount,
                    stargazerCount: repository.stargazerCount,
                    url: repository.url,
                    isPrivate: repository.isPrivate,
                    languageName: repository.languages.edges.length > 0 ? repository.languages.edges[0].node.name : null,
                    avatarUrl: repository.owner.avatarUrl,
                    login: repository.owner.login,
                    ownerType: repository.owner.__typename,
                    watchersCount: repository.watchers.totalCount,
                    totalCommits: contributions.totalCount,
                    lastCommit: occurredAtDates.length > 0 ? occurredAtDates[0] : null,
                });
            }

        });

        return repositoryMap;
    };

    const commitsMap = parseRepositories(commitContributionsByRepository);
    const pullRequestsMap = parseRepositories(pullRequestContributionsByRepository);

    pullRequestsMap.forEach((repo, key) => {
        if (!commitsMap.has(key)) {
            commitsMap.set(key, repo);
        }
    });

    const sortRepoMapByDate = (map: Map<string, Repository>): Repository[] => {
        return Array.from(map.values()).sort((a, b) => ((a.lastCommit ?? "") > (b.lastCommit ?? "") ? -1 : 1));
    };

    const sortedRepos = sortRepoMapByDate(commitsMap);

    return sortedRepos;
}