// File: AIAssistant/components/ChooseFilesSheet/ChooseFilesSheet.tsx

import { useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

import AppImage from '../../../../components/AppImage';
import { useTheme } from '../../../../theme';
import type { PhotoOption } from '../../types/aiAssistant.types';

import { createStyles, PHOTO_SIZE } from './styles';

interface Props {
  visible: boolean;
  photos: PhotoOption[];
  onConfirm: (ids: string[]) => void;
  onClose: () => void;
}

export default function ChooseFilesSheet({ visible, photos, onConfirm, onClose }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <TouchableOpacity activeOpacity={1} style={styles.sheet}>
          <View style={styles.handle} />
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Choose files</Text>
            <TouchableOpacity
              style={styles.confirmBtn}
              onPress={() => {
                onConfirm(selectedIds);
                setSelectedIds([]);
              }}
            >
              <Text style={styles.confirmIcon}>✓</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.permissionText}>
            You have given Vision access to only a select number of photos.{' '}
            <Text style={styles.permissionLink}>Manage</Text> more.
          </Text>
          <View style={styles.grid}>
            {photos.map((photo) => {
              const isSelected = selectedIds.includes(photo.id);
              return (
                <TouchableOpacity
                  key={photo.id}
                  style={[styles.photoWrap, isSelected && styles.photoSelected]}
                  onPress={() => toggle(photo.id)}
                  activeOpacity={0.8}
                >
                  <AppImage
                    source={photo.source}
                    containerStyle={{ width: PHOTO_SIZE, height: PHOTO_SIZE }}
                    contentFit="cover"
                    showLoader={false}
                  />
                  {isSelected && (
                    <View style={styles.selectedBadge}>
                      <Text style={styles.selectedBadgeText}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}
