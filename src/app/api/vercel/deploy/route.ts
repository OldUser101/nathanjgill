interface DeployData {
    status: number,
    branches: Array<{
        url: string,
        branch: string,
        created: number,
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

    const { VERCEL_DEPLOYMENTS_TOKEN, REPO_ID, GITHUB_TOKEN, VERCEL_GIT_COMMIT_REF } = process.env;

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
    // esline-disable-next-line @typescript-eslint/no-explicit-any
    const existingBranches = new Set(branchesData.map((b: any) => b.name));

    const deployRes = await fetch(`https://api.vercel.com/v6/deployments?projectId=${REPO_ID}`, {
        headers: {
            Authorization: `Bearer ${VERCEL_DEPLOYMENTS_TOKEN}`
        }
    })

    if (!deployRes.ok) {
        return Response.json({ status: 500 });
    }

    const deploymentsData = await deployRes.json();
    // esline-disable-next-line @typescript-eslint/no-explicit-any
    const deployments = deploymentsData.deployments as any[];

    const latestPerBranch: { [branch: string]: { url: string; created: number, current: boolean } } = {};

    for (const d of deployments) {
        const branch = d.meta?.githubCommitRef;
        const created = d.created;
        if (!branch || !existingBranches.has(branch)) continue;
        if (!latestPerBranch[branch] || created > latestPerBranch[branch].created) {
            if (branch === "master" || branch === "main") {
                latestPerBranch[branch] = { url: "https://nathanjgill.uk", created, current: branch === VERCEL_GIT_COMMIT_REF };
            } else {
                latestPerBranch[branch] = { url: `https://${d.url}`, created, current: branch === VERCEL_GIT_COMMIT_REF };
            }
        }
    }

    const branchLinks = Object.entries(latestPerBranch).map(([branch, { url, created, current }]) => ({
        branch,
        url,
        created,
        current
    }));

    const rData: DeployData = {
        status: 200,
        branches: branchLinks
    }

    cache = { data: rData, timestamp: now };

    return Response.json(rData);
}