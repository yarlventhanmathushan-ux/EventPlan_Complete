
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AppInput({
  label,
  placeholder,
  value,
  onChangeText,
  icon,
  secureTextEntry = false,
  keyboardType = 'default',
  error,
  multiline = false,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = secureTextEntry;

  return (
    <View style={styles.container}>
      {label ? (
        <Text style={styles.label}>{label}</Text>
      ) : null}

      <View
        style={[
          styles.inputWrapper,
          error ? styles.inputError : null,
          multiline ? styles.multilineWrapper : null,
        ]}
      >
        {icon ? (
          <Ionicons
            name={icon}
            size={20}
            color="#A78BFA"
            style={styles.leftIcon}
          />
        ) : null}

        <TextInput
          style={[
            styles.input,
            multiline ? styles.multilineInput : null,
          ]}
          placeholder={placeholder || 'Enter here'}
          placeholderTextColor="#817393"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isPassword && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={
            keyboardType === 'email-address'
              ? 'none'
              : 'sentences'
          }
          autoCorrect={false}
          multiline={multiline}
          textAlignVertical={multiline ? 'top' : 'center'}
          selectionColor="#C084FC"
        />

        {isPassword ? (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeButton}
          >
            <Ionicons
              name={
                showPassword
                  ? 'eye-off-outline'
                  : 'eye-outline'
              }
              size={21}
              color="#A99BBE"
            />
          </TouchableOpacity>
        ) : null}
      </View>

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 18,
  },

  label: {
    color: '#E9D5FF',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 9,
  },

  inputWrapper: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#19112F',
    borderWidth: 1,
    borderColor: '#35264D',
    borderRadius: 15,
    paddingHorizontal: 15,
  },

  inputError: {
    borderColor: '#F87171',
  },

  leftIcon: {
    marginRight: 12,
  },

  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
    paddingVertical: 15,
  },

  eyeButton: {
    padding: 5,
    marginLeft: 8,
  },

  multilineWrapper: {
    alignItems: 'flex-start',
    paddingTop: 4,
  },

  multilineInput: {
    minHeight: 95,
    textAlignVertical: 'top',
  },

  errorText: {
    color: '#F87171',
    fontSize: 12,
    marginTop: 6,
  },
});
