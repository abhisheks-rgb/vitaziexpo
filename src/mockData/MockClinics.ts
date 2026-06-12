import { AppImages } from '../constants';
import { Clinic } from '../infrastructure/Clinic/model/clinic';

// ─── Mock data ─────────────────────────────────────────────────────────────────

export const mockClinics: Clinic[] = [
  {
    id: '1',
    name: 'OptiCore Medical Center',
    address: '3517 W. Gray St. Utica, Pennsylvania 57867',
    icon: AppImages.clinicVector,
    visits: [
      { id: 'v1', date: 'Monday Jan 20, 2020', image: AppImages.retinalImage },
      { id: 'v2', date: 'Wednesday Dec 26, 2019', image: AppImages.retinalImage },
      { id: 'v3', date: 'Wednesday Dec 26, 2019', image: AppImages.retinalImage },
      { id: 'v4', date: 'Monday Jan 20, 2020', image: AppImages.retinalImage },
      { id: 'v5', date: 'Wednesday Dec 26, 2019', image: AppImages.retinalImage },
      { id: 'v6', date: 'Monday Jan 20, 2020', image: AppImages.retinalImage },
    ],
  },
  {
    id: '2',
    name: 'Metropolitan Eye Care',
    address: '1901 Thornridge Cir. Shiloh, Hawaii 81063',
    icon: AppImages.clinicVector,
    visits: [
      { id: 'v1', date: 'Monday Jan 20, 2020', image: AppImages.retinalImage },
      { id: 'v2', date: 'Wednesday Dec 26, 2019', image: AppImages.retinalImage },
    ],
  },
  {
    id: '3',
    name: 'Macula & Retina Center',
    address: '3891 Ranchview Dr. Richardson, California 62639',
    icon: AppImages.clinicVector,
    visits: [{ id: 'v1', date: 'Monday Jan 20, 2020', image: AppImages.retinalImage }],
  },
  {
    id: '4',
    name: 'National Ophthalmology Center',
    address: '2972 Westheimer Rd. Santa Ana, Illinois 85486',
    icon: AppImages.clinicVector,
    visits: [],
  },
  {
    id: '5',
    name: 'Comprehensive Eye Associates',
    address: '2118 Thornridge Cir. Syracuse, Connecticut 35624',
    icon: AppImages.clinicVector,
    visits: [],
  },
  {
    id: '6',
    name: 'United Vision Hospital',
    address: '6391 Elgin St. Celina, Delaware 10299',
    icon: AppImages.clinicVector,
    visits: [],
  },
];
