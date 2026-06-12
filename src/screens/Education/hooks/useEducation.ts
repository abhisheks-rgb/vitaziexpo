// File: Education/hooks/useEducation.ts

import { useState } from 'react';


import { EducationMaterial } from '../../../domain/education/models/educationMaterial';
import { ViewMode } from '../../../application/education/types/education.types';
import { mockEducationList } from '../../../mockData/mockEducation';

export function useEducation() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showImages, setShowImages] = useState(true);
  const [selectedMaterial, setSelectedMaterial] = useState<EducationMaterial | null>(null);

  const materials = mockEducationList;

  return {
    viewMode,
    setViewMode,
    showImages,
    setShowImages,
    selectedMaterial,
    setSelectedMaterial,
    materials,
  };
}
