// File: AIAssistant/components/ImportReportSheet/ImportReportSheet.tsx

import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../../theme';
import type { ReportOption } from '../../types/aiAssistant.types';
import { createStyles } from './styles';

interface Props {
  visible: boolean;
  reports: ReportOption[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  onConfirm: (report: ReportOption) => void;
  onClose: () => void;
}

export default function ImportReportSheet({
  visible,
  reports,
  selectedIds,
  onToggle,
  onConfirm,
  onClose,
}: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);

  const handleConfirm = () => {
    if (selectedIds.length === 0) return;
    const report = reports.find((r) => r.id === selectedIds[0]);
    if (report) onConfirm(report);
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <TouchableOpacity activeOpacity={1} style={styles.sheet}>
          <View style={styles.handle} />
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Import Report</Text>
            <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
              <Text style={styles.confirmIcon}>✓</Text>
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {reports.map((report) => {
              const isSelected = selectedIds.includes(report.id);
              return (
                <TouchableOpacity
                  key={report.id}
                  style={[styles.reportRow, isSelected && styles.reportRowSelected]}
                  onPress={() => onToggle(report.id)}
                  activeOpacity={0.75}
                >
                  <View style={styles.reportInfo}>
                    <Text style={styles.reportClinic}>{report.clinicName}</Text>
                    <Text style={styles.reportDate}>{report.date}</Text>
                  </View>
                  <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                    {isSelected && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}
