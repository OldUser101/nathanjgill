export interface Chapter {
    chapterNumber: number;
    title: string;
    path: string;
  }
  
  export interface Tutorial {
    title: string;
    slug: string;
    chapters: Chapter[];
  }
  