type StatData = string;

interface Cache {
    data: StatData | null;
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
{
  viewer {
    repositories(first: 100, ownerAffiliations: OWNER, isFork: false, orderBy: {field: UPDATED_AT, direction: DESC}) {
      nodes {
        name
      	diskUsage
        languages(first: 10) {
          edges {
            size
            node {
              name
            }
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

    const data: StatData = await response.json();
    cache = { data, timestamp: now };

    return Response.json(data);
}