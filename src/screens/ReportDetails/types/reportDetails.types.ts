// File: types/reportDetails.types.ts

export type EyeTab = 'Right OD' | 'Left OS';
export type ContentTab = 'Findings' | 'Differential' | 'Assessment' | 'Plan' | 'Instructions';
export type ResourceType = 'video' | 'pdf' | 'doc';
export type ViewMode = 'grid' | 'list';

export interface ReportImage {
  id: string;
  source: any;
}

export interface Findings {
  bullets: string[];
  summary: string;
}

export interface Differential {
  title: string;
  body: string;
}

export interface IcdCode {
  code: string;
  label: string;
}

export interface Assessment {
  insight: string;
  codes: IcdCode[];
}

export interface Plan {
  body: string;
  followUp: string;
  bullets: string[];
}

export interface Instructions {
  urgent: string;
  body: string;
}

export interface EyeReport {
  findings: Findings;
  differential: Differential[];
  assessment: Assessment;
  plan: Plan;
  instructions: Instructions;
}

export interface CareResource {
  id: string;
  type: ResourceType;
  duration?: string;
  title: string;
  desc: string;
  date: string;
  thumbnailUrl?: string;
  resourceUrl?: string;
}

export interface ReportDetails {
  date: string;
  images: ReportImage[];
  imageEyeMap: Record<number, EyeTab>;
  eyeReports: Record<EyeTab, EyeReport>;
  careResources: CareResource[];
}
