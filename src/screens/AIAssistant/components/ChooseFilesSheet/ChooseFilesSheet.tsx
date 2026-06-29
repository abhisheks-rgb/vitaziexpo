import { useState } from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';

import AppImage from '../../../../components/AppImage';
import AppText from '../../../../components/AppText';
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

  const handleConfirm = () => {
    onConfirm(selectedIds);
    setSelectedIds([]);
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <TouchableOpacity activeOpacity={1} style={styles.sheet}>
          <View style={styles.handle} />

          <View style={styles.header}>
            <AppText style={styles.headerTitle}>Choose files</AppText>
            <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
              <AppText style={styles.confirmIcon}>✓</AppText>
            </TouchableOpacity>
          </View>

          <AppText style={styles.permissionText}>
            You have given Vision access to only a select number of photos.{' '}
            <AppText style={styles.permissionLink}>Manage</AppText> more.
          </AppText>

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
                      <AppText style={styles.selectedBadgeText}>✓</AppText>
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
