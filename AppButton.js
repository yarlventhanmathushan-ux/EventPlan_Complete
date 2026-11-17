
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function AppButton({
  title,
  onPress,
  icon,
  variant = 'primary',
  loading = false,
  disabled = false,
}) {
  const isPrimary = variant === 'primary';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[
        styles.wrapper,
        !isPrimary && styles.secondaryWrapper,
        disabled && styles.disabled,
      ]}
    >
      <LinearGradient
        colors={
          isPrimary
            ? disabled
              ? ['#625477', '#625477']
              : ['#A855F7', '#7C3AED']
            : ['#241735', '#19112F']
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.button}
      >
        {loading ? (
          <ActivityIndicator
            color={isPrimary ? '#FFFFFF' : '#C4B5FD'}
          />
        ) : (
          <>
            {icon ? (
              <Ionicons
                name={icon}
                size={19}
                color={isPrimary ? '#FFFFFF' : '#C4B5FD'}
              />
            ) : null}

            <Text
              style={
                isPrimary
                  ? styles.primaryText
                  : styles.secondaryText
              }
            >
              {title}
            </Text>
          </>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    borderRadius: 15,
    overflow: 'hidden',
  },

  secondaryWrapper: {
    borderWidth: 1,
    borderColor: '#493361',
  },

  disabled: {
    opacity: 0.65,
  },

  button: {
    minHeight: 54,
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderRadius: 15,
  },

  primaryText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },

  secondaryText: {
    color: '#E9D5FF',
    fontSize: 15,
    fontWeight: '700',
  },
});
