import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTranslation } from '../../hooks/useTranslation';
import type { GeneralHealthQuestionsScreenProps } from '../../navigation/types';
import { useSubmitHealthQuestionnaire } from '../../state/queries/UseHealthQuestionnaire';
import { useAuthStore } from '../../state/store/authStore';
import { useTheme } from '../../theme';

import { createStyles } from './GeneralHealthQuestions.styles';
import { questions } from './data';

type Answers = Record<string, string>;

function RadioOption({
  label,
  selected,
  onPress,
  styles,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
  styles: ReturnType<typeof createStyles>;
}) {
  return (
    <TouchableOpacity
      style={styles.optionRow}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="radio"
      accessibilityState={{ checked: selected }}
    >
      <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
        {selected && <View style={styles.radioInner} />}
      </View>
      <Text style={styles.optionText}>{label}</Text>
    </TouchableOpacity>
  );
}

function QuestionCard({
  questionId,
  questionText,
  options,
  selectedOption,
  onSelect,
  styles,
}: {
  questionId: string;
  questionText: string;
  options: string[];
  selectedOption: string | undefined;
  onSelect: (id: string, option: string) => void;
  styles: ReturnType<typeof createStyles>;
}) {
  return (
    <View style={styles.questionCard}>
      <Text style={styles.questionText}>{questionText}</Text>
      {options.map((option) => (
        <RadioOption
          key={option}
          label={option}
          selected={selectedOption === option}
          onPress={() => onSelect(questionId, option)}
          styles={styles}
        />
      ))}
    </View>
  );
}

export default function GeneralHealthQuestionsScreen(_props: GeneralHealthQuestionsScreenProps) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { t } = useTranslation();

  const userId = useAuthStore((s) => s.currentUser?.id ?? '');
  const setHealthQuestionsComplete = useAuthStore((s) => s.setHealthQuestionsComplete);
  const { mutateAsync: submitQuestionnaire, isPending } = useSubmitHealthQuestionnaire(userId);

  const [answers, setAnswers] = useState<Answers>({});
  const [error, setError] = useState('');

  const handleSelect = (questionId: string, option: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
    setError('');
  };

  const handleNext = async () => {
    const unanswered = questions.filter((q) => !answers[q.id]);
    if (unanswered.length > 0) {
      setError('Please answer all questions before continuing.');
      return;
    }
    try {
      await submitQuestionnaire(answers);
      // Update currentUser.hasCompletedHealthQuestions in store + AsyncStorage.
      // RootNavigator sees the change and swaps to App stack automatically.
      setHealthQuestionsComplete();
    } catch {
      setError('Something went wrong. Please try again.');
    }
  };

  const currentStep = 1;
  const totalSteps = 3;
  const progressFraction = currentStep / totalSteps;

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('generalHealth.screenTitle')}</Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressRow}>
          <View />
          <Text style={styles.progressLabel}>
            {t('generalHealth.progress.label', { current: currentStep, total: totalSteps })}
          </Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progressFraction * 100}%` }]} />
        </View>
      </View>

      <View style={styles.divider} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {questions.map((q) => (
          <QuestionCard
            key={q.id}
            questionId={q.id}
            questionText={t(q.textKey)}
            options={q.optionKeys.map((key) => t(key))}
            selectedOption={answers[q.id]}
            onSelect={handleSelect}
            styles={styles}
          />
        ))}
        {error ? (
          <Text style={{ color: '#DC2626', marginBottom: 12, fontSize: 13 }}>{error}</Text>
        ) : null}
      </ScrollView>

      <View style={styles.nextButtonContainer}>
        <TouchableOpacity
          style={[styles.nextButton, isPending && { opacity: 0.6 }]}
          onPress={handleNext}
          disabled={isPending}
          activeOpacity={0.85}
        >
          {isPending ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Text style={styles.nextButtonLabel}>{t('generalHealth.next')}</Text>
              <Text style={styles.nextButtonIcon}>{' ›'}</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
