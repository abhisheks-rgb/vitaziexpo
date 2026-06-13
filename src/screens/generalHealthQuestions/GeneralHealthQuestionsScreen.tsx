import { useRef, useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTranslation } from '../../hooks/useTranslation';
import type { GeneralHealthQuestionsScreenProps } from '../../navigation/types';
import { useSubmitHealthQuestionnaire } from '../../state/queries/UseHealthQuestionnaire';
import { useAuthStore } from '../../state/store/authStore';
import { useTheme } from '../../theme';

import { NextButton } from './components/NextButton';
import { ProgressHeader } from './components/ProgressHeader';
import { QuestionCard } from './components/QuestionCard';
import { questions } from './data';

export default function GeneralHealthQuestionsScreen(_props: GeneralHealthQuestionsScreenProps) {
  const theme = useTheme();
  const { t } = useTranslation();

  const userId = useAuthStore((s) => s.currentUser?.id ?? '');
  const setHealthQuestionsComplete = useAuthStore((s) => s.setHealthQuestionsComplete);
  const { mutateAsync: submitQuestionnaire, isPending } = useSubmitHealthQuestionnaire(userId);

  // answers keyed by question id
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [stepIndex, setStepIndex] = useState(0);
  const [error, setError] = useState('');

  // Clear error whenever the step changes
  const prevStepRef = useRef(stepIndex);
  if (prevStepRef.current !== stepIndex) {
    prevStepRef.current = stepIndex;
    if (error) {setError('');}
  }

  const totalSteps = questions.length;
  const isLastStep = stepIndex === totalSteps - 1;
  const currentQuestion = questions[stepIndex];

  const handleChange = (text: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: text }));
    if (error) {setError('');}
  };

  const handleNext = async () => {
    Keyboard.dismiss();

    const currentAnswer = (answers[currentQuestion.id] ?? '').trim();
    if (currentAnswer.length === 0) {
      setError('Please answer before continuing.');
      return;
    }

    setError('');

    if (!isLastStep) {
      setStepIndex((prev) => prev + 1);
      return;
    }

    // Last step — submit all answers
    try {
      await submitQuestionnaire(answers);
      setHealthQuestionsComplete();
    } catch (e) {
      console.error(e);
      setError('Something went wrong. Please try again.');
    }
  };

  const styles = createStyles(theme);

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'left', 'right']}>
      <ProgressHeader
        title={t('generalHealth.screenTitle')}
        currentStep={stepIndex + 1}
        totalSteps={totalSteps}
        stepLabel={t('generalHealth.progress.label', {
          current: stepIndex + 1,
          total: totalSteps,
        })}
      />

      <View style={styles.divider} />

      {/* Render only the current question */}
      <QuestionCard
        questionText={t(currentQuestion.textKey)}
        value={answers[currentQuestion.id] ?? ''}
        onChange={handleChange}
        error={error}
      />

      <NextButton
        label={isLastStep ? t('submit') : t('generalHealth.next')}
        onPress={handleNext}
        isLoading={isPending}
      />
    </SafeAreaView>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    divider: {
      height: 1,
      backgroundColor: theme.colors.border,
      marginHorizontal: theme.spacing.md,
      marginBottom: theme.spacing.md,
    },
  });
