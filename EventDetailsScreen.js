
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useEvents } from '../context/EventContext';

export default function EventDetailsScreen({ navigation, route }) {
  const { deleteEvent } = useEvents();

  const currentEvent = route?.params?.event || {
    id: 'demo-event',
    title: 'Birthday Celebration',
    eventName: 'Birthday Celebration',
    type: 'Birthday Party',
    eventType: 'Birthday',
    date: '15 November 2026',
    time: '6:00 PM',
    location: 'Jaffna, Sri Lanka',
    guests: 80,
    guestCount: 80,
    budget: 150000,
    spent: 45000,
    description:
      'A special birthday celebration with family and friends.',
    status: 'Planning',
  };

  const eventTitle =
    currentEvent.title || currentEvent.eventName || 'My Event';

  const eventType =
    currentEvent.type ||
    currentEvent.eventType ||
    currentEvent.category ||
    'Event';

  const guestCount =
    Number(currentEvent.guests ?? currentEvent.guestCount) || 0;

  const budget = Number(currentEvent.budget) || 0;
  const spent = Number(currentEvent.spent) || 0;
  const remaining = Math.max(budget - spent, 0);
  const progress = budget > 0 ? Math.min(spent / budget, 1) : 0;

  const formatMoney = (amount) =>
    `LKR ${Number(amount).toLocaleString('en-LK')}`;

  function goBack() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Home');
    }
  }

  function openGuests() {
    navigation.navigate('GuestList', { event: currentEvent });
  }

  function openTasks() {
    navigation.navigate('Tasks', { event: currentEvent });
  }

  function openBudget() {
    Alert.alert(
      'Expenses & Budget',
      'Budget management screen will be connected next.'
    );
  }

  function editEvent() {
    navigation.navigate('CreateEvent', {
      event: currentEvent,
      isEditing: true,
    });
  }

  function handleDeleteEvent() {
    if (
      currentEvent.id === undefined ||
      currentEvent.id === null ||
      currentEvent.id === 'demo-event'
    ) {
      Alert.alert(
        'Cannot Delete',
        'This is a demo event, not a saved event.'
      );
      return;
    }

    Alert.alert(
      'Delete Event',
      `Are you sure you want to delete "${eventTitle}"? This action cannot be undone.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteEvent(currentEvent.id);
            navigation.navigate('Home');
          },
        },
      ],
      { cancelable: true }
    );
  }

  const ActionCard = ({
    icon,
    title,
    subtitle,
    color,
    onPress,
  }) => (
    <TouchableOpacity
      style={styles.actionCard}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View
        style={[
          styles.actionIcon,
          { backgroundColor: `${color}25` },
        ]}
      >
        <Ionicons name={icon} size={23} color={color} />
      </View>

      <View style={styles.actionText}>
        <Text style={styles.actionTitle}>{title}</Text>
        <Text style={styles.actionSubtitle}>{subtitle}</Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={20}
        color="#A69BBF"
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#100827"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HERO */}
        <LinearGradient
          colors={['#6728D8', '#3D1A80', '#19112F']}
          style={styles.hero}
        >
          <View style={styles.topBar}>
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

            <Text style={styles.topTitle}>Event Details</Text>

            <TouchableOpacity
              style={styles.editButton}
              onPress={editEvent}
            >
              <Ionicons
                name="create-outline"
                size={21}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.eventIcon}>
            <Ionicons
              name="sparkles"
              size={34}
              color="#FFFFFF"
            />
          </View>

          <Text style={styles.eventType}>{eventType}</Text>
          <Text style={styles.eventTitle}>{eventTitle}</Text>

          <View style={styles.statusBadge}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>
              {currentEvent.status || 'Planning'}
            </Text>
          </View>

          <View style={styles.dateLocation}>
            <View style={styles.detailLine}>
              <Ionicons
                name="calendar-outline"
                size={17}
                color="#E0D2FF"
              />
              <Text style={styles.detailLineText}>
                {currentEvent.date || 'Date not set'}
              </Text>
            </View>

            <View style={styles.detailLine}>
              <Ionicons
                name="time-outline"
                size={17}
                color="#E0D2FF"
              />
              <Text style={styles.detailLineText}>
                {currentEvent.time || 'Time not set'}
              </Text>
            </View>

            <View style={styles.detailLine}>
              <Ionicons
                name="location-outline"
                size={17}
                color="#E0D2FF"
              />
              <Text style={styles.detailLineText}>
                {currentEvent.location || 'Location not set'}
              </Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Event Overview</Text>

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Ionicons
                name="people-outline"
                size={23}
                color="#C084FC"
              />
              <Text style={styles.statNumber}>{guestCount}</Text>
              <Text style={styles.statLabel}>Guests</Text>
            </View>

            <View style={styles.statCard}>
              <Ionicons
                name="wallet-outline"
                size={23}
                color="#F9A8D4"
              />
              <Text style={styles.statNumber}>
                {budget > 0
                  ? `${Math.round(progress * 100)}%`
                  : '0%'}
              </Text>
              <Text style={styles.statLabel}>Budget Used</Text>
            </View>

            <View style={styles.statCard}>
              <Ionicons
                name="checkbox-outline"
                size={23}
                color="#86EFAC"
              />
              <Text style={styles.statNumber}>0/8</Text>
              <Text style={styles.statLabel}>Tasks Done</Text>
            </View>
          </View>

          {/* BUDGET */}
          <Text style={styles.sectionTitle}>Budget Summary</Text>

          <View style={styles.budgetCard}>
            <View style={styles.budgetTop}>
              <View>
                <Text style={styles.mutedLabel}>Total Budget</Text>
                <Text style={styles.budgetAmount}>
                  {formatMoney(budget)}
                </Text>
              </View>

              <View style={styles.budgetIcon}>
                <Ionicons
                  name="wallet"
                  size={24}
                  color="#C084FC"
                />
              </View>
            </View>

            <View style={styles.progressBackground}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${progress * 100}%` },
                ]}
              />
            </View>

            <View style={styles.budgetBottom}>
              <View>
                <Text style={styles.mutedLabel}>Spent</Text>
                <Text style={styles.spentAmount}>
                  {formatMoney(spent)}
                </Text>
              </View>

              <View style={styles.remainingBox}>
                <Text style={styles.mutedLabel}>Remaining</Text>
                <Text style={styles.remainingAmount}>
                  {formatMoney(remaining)}
                </Text>
              </View>
            </View>
          </View>

          {/* EVENT MANAGEMENT */}
          <Text style={styles.sectionTitle}>Manage Your Event</Text>

          <ActionCard
            icon="people-outline"
            title="Guest List"
            subtitle={`${guestCount} expected guests`}
            color="#C084FC"
            onPress={openGuests}
          />

          <ActionCard
            icon="checkbox-outline"
            title="Tasks & Checklist"
            subtitle="Track event preparation"
            color="#86EFAC"
            onPress={openTasks}
          />

          <ActionCard
            icon="wallet-outline"
            title="Expenses & Budget"
            subtitle="Manage event spending"
            color="#F9A8D4"
            onPress={openBudget}
          />

          {/* DESCRIPTION */}
          <Text style={styles.sectionTitle}>About This Event</Text>

          <View style={styles.descriptionCard}>
            <Text style={styles.descriptionText}>
              {currentEvent.description ||
                'No description has been added yet.'}
            </Text>
          </View>

          {/* EDIT BUTTON */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={editEvent}
          >
            <LinearGradient
              colors={['#9B5CFF', '#D946EF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.editEventButton}
            >
              <Ionicons
                name="create-outline"
                size={21}
                color="#FFFFFF"
              />
              <Text style={styles.editEventText}>
                Edit Event Details
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* DELETE BUTTON */}
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.deleteEventButton}
            onPress={handleDeleteEvent}
          >
            <Ionicons
              name="trash-outline"
              size={21}
              color="#FF6B81"
            />
            <Text style={styles.deleteEventText}>
              Delete Event
            </Text>
          </TouchableOpacity>

          <View style={{ height: 35 }} />
        </View>
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
    flexGrow: 1,
  },
  hero: {
    paddingTop: 48,
    paddingHorizontal: 22,
    paddingBottom: 28,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  backButton: {
    width: 43,
    height: 43,
    borderRadius: 15,
    backgroundColor: '#FFFFFF20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  editButton: {
    width: 43,
    height: 43,
    borderRadius: 15,
    backgroundColor: '#FFFFFF20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventIcon: {
    width: 70,
    height: 70,
    borderRadius: 23,
    backgroundColor: '#FFFFFF25',
    borderWidth: 1,
    borderColor: '#FFFFFF40',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 17,
  },
  eventType: {
    color: '#E9D5FF',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 7,
  },
  eventTitle: {
    color: '#FFFFFF',
    fontSize: 29,
    fontWeight: '800',
    marginBottom: 13,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF20',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#86EFAC',
    marginRight: 7,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  dateLocation: {
    marginTop: 22,
    gap: 13,
  },
  detailLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  detailLineText: {
    color: '#F3E8FF',
    fontSize: 14,
    flexShrink: 1,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    marginTop: 9,
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#19112F',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#30214C',
    paddingVertical: 17,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  statNumber: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '800',
    marginTop: 11,
  },
  statLabel: {
    color: '#A99CBE',
    fontSize: 11,
    marginTop: 5,
    textAlign: 'center',
  },
  budgetCard: {
    backgroundColor: '#19112F',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#30214C',
    padding: 19,
    marginBottom: 20,
  },
  budgetTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mutedLabel: {
    color: '#A99CBE',
    fontSize: 12,
    marginBottom: 7,
  },
  budgetAmount: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
  },
  budgetIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#9B5CFF20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBackground: {
    height: 9,
    backgroundColor: '#30214C',
    borderRadius: 10,
    marginTop: 21,
    marginBottom: 19,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#B46AFF',
    borderRadius: 10,
  },
  budgetBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  spentAmount: {
    color: '#F9A8D4',
    fontSize: 14,
    fontWeight: '700',
  },
  remainingBox: {
    alignItems: 'flex-end',
  },
  remainingAmount: {
    color: '#86EFAC',
    fontSize: 14,
    fontWeight: '700',
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#19112F',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#30214C',
    padding: 15,
    marginBottom: 11,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    flex: 1,
    marginLeft: 13,
  },
  actionTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  actionSubtitle: {
    color: '#A99CBE',
    fontSize: 12,
    marginTop: 5,
  },
  descriptionCard: {
    backgroundColor: '#19112F',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#30214C',
    padding: 17,
  },
  descriptionText: {
    color: '#D1C7E3',
    fontSize: 14,
    lineHeight: 23,
  },
  editEventButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 17,
    borderRadius: 17,
    marginTop: 20,
    gap: 10,
  },
  editEventText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  deleteEventButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 17,
    marginTop: 12,
    gap: 10,
    backgroundColor: '#2B142D',
    borderWidth: 1,
    borderColor: '#743047',
  },
  deleteEventText: {
    color: '#FF6B81',
    fontSize: 15,
    fontWeight: '800',
  },
});
