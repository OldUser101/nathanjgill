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
  