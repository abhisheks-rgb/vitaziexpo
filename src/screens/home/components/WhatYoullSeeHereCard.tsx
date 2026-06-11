import { TouchableOpacity, View } from 'react-native';
import AppText from '../../../components/AppText';
import Card from '../../../components/Card';
import { useTranslation } from '../../../hooks/useTranslation';
import { useTheme } from '../../../theme';
import { Spacing } from '../../../theme/spacing';

export default function WhatYoullSeeHereCard({ navigation }: { navigation: any }) {
  const theme = useTheme();
  const { t } = useTranslation();

  const items = [
    {
      emoji: '📄',
      title: t('home.whatYoullSee.reportsTitle'),
      desc: t('home.whatYoullSee.reportsDesc'),
      bg: '#EEF0FF',
    },
    {
      emoji: '🧠',
      title: t('home.whatYoullSee.aiTitle'),
      desc: t('home.whatYoullSee.aiDesc'),
      bg: '#E8F8EE',
    },
    {
      emoji: '📅',
      title: t('home.whatYoullSee.apptsTitle'),
      desc: t('home.whatYoullSee.apptsDesc'),
      bg: '#FFF0EC',
    },
  ];

  return (
    <Card elevated style={{ padding: Spacing.md, marginBottom: Spacing.md }}>
      <AppText variant="subtitle" style={{ fontSize: 16, fontWeight: '700', marginBottom: 12 }}>
        {t('home.whatYoullSeeTitle')}
      </AppText>
      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 12,
            borderBottomWidth: index < items.length - 1 ? 1 : 0,
            borderBottomColor: theme.colors.border,
            gap: 12,
          }}
        >
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              backgroundColor: item.bg,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AppText style={{ fontSize: 18 }}>{item.emoji}</AppText>
          </View>
          <View style={{ flex: 1 }}>
            <AppText style={{ fontWeight: '700', fontSize: 14, color: theme.colors.text }}>
              {item.title}
            </AppText>
            <AppText style={{ fontSize: 12, color: theme.colors.textSecondary }}>
              {item.desc}
            </AppText>
          </View>
          <AppText style={{ color: theme.colors.textSecondary, fontSize: 18 }}>›</AppText>
        </TouchableOpacity>
      ))}
    </Card>
  );
}
