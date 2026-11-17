
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen({
  navigation,
  onBack,
  onEditProfile,
  onSettings,
  onNotifications,
  onLogout,
  route,
}) {
  const [notificationsEnabled, setNotificationsEnabled] =
    useState(true);

  const [darkModeEnabled, setDarkModeEnabled] =
    useState(true);

  const userName = route?.params?.userName || 'Your Name';
  const userEmail =
    route?.params?.email || 'your.email@example.com';

  const goBack = () => {
    if (onBack) {
      onBack();
    } else if (navigation?.canGoBack?.()) {
      navigation.goBack();
    } else {
      navigation?.navigate?.('Home');
    }
  };

  const handleEditProfile = () => {
    if (onEditProfile) {
      onEditProfile();
    } else {
      Alert.alert(
        'Edit Profile',
        'Profile editing will be available soon.'
      );
    }
  };

  const handleSettings = () => {
    if (onSettings) {
      onSettings();
    } else {
      Alert.alert(
        'Settings',
        'More settings will be available soon.'
      );
    }
  };

  const handleNotifications = () => {
    if (onNotifications) {
      onNotifications();
    } else {
      navigation?.navigate?.('Notifications');
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            if (onLogout) {
              onLogout();
            } else if (navigation) {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            }
          },
        },
      ]
    );
  };

  const menuItems = [
    {
      icon: 'person-outline',
      title: 'Edit Profile',
      subtitle: 'Update your personal information',
      action: handleEditProfile,
    },
    {
      icon: 'settings-outline',
      title: 'Settings',
      subtitle: 'Manage your app preferences',
      action: handleSettings,
    },
    {
      icon: 'notifications-outline',
      title: 'Notifications',
      subtitle: 'Manage your alerts',
      action: handleNotifications,
    },
    {
      icon: 'shield-checkmark-outline',
      title: 'Privacy & Security',
      subtitle: 'Keep your account secure',
      action: () =>
        Alert.alert(
          'Privacy & Security',
          'Security settings will be available soon.'
        ),
    },
    {
      icon: 'help-circle-outline',
      title: 'Help & Support',
      subtitle: 'Get help with EventPlan',
      action: () =>
        Alert.alert(
          'Help & Support',
          'Support information will be available soon.'
        ),
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={goBack}
          >
            <Ionicons
              name="arrow-back"
              size={22}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>My Profile</Text>

          <TouchableOpacity
            style={styles.headerAction}
            onPress={handleEditProfile}
          >
            <Ionicons
              name="create-outline"
              size={23}
              color="#D8B4FE"
            />
          </TouchableOpacity>
        </View>

        <LinearGradient
          colors={['#6638C9', '#382064', '#24143F']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.profileCard}
        >
          <View style={styles.avatarWrapper}>
            <View style={styles.avatar}>
              <Ionicons
                name="person"
                size={54}
                color="#D8B4FE"
              />
            </View>

            <TouchableOpacity
              style={styles.cameraButton}
              onPress={handleEditProfile}
            >
              <Ionicons
                name="camera"
                size={17}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.userName}>{userName}</Text>

          <Text style={styles.userEmail}>{userEmail}</Text>

          <View style={styles.memberBadge}>
            <Ionicons
              name="sparkles"
              size={14}
              color="#FDE68A"
            />
            <Text style={styles.memberText}>
              EventPlan Member
            </Text>
          </View>

          <TouchableOpacity
            style={styles.editProfileButton}
            onPress={handleEditProfile}
          >
            <Ionicons
              name="create-outline"
              size={17}
              color="#FFFFFF"
            />
            <Text style={styles.editProfileText}>
              Edit Profile
            </Text>
          </TouchableOpacity>
        </LinearGradient>

        <Text style={styles.sectionTitle}>Your Activity</Text>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <LinearGradient
              colors={['#8B5CF6', '#6D28D9']}
              style={styles.statIcon}
            >
              <Ionicons
                name="calendar"
                size={20}
                color="#FFFFFF"
              />
            </LinearGradient>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Events</Text>
          </View>

          <View style={styles.statCard}>
            <LinearGradient
              colors={['#EC4899', '#BE185D']}
              style={styles.statIcon}
            >
              <Ionicons
                name="people"
                size={20}
                color="#FFFFFF"
              />
            </LinearGradient>
            <Text style={styles.statNumber}>248</Text>
            <Text style={styles.statLabel}>Guests</Text>
          </View>

          <View style={styles.statCard}>
            <LinearGradient
              colors={['#06B6D4', '#0E7490']}
              style={styles.statIcon}
            >
              <Ionicons
                name="checkmark-done"
                size={20}
                color="#FFFFFF"
              />
            </LinearGradient>
            <Text style={styles.statNumber}>36</Text>
            <Text style={styles.statLabel}>Tasks Done</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Preferences</Text>

        <View style={styles.preferencesCard}>
          <View style={styles.preferenceRow}>
            <View style={styles.menuIconBox}>
              <Ionicons
                name="notifications-outline"
                size={21}
                color="#C4B5FD"
              />
            </View>

            <View style={styles.preferenceText}>
              <Text style={styles.menuTitle}>
                Push Notifications
              </Text>
              <Text style={styles.menuSubtitle}>
                Receive event reminders
              </Text>
            </View>

            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{
                false: '#3F3555',
                true: '#8B5CF6',
              }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.separator} />

          <View style={styles.preferenceRow}>
            <View style={styles.menuIconBox}>
              <Ionicons
                name="moon-outline"
                size={21}
                color="#C4B5FD"
              />
            </View>

            <View style={styles.preferenceText}>
              <Text style={styles.menuTitle}>
                Dark Appearance
              </Text>
              <Text style={styles.menuSubtitle}>
                Choose your appearance preference
              </Text>
            </View>

            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{
                false: '#3F3555',
                true: '#8B5CF6',
              }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Account</Text>

        <View style={styles.menuCard}>
          {menuItems.map((item, index) => (
            <React.Fragment key={item.title}>
              <TouchableOpacity
                style={styles.menuRow}
                onPress={item.action}
                activeOpacity={0.7}
              >
                <View style={styles.menuIconBox}>
                  <Ionicons
                    name={item.icon}
                    size={22}
                    color="#C4B5FD"
                  />
                </View>

                <View style={styles.menuText}>
                  <Text style={styles.menuTitle}>
                    {item.title}
                  </Text>
                  <Text style={styles.menuSubtitle}>
                    {item.subtitle}
                  </Text>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={19}
                  color="#817393"
                />
              </TouchableOpacity>

              {index < menuItems.length - 1 && (
                <View style={styles.separator} />
              )}
            </React.Fragment>
          ))}
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Ionicons
            name="log-out-outline"
            size={21}
            color="#F87171"
          />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>
          EventPlan · Version 1.0.0
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#100827',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 35,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  backButton: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: '#211536',
    borderWidth: 1,
    borderColor: '#35264D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '700',
  },
  headerAction: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: '#211536',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileCard: {
    alignItems: 'center',
    paddingVertical: 27,
    paddingHorizontal: 20,
    borderRadius: 27,
    borderWidth: 1,
    borderColor: '#7650B6',
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    width: 105,
    height: 105,
    borderRadius: 53,
    backgroundColor: '#38245A',
    borderWidth: 3,
    borderColor: '#C4B5FD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#A855F7',
    borderWidth: 3,
    borderColor: '#382064',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: '800',
    marginBottom: 6,
  },
  userEmail: {
    color: '#D6C9E9',
    fontSize: 14,
  },
  memberBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#49336A',
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 20,
    marginTop: 15,
  },
  memberText: {
    color: '#FDE68A',
    fontSize: 12,
    fontWeight: '700',
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#8B5CF6',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 13,
    marginTop: 20,
  },
  editProfileText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    marginTop: 28,
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#19112F',
    borderWidth: 1,
    borderColor: '#302344',
    borderRadius: 19,
    paddingVertical: 17,
  },
  statIcon: {
    width: 43,
    height: 43,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statNumber: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '800',
  },
  statLabel: {
    color: '#A99BBE',
    fontSize: 11,
    marginTop: 5,
  },
  preferencesCard: {
    backgroundColor: '#19112F',
    borderWidth: 1,
    borderColor: '#302344',
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  preferenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 12,
  },
  preferenceText: {
    flex: 1,
  },
  menuCard: {
    backgroundColor: '#19112F',
    borderWidth: 1,
    borderColor: '#302344',
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 12,
  },
  menuIconBox: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: '#2B2042',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuText: {
    flex: 1,
  },
  menuTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  menuSubtitle: {
    color: '#A99BBE',
    fontSize: 11,
    marginTop: 5,
  },
  separator: {
    height: 1,
    backgroundColor: '#302344',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#2B172D',
    borderWidth: 1,
    borderColor: '#663044',
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 25,
  },
  logoutText: {
    color: '#F87171',
    fontSize: 15,
    fontWeight: '800',
  },
  versionText: {
    color: '#716381',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 22,
  },
});
