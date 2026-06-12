import { MaterialType } from "../../../application/education/types/education.types";

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

export const emptyEducationMaterial: EducationMaterial= {
  id: "",
  type: 'video',
  title: "",
  description: "",
  date: "",
  duration: "", //
  thumbnailSource: null,
  resourceUrl: "",
  fileName: "",
}
