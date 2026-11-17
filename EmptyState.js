
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function EmptyState({
  icon = 'file-tray-outline',
  title = 'Nothing here yet',
  message = 'Your items will appear here when you add them.',
}) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#28164A', '#171126']}
        style={styles.iconCircle}
      >
        <Ionicons
          name={icon}
          size={42}
          color="#D9A7FF"
        />
      </LinearGradient>

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 36,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#6941A5',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  message: {
    color: '#A9A2BC',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
  },
});

