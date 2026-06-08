// File: data/reportDetails.mock.ts

import { AppImages } from '../../../constants';
import type { ReportDetails } from '../types/reportDetails.types';

export const REPORT_DETAILS_MOCK: ReportDetails = {
  date: 'Wednesday Dec 26, 2019',

  images: [
    { id: '1', source: AppImages.retinalImage },
    { id: '2', source: AppImages.retinalImage },
    { id: '3', source: AppImages.retinalImage },
  ],

  imageEyeMap: {
    0: 'Right OD',
    1: 'Left OS',
    2: 'Left OS',
  },

  eyeReports: {
    'Right OD': {
      findings: {
        bullets: ['Microaneurysms (OD)', 'Retinal Hemorrhages (OD)', 'Hard Exudates (OD)'],
        summary:
          'OD (right) shows microaneurysms, retinal hemorrhages, and hard exudates on the recorded ophthalmic findings. No additional findings are documented for OS (left) or OU (bilateral) in the provided encounter details.',
      },
      differential: [
        {
          title: 'Nonproliferative diabetic retinopathy (OD)',
          body: 'The recorded triad of microaneurysms, retinal hemorrhages, and hard exudates is a classic retinal lesion pattern for diabetic retinopathy.',
        },
        {
          title: 'Retinal vein occlusion (OD)',
          body: 'Retinal hemorrhages and hard exudates can occur in retinal vascular occlusive disease.',
        },
      ],
      assessment: {
        insight:
          'OD findings are most consistent with nonproliferative diabetic retinopathy, as the combination of microaneurysms, retinal hemorrhages, and hard exudates matches recognized diabetic retinopathy lesion markers.',
        codes: [
          {
            code: 'E11.3291',
            label:
              'Type 2 diabetes mellitus with mild nonproliferative diabetic retinopathy without macular edema, right eye.',
          },
          {
            code: 'H34.8312',
            label: 'Tributary (branch) retinal vein occlusion, right eye, stable.',
          },
          {
            code: 'H34.8112',
            label: 'Central retinal vein occlusion, right eye, stable.',
          },
        ],
      },
      plan: {
        body: 'Retina findings OD are monitored as mild nonproliferative diabetic retinopathy without documented macular edema.',
        followUp: 'Follow-up recommended in 3 months',
        bullets: [
          'We will obtain or review a scan of the center of the retina in your right eye to check for any hidden swelling.',
          'We will continue to watch your right eye for any changes over time.',
          'Please return in 3 months for a dilated eye exam and repeat retinal imaging.',
        ],
      },
      instructions: {
        urgent:
          'Call sooner if you notice any change in your vision or if you are told there is new swelling or blood vessel changes in the right eye.',
        body: 'We found mild diabetes-related changes in the back of your right eye. There is no swelling in the center of the retina documented at this time.\n\nNext steps:\n• We will obtain or review a scan of the center of the retina in your right eye.\n• We will continue to watch your right eye for any changes over time.\n• Please return in 3 months for a dilated eye exam.',
      },
    },

    'Left OS': {
      findings: {
        bullets: ['No significant findings'],
        summary: 'OS (left) shows no significant retinal pathology documented at this encounter.',
      },
      differential: [
        {
          title: 'No differential diagnoses noted',
          body: 'No pathological findings were documented for the left eye at this encounter.',
        },
      ],
      assessment: {
        insight: 'No significant findings for the left eye.',
        codes: [],
      },
      plan: {
        body: 'No plan items for the left eye at this encounter.',
        followUp: '',
        bullets: [],
      },
      instructions: {
        urgent: '',
        body: 'No specific instructions for the left eye at this visit.',
      },
    },
  },

  careResources: [
    {
      id: '1',
      type: 'video',
      duration: '10:12',
      title: 'How to read your vessel metrics',
      desc: 'Understand what A/V ratio, fractal dimension...',
      date: '3 Feb 2026',
      thumbnailUrl: 'https://picsum.photos/seed/care1/300/200',
      resourceUrl: 'https://www.example.com/videos/vessel-metrics',
    },
    {
      id: '2',
      type: 'pdf',
      title: '5 Things You Should Know about Diabetic Eye Disease.',
      desc: 'Learn what happens during a retinal scan, wh...',
      date: '12 Jan 2026',
      thumbnailUrl: 'https://picsum.photos/seed/care2/300/200',
      resourceUrl: 'https://www.example.com/docs/Retinal-screening.pdf',
    },
    {
      id: '3',
      type: 'doc',
      title: 'What are lesions and why do they matter? (factsheet)',
      desc: 'Bright and red lesions can be early signs of diabetic...',
      date: '18 Jan 2026',
      thumbnailUrl: 'https://picsum.photos/seed/care3/300/200',
      resourceUrl: 'https://www.example.com/docs/Retinal-tutorial-ai.doc',
    },
    {
      id: '4',
      type: 'video',
      duration: '9:00',
      title: "Don't Lose Sight of Diabetic Eye Disease (factsheet)",
      desc: 'Learn what happens during a retinal scan, wh...',
      date: '15 Dec 2025',
      thumbnailUrl: 'https://picsum.photos/seed/care4/300/200',
      resourceUrl: 'https://www.example.com/videos/dont-lose-sight',
    },
  ],
};
