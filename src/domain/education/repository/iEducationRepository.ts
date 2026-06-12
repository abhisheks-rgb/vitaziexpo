import { EducationMaterial } from "../models/educationMaterial";

export interface IEducationRepository {
  getEducationMetirals(userId: string): Promise<EducationMaterial[]>;
}
