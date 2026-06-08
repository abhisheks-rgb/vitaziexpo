// File: Education/types/education.types.ts

export type MaterialType = 'video' | 'pdf' | 'doc';
export type ViewMode = 'list' | 'grid';

export interface EducationMaterial {
  id: string;
  type: MaterialType;
  title: string;
  description: string;
  date: string;
  duration?: string; // e.g. "10:12" for video, "12 mins 45 secs" for doc
  thumbnailSource: any;
  resourceUrl?: string;
  fileName?: string; // for pdf/doc cards
}
