
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function SplashScreen({ onFinish }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.7)).current;
  const slideAnim = useRef(new Animated.Value(25)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 70,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 900,
        useNativeDriver: true,
      }),
    ]).start();

    // Logo pulse animation
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ])
    );

    pulseLoop.start();

    // Navigate after 3 seconds
    const timer = setTimeout(() => {
      if (typeof onFinish === 'function') {
        onFinish();
      }
    }, 3000);

    return () => {
      clearTimeout(timer);
      pulseLoop.stop();
    };
  }, [fadeAnim, scaleAnim, slideAnim, pulseAnim, onFinish]);

  return (
    <LinearGradient
      colors={['#100827', '#21113F', '#35145A']}
      locations={[0, 0.55, 1]}
      style={styles.container}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="#100827"
      />

      {/* Decorative background circles */}
      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />

      <View style={styles.content}>
        {/* Animated App Logo */}
        <Animated.View
          style={[
            styles.logoWrapper,
            {
              opacity: fadeAnim,
              transform: [
                { scale: scaleAnim },
                { scale: pulseAnim },
              ],
            },
          ]}
        >
          <LinearGradient
            colors={['#C084FC', '#8B5CF6', '#6D28D9']}
            style={styles.logo}
          >
            <Ionicons
              name="calendar"
              size={57}
              color="#FFFFFF"
            />

            <View style={styles.checkBadge}>
              <Ionicons
                name="checkmark"
                size={19}
                color="#6D28D9"
              />
            </View>
          </LinearGradient>
        </Animated.View>

        {/* App Name */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
            alignItems: 'center',
          }}
        >
          <Text style={styles.appName}>
            Event<Text style={styles.nameHighlight}>Plan</Text>
          </Text>

          <Text style={styles.tagline}>
            PLAN IT. MAKE IT MEMORABLE.
          </Text>

          <View style={styles.divider} />

          <Text style={styles.description}>
            Your events, perfectly organized.
          </Text>
        </Animated.View>
      </View>

      {/* Bottom Section */}
      <Animated.View
        style={[styles.bottomSection, { opacity: fadeAnim }]}
      >
        <View style={styles.featureRow}>
          <Ionicons
            name="calendar-outline"
            size={17}
            color="#C4B5FD"
          />

          <Text style={styles.featureText}>
            Plan smarter
          </Text>

          <View style={styles.featureDot} />

          <Ionicons
            name="people-outline"
            size={17}
            color="#C4B5FD"
          />

          <Text style={styles.featureText}>
            Celebrate better
          </Text>
        </View>

        <View style={styles.loadingTrack}>
          <Animated.View
            style={[
              styles.loadingBar,
              { opacity: fadeAnim },
            ]}
          />
        </View>

        <Text style={styles.footerText}>
          MADE FOR YOUR SPECIAL MOMENTS
        </Text>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  glowTop: {
    position: 'absolute',
    top: 80,
    right: -90,
    width: 230,
    height: 230,
    borderRadius: 115,
    backgroundColor: '#7C3AED',
    opacity: 0.12,
  },

  glowBottom: {
    position: 'absolute',
    bottom: 80,
    left: -100,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: '#DB2777',
    opacity: 0.10,
  },

  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  logoWrapper: {
    marginBottom: 30,
  },

  logo: {
    width: 125,
    height: 125,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 15,
    shadowColor: '#A855F7',
    shadowOpacity: 0.45,
    shadowRadius: 25,
    shadowOffset: { width: 0, height: 10 },
  },

  checkBadge: {
    position: 'absolute',
    right: -7,
    bottom: -7,
    width: 37,
    height: 37,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    borderColor: '#8B5CF6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  appName: {
    color: '#FFFFFF',
    fontSize: 43,
    fontWeight: '900',
    letterSpacing: -1.5,
  },

  nameHighlight: {
    color: '#C084FC',
  },

  tagline: {
    color: '#D8B4FE',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 3,
    marginTop: 12,
  },

  divider: {
    width: 45,
    height: 3,
    borderRadius: 3,
    backgroundColor: '#C084FC',
    marginTop: 23,
    marginBottom: 18,
  },

  description: {
    color: '#D6C9E9',
    fontSize: 15,
    textAlign: 'center',
  },

  bottomSection: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingBottom: 40,
  },

  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 28,
  },

  featureText: {
    color: '#D6C9E9',
    fontSize: 11,
    fontWeight: '600',
  },

  featureDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#A78BFA',
    marginHorizontal: 5,
  },

  loadingTrack: {
    width: 115,
    height: 4,
    borderRadius: 4,
    backgroundColor: '#493361',
    overflow: 'hidden',
  },

  loadingBar: {
    width: '100%',
    height: '100%',
    backgroundColor: '#C084FC',
    borderRadius: 4,
  },

  footerText: {
    color: '#8F7DA8',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 2,
    marginTop: 20,
  },
});
