export interface Question {
  id: string;
  textKey: string;
  optionKeys: string[];
}

export const questions: Question[] = [
  {
    id: 'allergies',
    textKey: 'generalHealth.questions.allergies',
    optionKeys: [
      'generalHealth.options.yes',
      'generalHealth.options.no',
      'generalHealth.options.notSure',
    ],
  },
  {
    id: 'medications',
    textKey: 'generalHealth.questions.medications',
    optionKeys: ['generalHealth.options.yes', 'generalHealth.options.no'],
  },
  {
    id: 'chronicConditions',
    textKey: 'generalHealth.questions.chronicConditions',
    optionKeys: [
      'generalHealth.options.yes',
      'generalHealth.options.no',
      'generalHealth.options.notSure',
    ],
  },
  {
    id: 'recentSymptoms',
    textKey: 'generalHealth.questions.recentSymptoms',
    optionKeys: ['generalHealth.options.yes', 'generalHealth.options.no'],
  },
];
