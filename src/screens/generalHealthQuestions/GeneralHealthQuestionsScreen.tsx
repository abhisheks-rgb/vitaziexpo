import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTranslation } from '../../hooks/useTranslation';
import { GeneralHealthQuestionsScreenProps } from '../../navigation/types';
import { useSubmitHealthQuestionnaire } from '../../state/queries/UseHealthQuestionnaire';
import { useAuthStore } from '../../state/store/authStore';
import { useUIStore } from '../../state/store/uiStore';
import { useTheme } from '../../theme';

import { createStyles } from './GeneralHealthQuestions.styles';
import { questions } from './data';

type Answers = Record<string, string>;

// ── RadioOption ───────────────────────────────────────────────────────────────

interface RadioOptionProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  styles: ReturnType<typeof createStyles>;
}

function RadioOption({ label, selected, onPress, styles }: RadioOptionProps) {
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

// ── QuestionCard ──────────────────────────────────────────────────────────────

interface QuestionCardProps {
  questionId: string;
  questionText: string;
  options: string[];
  selectedOption: string | undefined;
  onSelect: (questionId: string, option: string) => void;
  styles: ReturnType<typeof createStyles>;
}

function QuestionCard({
  questionId,
  questionText,
  options,
  selectedOption,
  onSelect,
  styles,
}: QuestionCardProps) {
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

// ── Screen ────────────────────────────────────────────────────────────────────

export default function GeneralHealthQuestionsScreen({
  navigation,
}: GeneralHealthQuestionsScreenProps) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { t } = useTranslation();
  const { showToast } = useUIStore();

  const currentStep = 1;
  const totalSteps = 3;

  const userId = useAuthStore((s) => s.session?.userId ?? '');
  const { mutateAsync: submitQuestionnaire, isPending } = useSubmitHealthQuestionnaire(userId);

  const strings = {
    screenTitle: t('generalHealth.screenTitle'),
    progressLabel: t('generalHealth.progress.label', { current: currentStep, total: totalSteps }),
    next: t('generalHealth.next'),
  };

  const [answers, setAnswers] = useState<Answers>({});

  const handleSelect = (questionId: string, option: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleNext = async () => {
    const requiredIds = questions.map((q) => q.id);
    const unanswered = requiredIds.filter((id) => !answers[id]);

    if (unanswered.length > 0) {
      showToast(t('generalHealth.validation.allRequired'), 'error');
      return;
    }

    try {
      await submitQuestionnaire(answers);
      // Route resolver will detect hasCompletedHealthQuestions=true on next launch.
      // For now, navigate forward to Home.
      navigation.navigate('Home');
    } catch {
      showToast(t('generalHealth.validation.submitError'), 'error');
    }
  };

  const progressFraction = currentStep / totalSteps;

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{strings.screenTitle}</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressRow}>
          <View />
          <Text style={styles.progressLabel}>{strings.progressLabel}</Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progressFraction * 100}%` }]} />
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Questions */}
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
      </ScrollView>

      {/* Next Button */}
      <View style={styles.nextButtonContainer}>
        <TouchableOpacity
          style={[styles.nextButton, isPending && { opacity: 0.6 }]}
          onPress={handleNext}
          disabled={isPending}
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel={strings.next}
        >
          <Text style={styles.nextButtonLabel}>
            {isPending ? t('generalHealth.submitting') : strings.next}
          </Text>
          {!isPending && <Text style={styles.nextButtonIcon}>{' ›'}</Text>}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
