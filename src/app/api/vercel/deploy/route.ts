interface DeployData {
    status: number,
    branches: Array<{
        url: string,
        branch: string,
        current: boolean
    }>
}

interface Cache {
    data: DeployData | null;
    timestamp: number;
}

const CACHE_DURATION = 5 * 60 * 1000;
  
let cache: Cache = {
    data: null,
    timestamp: 0,
};

export async function GET() {
    const now = Date.now();

    if (cache.data && now - cache.timestamp < CACHE_DURATION) {
        return Response.json(cache.data);
    }

    const { REPO_ID, GITHUB_TOKEN, VERCEL_GIT_COMMIT_REF } = process.env;

    const branchesRes = await fetch(`https://api.github.com/repos/OldUser101/${REPO_ID}/branches`, {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github+json',
        },
    });

    if (!branchesRes.ok) {
        return Response.json({ status: 500 });
    }

    const branchesData = await branchesRes.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const existingBranches = branchesData.map((b: any) => b.name);

    const branchUrls: { [branch: string]: {url: string, current: boolean } } = {};

    for (let i: number = 0; i < existingBranches.length; i++) {
        const b = existingBranches[i];
        if (b === "master" || b === "main") {
            branchUrls[b] = { url: "https://nathanjgill.uk", current: b === VERCEL_GIT_COMMIT_REF };
        } else {
            branchUrls[b] = { url: `https://nathanjgill-git-${b}-nathanjgill.vercel.app`, current: b === VERCEL_GIT_COMMIT_REF };
        }
    }

    const branchLinks = Object.entries(branchUrls).map(([branch, { url, current }]) => ({
        branch,
        url,
        current
    }));

    const rData: DeployData = {
        status: 200,
        branches: branchLinks
    }

    cache = { data: rData, timestamp: now };

    return Response.json(rData);
}