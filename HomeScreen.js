
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useEvents } from '../context/EventContext';

const categories = [
  { name: 'Wedding', icon: 'heart', color: '#FF6B9D' },
  { name: 'Birthday', icon: 'gift', color: '#A78BFA' },
  { name: 'Party', icon: 'musical-notes', color: '#FBBF24' },
  { name: 'Meeting', icon: 'people', color: '#60A5FA' },
];

export default function HomeScreen({ navigation, route }) {
  const userName = route?.params?.userName || 'Mat';
  const { events } = useEvents();

  function handleCreateEvent() {
    navigation.navigate('CreateEvent');
  }

  function handleEventPress(event) {
    navigation.navigate('EventDetails', { event });
  }

  function handleNotifications() {
    navigation.navigate('Notifications');
  }

  function handleProfile() {
    navigation.navigate('Profile');
  }

  function handleSeeAll(type) {
    if (type === 'events' || type === 'categories') {
      navigation.navigate('Calendar');
    }
  }

  function handleCategoryPress(category) {
    navigation.navigate('Calendar', { category });
  }

  function handleTabPress(tab) {
    switch (tab) {
      case 'Home':
        navigation.navigate('Home');
        break;
      case 'My Events':
      case 'Calendar':
        navigation.navigate('Calendar');
        break;
      case 'More':
        navigation.navigate('Profile');
        break;
      default:
        break;
    }
  }

  const totalGuests = events.reduce(
    (total, event) =>
      total + (Number(event.guestCount ?? event.guests) || 0),
    0
  );

  const tasksDone = events.reduce(
    (total, event) => total + (Number(event.tasksDone) || 0),
    0
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#130D26" />

      <LinearGradient
        colors={['#130D26', '#21123D', '#130D26']}
        style={styles.container}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>
                HELLO, {userName.toUpperCase()} 👋
              </Text>
              <Text style={styles.headerTitle}>
                Plan your perfect event
              </Text>
            </View>

            <View style={styles.headerActions}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={handleNotifications}
              >
                <Ionicons
                  name="notifications-outline"
                  size={23}
                  color="#FFFFFF"
                />
                <View style={styles.notificationDot} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.profileButton}
                onPress={handleProfile}
              >
                <Ionicons name="person" size={22} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Hero Card */}
          <LinearGradient
            colors={['#8B5CF6', '#EC4899']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroCard}
          >
            <View style={styles.heroTextContainer}>
              <Text style={styles.heroSmallText}>
                MAKE IT MEMORABLE
              </Text>

              <Text style={styles.heroTitle}>
                Every event{'\n'}starts with a plan.
              </Text>

              <Text style={styles.heroDescription}>
                Bring your special moments to life.
              </Text>

              <TouchableOpacity
                style={styles.createButton}
                onPress={handleCreateEvent}
                activeOpacity={0.8}
              >
                <Ionicons
                  name="add-circle"
                  size={20}
                  color="#7C3AED"
                />
                <Text style={styles.createButtonText}>
                  Create Event
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.heroIconCircle}>
              <Ionicons
                name="calendar"
                size={65}
                color="#FFFFFF"
              />
              <Ionicons
                name="sparkles"
                size={26}
                color="#FFE4F1"
                style={styles.sparkleIcon}
              />
            </View>
          </LinearGradient>

          {/* Statistics */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <View
                style={[
                  styles.statIcon,
                  { backgroundColor: '#39235C' },
                ]}
              >
                <Ionicons
                  name="calendar-outline"
                  size={22}
                  color="#C4B5FD"
                />
              </View>
              <Text style={styles.statNumber}>
                {String(events.length).padStart(2, '0')}
              </Text>
              <Text style={styles.statLabel}>Total Events</Text>
            </View>

            <View style={styles.statCard}>
              <View
                style={[
                  styles.statIcon,
                  { backgroundColor: '#512441' },
                ]}
              >
                <Ionicons
                  name="people-outline"
                  size={22}
                  color="#F9A8D4"
                />
              </View>
              <Text style={styles.statNumber}>
                {String(totalGuests).padStart(2, '0')}
              </Text>
              <Text style={styles.statLabel}>Total Guests</Text>
            </View>

            <View style={styles.statCard}>
              <View
                style={[
                  styles.statIcon,
                  { backgroundColor: '#193C46' },
                ]}
              >
                <Ionicons
                  name="checkmark-circle-outline"
                  size={22}
                  color="#67E8F9"
                />
              </View>
              <Text style={styles.statNumber}>
                {String(tasksDone).padStart(2, '0')}
              </Text>
              <Text style={styles.statLabel}>Tasks Done</Text>
            </View>
          </View>

          {/* Categories */}
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>
                Explore Categories
              </Text>
              <Text style={styles.sectionSubtitle}>
                Find the perfect event type
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => handleSeeAll('categories')}
            >
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.name}
                style={styles.categoryCard}
                onPress={() => handleCategoryPress(category.name)}
                activeOpacity={0.75}
              >
                <View
                  style={[
                    styles.categoryIcon,
                    { backgroundColor: `${category.color}25` },
                  ]}
                >
                  <Ionicons
                    name={category.icon}
                    size={27}
                    color={category.color}
                  />
                </View>

                <Text style={styles.categoryName}>
                  {category.name}
                </Text>

                <Ionicons
                  name="arrow-forward"
                  size={16}
                  color="#A79ABF"
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Upcoming Events */}
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>
                Upcoming Events
              </Text>
              <Text style={styles.sectionSubtitle}>
                Your special moments are coming
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => handleSeeAll('events')}
            >
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>

          {events.length === 0 ? (
            <View style={styles.emptyEvents}>
              <Ionicons
                name="calendar-outline"
                size={38}
                color="#A78BFA"
              />
              <Text style={styles.emptyTitle}>
                No events yet
              </Text>
              <Text style={styles.emptyDescription}>
                Create your first event to see it here.
              </Text>

              <TouchableOpacity
                style={styles.emptyCreateButton}
                onPress={handleCreateEvent}
              >
                <Text style={styles.emptyCreateButtonText}>
                  Create Event
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            events.map((event) => {
              const eventColor =
                event.color ||
                (event.category === 'Wedding'
                  ? '#FF6B9D'
                  : event.category === 'Party'
                  ? '#FBBF24'
                  : '#A78BFA');

              return (
                <TouchableOpacity
                  key={String(event.id)}
                  style={styles.eventCard}
                  onPress={() => handleEventPress(event)}
                  activeOpacity={0.8}
                >
                  <View
                    style={[
                      styles.eventColorBar,
                      { backgroundColor: eventColor },
                    ]}
                  />

                  <View
                    style={[
                      styles.eventIconBox,
                      { backgroundColor: `${eventColor}25` },
                    ]}
                  >
                    <Ionicons
                      name="calendar"
                      size={27}
                      color={eventColor}
                    />
                  </View>

                  <View style={styles.eventDetails}>
                    <Text style={styles.eventCategory}>
                      {event.category ||
                        event.eventType ||
                        event.type ||
                        'Event'}
                    </Text>

                    <Text style={styles.eventTitle}>
                      {event.title || event.eventName || 'My Event'}
                    </Text>

                    <View style={styles.eventInfoRow}>
                      <Ionicons
                        name="calendar-outline"
                        size={14}
                        color="#B8A9D1"
                      />
                      <Text style={styles.eventInfo}>
                        {event.date || 'Date not set'}
                      </Text>

                      <Ionicons
                        name="time-outline"
                        size={14}
                        color="#B8A9D1"
                        style={{ marginLeft: 10 }}
                      />
                      <Text style={styles.eventInfo}>
                        {event.time || 'Time not set'}
                      </Text>
                    </View>

                    <View style={styles.eventInfoRow}>
                      <Ionicons
                        name="location-outline"
                        size={14}
                        color="#B8A9D1"
                      />
                      <Text style={styles.eventInfo}>
                        {event.location || 'Location not set'}
                      </Text>
                    </View>
                  </View>

                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color="#A79ABF"
                  />
                </TouchableOpacity>
              );
            })
          )}

          {/* Quick Create */}
          <TouchableOpacity
            style={styles.quickCreate}
            onPress={handleCreateEvent}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#7C3AED', '#DB2777']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.quickCreateGradient}
            >
              <Ionicons
                name="add-circle-outline"
                size={26}
                color="#FFFFFF"
              />
              <Text style={styles.quickCreateText}>
                Create a New Event
              </Text>
              <Ionicons
                name="arrow-forward"
                size={22}
                color="#FFFFFF"
              />
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.bottomSpace} />
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => handleTabPress('Home')}
          >
            <Ionicons
              name="home"
              size={23}
              color="#D8B4FE"
            />
            <Text style={[styles.tabText, styles.activeTabText]}>
              Home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => handleTabPress('My Events')}
          >
            <Ionicons
              name="albums-outline"
              size={23}
              color="#8F82A8"
            />
            <Text style={styles.tabText}>My Events</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => handleTabPress('Calendar')}
          >
            <Ionicons
              name="calendar-outline"
              size={23}
              color="#8F82A8"
            />
            <Text style={styles.tabText}>Calendar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => handleTabPress('More')}
          >
            <Ionicons
              name="menu-outline"
              size={23}
              color="#8F82A8"
            />
            <Text style={styles.tabText}>More</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#130D26',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    color: '#C4B5FD',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 7,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '800',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconButton: {
    width: 43,
    height: 43,
    borderRadius: 15,
    backgroundColor: '#291B43',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F472B6',
    position: 'absolute',
    top: 9,
    right: 10,
  },
  profileButton: {
    width: 43,
    height: 43,
    borderRadius: 15,
    backgroundColor: '#6D28D9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroCard: {
    minHeight: 225,
    borderRadius: 27,
    padding: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    marginBottom: 22,
  },
  heroTextContainer: {
    flex: 1,
    paddingRight: 5,
  },
  heroSmallText: {
    color: '#FCE7F3',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.4,
    marginBottom: 12,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 25,
    lineHeight: 31,
    fontWeight: '900',
  },
  heroDescription: {
    color: '#FCE7F3',
    fontSize: 11,
    marginTop: 10,
    marginBottom: 16,
  },
  createButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderRadius: 13,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  createButtonText: {
    color: '#6D28D9',
    fontWeight: '800',
    fontSize: 12,
  },
  heroIconCircle: {
    width: 85,
    height: 85,
    borderRadius: 28,
    backgroundColor: '#FFFFFF25',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  sparkleIcon: {
    position: 'absolute',
    top: -12,
    right: -7,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 29,
  },
  statCard: {
    flex: 1,
    minHeight: 125,
    padding: 12,
    borderRadius: 19,
    backgroundColor: '#211735',
    borderWidth: 1,
    borderColor: '#39284F',
  },
  statIcon: {
    width: 38,
    height: 38,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 11,
  },
  statNumber: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
  },
  statLabel: {
    color: '#B8A9D1',
    fontSize: 10,
    marginTop: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 2,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  sectionSubtitle: {
    color: '#A99BBF',
    fontSize: 11,
    marginTop: 5,
  },
  seeAll: {
    color: '#D8B4FE',
    fontSize: 12,
    fontWeight: '800',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 28,
    gap: 10,
  },
  categoryCard: {
    width: '48%',
    minHeight: 80,
    borderRadius: 18,
    backgroundColor: '#211735',
    borderWidth: 1,
    borderColor: '#39284F',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryName: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    flex: 1,
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#211735',
    borderWidth: 1,
    borderColor: '#39284F',
    borderRadius: 20,
    padding: 13,
    marginBottom: 12,
    overflow: 'hidden',
    gap: 11,
  },
  eventColorBar: {
    width: 4,
    alignSelf: 'stretch',
    borderRadius: 4,
  },
  eventIconBox: {
    width: 48,
    height: 48,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventDetails: {
    flex: 1,
  },
  eventCategory: {
    color: '#C4B5FD',
    fontSize: 10,
    fontWeight: '800',
    marginBottom: 4,
  },
  eventTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 8,
  },
  eventInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    flexWrap: 'wrap',
  },
  eventInfo: {
    color: '#B8A9D1',
    fontSize: 10,
    marginLeft: 5,
  },
  emptyEvents: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
    marginBottom: 15,
    borderRadius: 20,
    backgroundColor: '#211735',
    borderWidth: 1,
    borderColor: '#39284F',
  },
  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    marginTop: 12,
  },
  emptyDescription: {
    color: '#B8A9D1',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 7,
  },
  emptyCreateButton: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 15,
  },
  emptyCreateButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 12,
  },
  quickCreate: {
    borderRadius: 17,
    overflow: 'hidden',
    marginTop: 10,
  },
  quickCreateGradient: {
    minHeight: 57,
    paddingHorizontal: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quickCreateText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    flex: 1,
    marginLeft: 12,
  },
  bottomSpace: {
    height: 15,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 10,
    backgroundColor: '#190F2B',
    borderTopWidth: 1,
    borderTopColor: '#39284F',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  tabText: {
    color: '#8F82A8',
    fontSize: 10,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#D8B4FE',
    fontWeight: '800',
  },
});
