
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SectionHeader({
  title,
  subtitle,
  actionLabel,
  onAction,
  icon = 'arrow-forward',
}) {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>

        {subtitle ? (
          <Text style={styles.subtitle}>{subtitle}</Text>
        ) : null}
      </View>

      {actionLabel ? (
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onAction}
          activeOpacity={0.7}
        >
          <Text style={styles.actionText}>{actionLabel}</Text>

          <Ionicons
            name={icon}
            size={16}
            color="#C084FC"
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 25,
    marginBottom: 15,
    gap: 10,
  },

  titleContainer: {
    flex: 1,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '800',
  },

  subtitle: {
    color: '#A99BBE',
    fontSize: 12,
    marginTop: 5,
  },

  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 8,
    paddingLeft: 8,
  },

  actionText: {
    color: '#C084FC',
    fontSize: 12,
    fontWeight: '700',
  },
});
