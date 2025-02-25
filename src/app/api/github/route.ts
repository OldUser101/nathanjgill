type GraphQLData = string;

interface Cache {
  data: GraphQLData | null;
  timestamp: number;
}

const CACHE_DURATION = 10 * 60 * 1000;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

let cache: Cache = {
    data: null,
    timestamp: 0,
};

export async function GET() {
    const now = Date.now();

    if (cache.data && now - cache.timestamp < CACHE_DURATION) {
      return Response.json(cache.data);
    }

    const query = `
query {
  viewer {
    contributionsCollection {
      commitContributionsByRepository(maxRepositories: 10) {
        contributions (first: 1) {
          totalCount
          edges {
            node {
             occurredAt 
            }
          }
        }
        repository {
          name
          description
          forkCount
          stargazerCount
          url
          isPrivate
          languages(first: 1, orderBy: { field: SIZE, direction: DESC }) {
            edges {
              node {
                name
              }
            }
          }
          owner {
            avatarUrl
            login
          }
          watchers {
    		totalCount
          }
        }
      }
      pullRequestContributionsByRepository(maxRepositories: 10) {
        contributions (first: 1) {
          totalCount
          edges {
            node {
             occurredAt 
            }
          }
        }
        repository {
          name
          description
          forkCount
          stargazerCount
          url
          isPrivate
          languages(first: 1, orderBy: { field: SIZE, direction: DESC }) {
            edges {
              node {
                name
              }
            }
          }
          owner {
            avatarUrl
            login
          }
          watchers {
    	    totalCount
          }
        }
      }
    }
  }
}
    `;
  
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    });
  
    const data: GraphQLData = await response.json();
    cache = { data, timestamp: now };

    return Response.json(data);
}