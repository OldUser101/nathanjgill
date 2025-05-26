import { ResolveCdnUrl } from "./cdn";

export interface Resource {
  title: string;
  path: string;
}

export interface Chapter {
  chapterNumber: number;
  title: string;
  path: string;
  resources?: Resource[];
}

export interface Tutorial {
  title: string;
  slug: string;
  chapters: Chapter[];
}

export function ResolveTutorialCdnUrls(tutorial: Tutorial): Tutorial {
  return {
    ...tutorial,
    chapters: tutorial.chapters.map(chapter => ({
      ...chapter,
      path: ResolveCdnUrl(chapter.path),
      resources: chapter.resources?.map(resource => ({
        ...resource,
        path: ResolveCdnUrl(resource.path),
      })),
    })),
  };
}