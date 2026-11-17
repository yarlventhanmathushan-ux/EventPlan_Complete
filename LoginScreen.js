
import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  function handleLogin() {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password.trim()) {
      Alert.alert(
        'Missing Information',
        'Please enter your email and password.'
      );
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(cleanEmail)) {
      Alert.alert(
        'Invalid Email',
        'Please enter a valid email address.'
      );
      return;
    }

    // Demo login only. No database or real authentication.
    navigation.replace('Home', {
      userName: cleanEmail.split('@')[0] || 'Mat',
      email: cleanEmail,
      rememberMe,
    });
  }

  function handleBack() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.replace('Splash');
    }
  }

  function handleSignUp() {
    navigation.navigate('SignUp');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBack}
            >
              <Ionicons name="arrow-back" size={23} color="#FFFFFF" />
            </TouchableOpacity>

            <Text style={styles.headerLabel}>WELCOME BACK</Text>
          </View>

          <View style={styles.logoContainer}>
            <LinearGradient
              colors={['#A54AFF', '#6435EF']}
              style={styles.logo}
            >
              <Ionicons name="calendar" size={37} color="#FFFFFF" />
              <View style={styles.logoStar}>
                <Ionicons name="star" size={13} color="#FFE3FF" />
              </View>
            </LinearGradient>

            <Text style={styles.appName}>
              Event<Text style={styles.purple}>Plan</Text>
            </Text>

            <Text style={styles.subtitle}>
              Your next unforgettable event starts here.
            </Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.title}>Sign in</Text>

            <Text style={styles.description}>
              Enter your details to continue planning.
            </Text>

            <Text style={styles.label}>Email Address</Text>

            <View style={styles.inputContainer}>
              <Ionicons
                name="mail-outline"
                size={21}
                color="#BDA6E8"
              />

              <TextInput
                style={styles.input}
                placeholder="you@example.com"
                placeholderTextColor="#8F89A8"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <Text style={styles.label}>Password</Text>

            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={21}
                color="#BDA6E8"
              />

              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#8F89A8"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
              />

              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={21}
                  color="#BDA6E8"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.options}>
              <TouchableOpacity
                style={styles.remember}
                onPress={() => setRememberMe(!rememberMe)}
              >
                <Ionicons
                  name={rememberMe ? 'checkbox' : 'square-outline'}
                  size={20}
                  color="#BD78FF"
                />
                <Text style={styles.rememberText}>Remember me</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    'Forgot Password',
                    'Password recovery is not available in demo mode.'
                  )
                }
              >
                <Text style={styles.forgot}>Forgot password?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleLogin}
              style={styles.loginWrapper}
            >
              <LinearGradient
                colors={['#753BFA', '#B33BEA', '#E644D0']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.loginButton}
              >
                <Text style={styles.loginText}>Login</Text>
                <Ionicons
                  name="arrow-forward"
                  size={21}
                  color="#FFFFFF"
                />
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.line} />
              <Text style={styles.orText}>OR</Text>
              <View style={styles.line} />
            </View>

            <TouchableOpacity
              style={styles.socialButton}
              onPress={() =>
                Alert.alert(
                  'Google Sign In',
                  'Google sign-in is not connected in demo mode.'
                )
              }
            >
              <Ionicons
                name="logo-google"
                size={21}
                color="#EA4335"
              />
              <Text style={styles.socialText}>
                Continue with Google
              </Text>
            </TouchableOpacity>

            <View style={styles.signupRow}>
              <Text style={styles.signupText}>
                Don't have an account?
              </Text>

              <TouchableOpacity onPress={handleSignUp}>
                <Text style={styles.signupLink}> Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.footer}>
            PLAN BEAUTIFULLY. CELEBRATE ENDLESSLY.
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
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingTop: 12,
    paddingBottom: 22,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 17,
  },
  backButton: {
    width: 43,
    height: 43,
    borderRadius: 15,
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
  logoContainer: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 30,
  },
  logo: {
    width: 69,
    height: 69,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoStar: {
    position: 'absolute',
    right: 7,
    bottom: 7,
  },
  appName: {
    fontSize: 36,
    fontWeight: '900',
    fontStyle: 'italic',
    color: '#FFFFFF',
    marginTop: 8,
  },
  purple: {
    color: '#D58AFF',
  },
  subtitle: {
    fontSize: 12,
    color: '#B8ADC9',
    textAlign: 'center',
    marginTop: 8,
  },
  form: {
    backgroundColor: '#19112F',
    borderRadius: 25,
    padding: 21,
    borderWidth: 1,
    borderColor: '#382451',
  },
  title: {
    fontSize: 27,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  description: {
    fontSize: 12,
    color: '#B7A9CA',
    marginTop: 7,
    marginBottom: 24,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#E6D9F7',
    marginBottom: 9,
    marginTop: 7,
  },
  inputContainer: {
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#251B3F',
    borderWidth: 1,
    borderColor: '#493363',
    borderRadius: 14,
    paddingHorizontal: 14,
    gap: 11,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 13,
    paddingVertical: 13,
  },
  options: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 1,
    marginBottom: 23,
    gap: 8,
  },
  remember: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  rememberText: {
    fontSize: 11,
    color: '#D5C9E7',
  },
  forgot: {
    fontSize: 11,
    fontWeight: '700',
    color: '#D58AFF',
  },
  loginWrapper: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  loginButton: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    marginVertical: 22,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#443454',
  },
  orText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#A99BBE',
  },
  socialButton: {
    height: 51,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    borderRadius: 14,
    backgroundColor: '#241A3A',
    borderWidth: 1,
    borderColor: '#493363',
  },
  socialText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 24,
  },
  signupText: {
    color: '#B8ADC9',
    fontSize: 12,
  },
  signupLink: {
    color: '#D58AFF',
    fontSize: 12,
    fontWeight: '900',
  },
  footer: {
    textAlign: 'center',
    color: '#8F7CA8',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.1,
    marginTop: 22,
  },
});
