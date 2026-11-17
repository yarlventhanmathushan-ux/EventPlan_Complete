
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AppHeader({
  title = 'EventPlan',
  subtitle = '',
  showBack = false,
  onBack,
  rightIcon,
  onRightPress,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        {showBack && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBack}
            activeOpacity={0.7}
          >
            <Ionicons
              name="arrow-back"
              size={23}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        )}

        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>

          {subtitle ? (
            <Text style={styles.subtitle}>{subtitle}</Text>
          ) : null}
        </View>
      </View>

      {rightIcon ? (
        <TouchableOpacity
          style={styles.rightButton}
          onPress={onRightPress}
          activeOpacity={0.7}
        >
          <Ionicons
            name={rightIcon}
            size={22}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#251A3D',
    borderWidth: 1,
    borderColor: '#403052',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: '800',
  },
  subtitle: {
    color: '#A9A2BC',
    fontSize: 13,
    marginTop: 4,
  },
  rightButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#251A3D',
    borderWidth: 1,
    borderColor: '#403052',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
});
