export function ResolveCdnUrl(url: string): string {
    const cdnBase = process.env.CDN_URL || '';
    return url.replace(/^cdn:\/\//, cdnBase.endsWith('/') ? cdnBase : cdnBase + '/');
}