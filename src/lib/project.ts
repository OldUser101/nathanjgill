import { ResolveCdnUrl } from "./cdn";

export interface Project {
    title: string,
    slug: string,
    description: string,
    banner_light: string,
    banner_dark: string,
    url: string,
    content: string,
    language: string,
    banner_light_width: number,
    banner_light_height: number,
    banner_dark_width: number,
    banner_dark_height: number
}

export function ResolveProjectCdnUrls(project: Project): Project {
    return {
        ...project,
        content: ResolveCdnUrl(project.content),
        banner_light: ResolveCdnUrl(project.banner_light),
        banner_dark: ResolveCdnUrl(project.banner_dark)
    };
}