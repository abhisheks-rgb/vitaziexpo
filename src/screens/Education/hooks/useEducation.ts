// File: Education/hooks/useEducation.ts

import { useState } from 'react';

import { EDUCATION_MATERIALS_MOCK } from '../data/education.mock';
import type { EducationMaterial, ViewMode } from '../types/education.types';

export function useEducation() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showImages, setShowImages] = useState(true);
  const [selectedMaterial, setSelectedMaterial] = useState<EducationMaterial | null>(null);

  const materials = EDUCATION_MATERIALS_MOCK;

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
