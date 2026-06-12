// File: Education/data/education.mock.ts

import { AppImages } from "../constants/AppImages";
import { EducationMaterial } from "../domain/education/models/educationMaterial";



export const mockEducationList: EducationMaterial[] = [
  {
    id: '1',
    type: 'video',
    title: 'How to read your vessel metrics',
    description:
      'Understand what A/V ratio, fractal dimension, tortuosity, and vessel density mean — and what normal ranges look like for your age group.',
    date: '3 Feb 2026',
    duration: '10:12',
    thumbnailSource: AppImages.retinalImage,
    resourceUrl: 'https://www.example.com/videos/vessel-metrics',
  },
  {
    id: '2',
    type: 'pdf',
    title: 'What is a retinal screening?',
    description:
      'Learn what happens during a retinal scan, why it matters for early detection, and what to expect on your visit to the clinic.',
    date: '12 Jan 2026',
    duration: '12 mins 45 secs',
    thumbnailSource: AppImages.retinalImage,
    resourceUrl: 'https://www.example.com/docs/Retinal-screening.pdf',
    fileName: 'Retinal-screening.pdf',
  },
  {
    id: '3',
    type: 'doc',
    title: 'What are lesions and why do they matter?',
    description:
      'Bright and red lesions can be early signs of diabetic retinopathy or other retinal conditions.',
    date: '18 Jan 2026',
    duration: '12 mins 45 secs',
    thumbnailSource: AppImages.retinalImage,
    resourceUrl: 'https://www.example.com/docs/Retinal-tutorial-ai.doc',
    fileName: 'Retinal-tutorial-ai.doc',
  },
  {
    id: '4',
    type: 'video',
    title: 'Using the comparison chart over time',
    description: 'Learn what happens during a retinal scan, wh...',
    date: '15 Dec 2025',
    duration: '9:00',
    thumbnailSource: AppImages.retinalImage,
    resourceUrl: 'https://www.example.com/videos/comparison-chart',
  },
  {
    id: '5',
    type: 'video',
    title: 'Diet & habits that protect your retina',
    description: 'Understand what A/V ratio, fractal dimension, tortuosity, and vessel...',
    date: '10 Nov 2025',
    duration: '12 mins 45 secs',
    thumbnailSource: AppImages.retinalImage,
    resourceUrl: 'https://www.example.com/videos/diet-habits',
  },
  {
    id: '6',
    type: 'doc',
    title: 'Understanding your eye anatomy and basic details',
    description: 'Understand what A/V ratio, fractal dimension, tortuosity, and vessel...',
    date: '5 Oct 2025',
    duration: '12 mins 45 secs',
    thumbnailSource: AppImages.retinalImage,
    resourceUrl: 'https://www.example.com/docs/eye-anatomy.doc',
    fileName: 'eye-anatomy.doc',
  },
];
