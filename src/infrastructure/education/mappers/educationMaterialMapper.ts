import { MaterialType } from '../../../application/education/types/education.types';
import { EducationMaterial } from '../../../domain/education/models/educationMaterial';
import { EducationMaterialDTO } from '../dtos/educationMaterialDto';

export const EducationMaterialMapper = {
  toDomain(dto: EducationMaterialDTO): EducationMaterial {
    return {
        id: dto.id,
          type: dto.type as MaterialType,
          title: dto.title,
          description: dto.description,
          date: dto.date,
          duration: dto.duration, // e.g. "10:12" for video, "12 mins 45 secs" for doc
          thumbnailSource: dto.thumbnailSource,
          resourceUrl: dto.resourceUrl,
          fileName: dto.fileName,
    };
  },
};
