
export interface EducationMaterialDTO {
 id: string;
   type: String;
   title: string;
   description: string;
   date: string;
   duration?: string; // e.g. "10:12" for video, "12 mins 45 secs" for doc
   thumbnailSource: any;
   resourceUrl?: string;
   fileName?: string;
}
