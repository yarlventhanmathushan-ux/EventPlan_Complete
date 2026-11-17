
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function SignUpScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  function handleSignUp() {
    if (
      !fullName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert(
        'Missing Information',
        'Please fill in all the required fields.'
      );
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (password.length < 8) {
      Alert.alert(
        'Weak Password',
        'Password must contain at least 8 characters.'
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        'Password Mismatch',
        'Your passwords do not match.'
      );
      return;
    }

    if (!acceptedTerms) {
      Alert.alert(
        'Terms and Conditions',
        'Please accept the terms to continue.'
      );
      return;
    }

    Alert.alert(
      'Account Details Accepted',
      'The registration UI is ready. Real account creation will be connected later.',
      [
        {
          text: 'Continue to Login',
          onPress: () =>
            navigation.replace('Login', {
              email: email.trim(),
            }),
        },
      ]
    );
  }

  function handleBack() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.replace('Login');
    }
  }

  function handleLogin() {
    navigation.navigate('Login');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#100827" />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* HEADER */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              activeOpacity={0.8}
              onPress={handleBack}
            >
              <Ionicons name="arrow-back" size={23} color="#FFFFFF" />
            </TouchableOpacity>

            <Text style={styles.headerLabel}>CREATE ACCOUNT</Text>
          </View>

          {/* BRAND */}
          <View style={styles.brandContainer}>
            <LinearGradient
              colors={['#A64BFF', '#6938F5']}
              style={styles.logo}
            >
              <Ionicons name="calendar" size={35} color="#FFFFFF" />
              <Ionicons
                name="star"
                size={13}
                color="#FFE4FF"
                style={styles.logoStar}
              />
            </LinearGradient>

            <Text style={styles.brandName}>
              Event<Text style={styles.brandAccent}>Plan</Text>
            </Text>

            <Text style={styles.brandSubtitle}>
              Let's create something unforgettable.
            </Text>
          </View>

          {/* FORM */}
          <View style={styles.formCard}>
            <Text style={styles.title}>Join EventPlan</Text>

            <Text style={styles.description}>
              Create your account and start planning
              {'\n'}your extraordinary events.
            </Text>

            <Text style={styles.label}>Full Name *</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="person-outline"
                size={20}
                color="#C5A6F8"
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                placeholderTextColor="#8F86A6"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
                autoCorrect={false}
              />
            </View>

            <Text style={styles.label}>Email Address *</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="mail-outline"
                size={20}
                color="#C5A6F8"
              />
              <TextInput
                style={styles.input}
                placeholder="you@example.com"
                placeholderTextColor="#8F86A6"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <Text style={styles.label}>Phone Number *</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="call-outline"
                size={20}
                color="#C5A6F8"
              />
              <TextInput
                style={styles.input}
                placeholder="+94 7X XXX XXXX"
                placeholderTextColor="#8F86A6"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                maxLength={15}
              />
            </View>

            <Text style={styles.label}>Password *</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color="#C5A6F8"
              />
              <TextInput
                style={styles.input}
                placeholder="Minimum 8 characters"
                placeholderTextColor="#8F86A6"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={21}
                  color="#C5A6F8"
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Confirm Password *</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="shield-checkmark-outline"
                size={20}
                color="#C5A6F8"
              />
              <TextInput
                style={styles.input}
                placeholder="Re-enter your password"
                placeholderTextColor="#8F86A6"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                <Ionicons
                  name={
                    showConfirmPassword
                      ? 'eye-off-outline'
                      : 'eye-outline'
                  }
                  size={21}
                  color="#C5A6F8"
                />
              </TouchableOpacity>
            </View>

            {/* TERMS */}
            <TouchableOpacity
              style={styles.termsRow}
              activeOpacity={0.8}
              onPress={() => setAcceptedTerms(!acceptedTerms)}
            >
              <Ionicons
                name={acceptedTerms ? 'checkbox' : 'square-outline'}
                size={22}
                color="#C77BFF"
              />
              <Text style={styles.termsText}>
                I agree to the{' '}
                <Text style={styles.termsAccent}>Terms of Service</Text>
                {' '}and{' '}
                <Text style={styles.termsAccent}>Privacy Policy</Text>
              </Text>
            </TouchableOpacity>

            {/* SIGN UP BUTTON */}
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.buttonWrapper}
              onPress={handleSignUp}
            >
              <LinearGradient
                colors={['#7138FF', '#AC39EE', '#E744D0']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.signUpButton}
              >
                <Text style={styles.buttonText}>Create Account</Text>
                <Ionicons
                  name="arrow-forward"
                  size={21}
                  color="#FFFFFF"
                />
              </LinearGradient>
            </TouchableOpacity>

            {/* LOGIN LINK */}
            <View style={styles.loginRow}>
              <Text style={styles.loginText}>
                Already have an account?
              </Text>
              <TouchableOpacity onPress={handleLogin}>
                <Text style={styles.loginLink}> Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.footer}>
            YOUR MOMENTS. YOUR MEMORIES.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#100827',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 23,
    paddingTop: 12,
    paddingBottom: 22,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#251641',
    borderWidth: 1,
    borderColor: '#49316D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#C6A8FF',
    letterSpacing: 2,
  },
  brandContainer: {
    alignItems: 'center',
    marginTop: 17,
    marginBottom: 20,
  },
  logo: {
    width: 61,
    height: 61,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoStar: {
    position: 'absolute',
    right: 6,
    bottom: 6,
  },
  brandName: {
    fontSize: 33,
    fontWeight: '900',
    fontStyle: 'italic',
    color: '#FFFFFF',
    marginTop: 5,
  },
  brandAccent: {
    color: '#D58AFF',
  },
  brandSubtitle: {
    fontSize: 12,
    color: '#B8ADC9',
    marginTop: 5,
    textAlign: 'center',
  },
  formCard: {
    backgroundColor: '#19112F',
    borderRadius: 24,
    padding: 19,
    borderWidth: 1,
    borderColor: '#382451',
  },
  title: {
    fontSize: 25,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  description: {
    fontSize: 12,
    lineHeight: 19,
    color: '#B7A9CA',
    marginTop: 6,
    marginBottom: 15,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#E6D9F7',
    marginBottom: 7,
    marginTop: 4,
  },
  inputContainer: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#251B3F',
    borderWidth: 1,
    borderColor: '#493363',
    borderRadius: 13,
    paddingHorizontal: 12,
    gap: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 12,
    paddingVertical: 11,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    marginTop: 5,
    marginBottom: 17,
  },
  termsText: {
    flex: 1,
    color: '#D5C9E7',
    fontSize: 11,
    lineHeight: 18,
  },
  termsAccent: {
    color: '#D58AFF',
    fontWeight: '800',
  },
  buttonWrapper: {
    borderRadius: 14,
    overflow: 'hidden',
  },
  signUpButton: {
    height: 53,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 19,
  },
  loginText: {
    color: '#B8ADC9',
    fontSize: 12,
  },
  loginLink: {
    color: '#D58AFF',
    fontSize: 12,
    fontWeight: '900',
  },
  footer: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.2,
    textAlign: 'center',
    color: '#8F7CA8',
    marginTop: 18,
  },
});
