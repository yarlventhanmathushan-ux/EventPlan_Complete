
import React, { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useEvents } from '../context/EventContext';

const eventTypes = [
  { label: 'Birthday', icon: 'gift-outline' },
  { label: 'Wedding', icon: 'heart-outline' },
  { label: 'Party', icon: 'wine-outline' },
  { label: 'Corporate', icon: 'briefcase-outline' },
  { label: 'Other', icon: 'sparkles-outline' },
];

function formatDateForInput(value) {
  if (!value) return '';

  const text = String(value).trim();

  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) {
    return text;
  }

  const match = text.match(
    /^([A-Za-z]{3,9})\s+(\d{1,2}),?\s+(\d{4})$/
  );

  if (match) {
    const parsed = new Date(
      `${match[1]} ${match[2]}, ${match[3]}`
    );

    if (!Number.isNaN(parsed.getTime())) {
      const year = parsed.getFullYear();
      const month = String(parsed.getMonth() + 1).padStart(2, '0');
      const day = String(parsed.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  }

  const parsed = new Date(text);

  if (Number.isNaN(parsed.getTime())) {
    return text;
  }

  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, '0');
  const day = String(parsed.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export default function CreateEventScreen({ navigation, route }) {
  const { addEvent, updateEvent } = useEvents();

  const existingEvent = route?.params?.event;

  const isEditing =
    route?.params?.isEditing === true && !!existingEvent;

  const [eventName, setEventName] = useState('');
  const [eventType, setEventType] = useState('Birthday');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('');
  const [guestCount, setGuestCount] = useState('50');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (!existingEvent || !isEditing) return;

    setEventName(
      existingEvent.eventName || existingEvent.title || ''
    );

    const savedType =
      existingEvent.eventType ||
      existingEvent.category ||
      'Birthday';

    setEventType(
      eventTypes.some((item) => item.label === savedType)
        ? savedType
        : 'Other'
    );

    setDate(formatDateForInput(existingEvent.date));
    setTime(existingEvent.time || '');
    setLocation(existingEvent.location || '');

    setBudget(
      existingEvent.budget !== null &&
      existingEvent.budget !== undefined
        ? String(existingEvent.budget)
        : ''
    );

    setGuestCount(
      String(
        existingEvent.guestCount ??
        existingEvent.guests ??
        50
      )
    );

    setDescription(existingEvent.description || '');
  }, [existingEvent, isEditing]);

  function handleSaveEvent() {
    if (
      !eventName.trim() ||
      !date.trim() ||
      !time.trim() ||
      !location.trim()
    ) {
      Alert.alert(
        'Missing Information',
        'Please enter the event name, date, time and location.'
      );
      return;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date.trim())) {
      Alert.alert(
        'Invalid Date',
        'Enter the date in YYYY-MM-DD format, for example 2026-12-25.'
      );
      return;
    }

    const [year, month, day] = date.trim().split('-').map(Number);
    const parsedDate = new Date(year, month - 1, day);

    if (
      Number.isNaN(parsedDate.getTime()) ||
      parsedDate.getFullYear() !== year ||
      parsedDate.getMonth() !== month - 1 ||
      parsedDate.getDate() !== day
    ) {
      Alert.alert(
        'Invalid Date',
        'Please enter a real calendar date.'
      );
      return;
    }

    const cleanTime = time.trim();

    if (
      !/^(0?[1-9]|1[0-2]):[0-5]\d\s?(AM|PM)$/i.test(cleanTime)
    ) {
      Alert.alert(
        'Invalid Time',
        'Enter time like 06:30 PM or 09:00 AM.'
      );
      return;
    }

    const guests = Number(guestCount);

    if (!Number.isInteger(guests) || guests < 1) {
      Alert.alert(
        'Invalid Guest Count',
        'Please enter at least one guest.'
      );
      return;
    }

    if (
      budget.trim() !== '' &&
      (!Number.isFinite(Number(budget)) ||
        Number(budget) < 0)
    ) {
      Alert.alert(
        'Invalid Budget',
        'Enter a valid non-negative budget.'
      );
      return;
    }

    const color =
      existingEvent?.color ||
      (eventType === 'Wedding'
        ? '#FF6B9D'
        : eventType === 'Party'
        ? '#FBBF24'
        : '#A78BFA');

    const savedEvent = {
      ...(existingEvent || {}),
      id: isEditing
        ? existingEvent.id
        : Date.now().toString(),
      title: eventName.trim(),
      eventName: eventName.trim(),
      eventType,
      category: eventType,
      date: date.trim(),
      time: cleanTime,
      location: location.trim(),
      budget: budget.trim() ? Number(budget) : null,
      guestCount: guests,
      guests,
      description: description.trim(),
      color,
      status: isEditing
        ? existingEvent.status || 'Upcoming'
        : 'Upcoming',
    };

    if (isEditing) {
      Alert.alert(
        'Save Changes',
        'Do you want to save the changes to this event?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Save',
            onPress: () => {
              updateEvent(savedEvent);

              navigation.replace('EventDetails', {
                event: savedEvent,
              });
            },
          },
        ]
      );

      return;
    }

    Alert.alert(
      'Create Event',
      'Do you want to create this event?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Create',
          onPress: () => {
            addEvent(savedEvent);

            navigation.replace('EventDetails', {
              event: savedEvent,
            });
          },
        },
        {
          text: 'Create & Go Home',
          onPress: () => {
            addEvent(savedEvent);
            navigation.navigate('Home');
          },
        },
      ]
    );
  }

  function handleBack() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Home');
    }
  }

  function renderInputLabel(label, required = false) {
    return (
      <Text style={styles.label}>
        {label}{required ? ' *' : ''}
      </Text>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#100827"
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBack}
            >
              <Ionicons
                name="arrow-back"
                size={22}
                color="#FFFFFF"
              />
            </TouchableOpacity>

            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>
                {isEditing ? 'Edit Event' : 'Create Event'}
              </Text>

              <Text style={styles.headerSubtitle}>
                {isEditing
                  ? 'Update your event details'
                  : "Let's make it unforgettable"}
              </Text>
            </View>

            <View style={styles.headerIcon}>
              <Ionicons
                name="sparkles"
                size={23}
                color="#D58AFF"
              />
            </View>
          </View>

          <LinearGradient
            colors={['#5525A8', '#8D35D6', '#D64BCB']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.hero}
          >
            <View style={styles.heroTextContainer}>
              <Text style={styles.heroEyebrow}>
                {isEditing ? 'UPDATE YOUR EVENT' : 'YOUR NEXT CHAPTER'}
              </Text>

              <Text style={styles.heroTitle}>
                {isEditing
                  ? 'Make your event perfect.'
                  : 'Plan something\nextraordinary.'}
              </Text>

              <Text style={styles.heroSubtitle}>
                Every great memory starts with a plan.
              </Text>
            </View>

            <Ionicons
              name={isEditing ? 'create-outline' : 'calendar'}
              size={65}
              color="#FFFFFF"
            />
          </LinearGradient>

          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon}>
              <Ionicons
                name="information-circle-outline"
                size={21}
                color="#D58AFF"
              />
            </View>

            <View>
              <Text style={styles.sectionTitle}>Event Details</Text>
              <Text style={styles.sectionSubtitle}>
                Tell us about your special occasion
              </Text>
            </View>
          </View>

          <View style={styles.card}>
            {renderInputLabel('Event Name', true)}

            <View style={styles.inputBox}>
              <Ionicons
                name="create-outline"
                size={19}
                color="#BDA6E8"
              />
              <TextInput
                style={styles.input}
                placeholder="e.g. Sarah's Birthday"
                placeholderTextColor="#8F86A6"
                value={eventName}
                onChangeText={setEventName}
              />
            </View>

            {renderInputLabel('Event Type', true)}

            <View style={styles.typeGrid}>
              {eventTypes.map((type) => {
                const selected = eventType === type.label;

                return (
                  <TouchableOpacity
                    key={type.label}
                    style={[
                      styles.typeCard,
                      selected && styles.typeCardSelected,
                    ]}
                    onPress={() => setEventType(type.label)}
                    activeOpacity={0.8}
                  >
                    <Ionicons
                      name={type.icon}
                      size={23}
                      color={selected ? '#D58AFF' : '#A99BBE'}
                    />

                    <Text
                      style={[
                        styles.typeText,
                        selected && styles.typeTextSelected,
                      ]}
                    >
                      {type.label}
                    </Text>

                    {selected && (
                      <Ionicons
                        name="checkmark-circle"
                        size={15}
                        color="#D58AFF"
                        style={styles.selectedCheck}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            {renderInputLabel('Description')}

            <View style={[styles.inputBox, styles.descriptionBox]}>
              <TextInput
                style={[styles.input, styles.descriptionInput]}
                placeholder="Describe your event and special requirements..."
                placeholderTextColor="#8F86A6"
                value={description}
                onChangeText={setDescription}
                multiline
                textAlignVertical="top"
                maxLength={500}
              />
            </View>

            <Text style={styles.characterCount}>
              {description.length}/500 characters
            </Text>
          </View>

          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon}>
              <Ionicons
                name="calendar-outline"
                size={20}
                color="#D58AFF"
              />
            </View>

            <View>
              <Text style={styles.sectionTitle}>Date & Time</Text>
              <Text style={styles.sectionSubtitle}>
                When will your event happen?
              </Text>
            </View>
          </View>

          <View style={styles.card}>
            {renderInputLabel('Event Date', true)}

            <View style={styles.inputBox}>
              <Ionicons
                name="calendar-outline"
                size={19}
                color="#BDA6E8"
              />
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#8F86A6"
                value={date}
                onChangeText={setDate}
                keyboardType="numbers-and-punctuation"
                maxLength={10}
              />
            </View>

            <Text style={styles.helperText}>
              Example: 2026-12-25
            </Text>

            {renderInputLabel('Start Time', true)}

            <View style={styles.inputBox}>
              <Ionicons
                name="time-outline"
                size={19}
                color="#BDA6E8"
              />
              <TextInput
                style={styles.input}
                placeholder="06:30 PM"
                placeholderTextColor="#8F86A6"
                value={time}
                onChangeText={setTime}
                autoCapitalize="characters"
              />
            </View>

            <Text style={styles.helperText}>
              Example: 06:30 PM
            </Text>
          </View>

          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon}>
              <Ionicons
                name="location-outline"
                size={21}
                color="#D58AFF"
              />
            </View>

            <View>
              <Text style={styles.sectionTitle}>Location</Text>
              <Text style={styles.sectionSubtitle}>
                Where will the magic happen?
              </Text>
            </View>
          </View>

          <View style={styles.card}>
            {renderInputLabel('Venue / Address', true)}

            <View style={styles.inputBox}>
              <Ionicons
                name="location-outline"
                size={19}
                color="#BDA6E8"
              />
              <TextInput
                style={styles.input}
                placeholder="Enter venue or full address"
                placeholderTextColor="#8F86A6"
                value={location}
                onChangeText={setLocation}
              />
            </View>

            <TouchableOpacity
              style={styles.mapButton}
              onPress={() =>
                Alert.alert(
                  'Map Integration',
                  'Map and location selection will be connected later.'
                )
              }
            >
              <Ionicons
                name="map-outline"
                size={18}
                color="#D58AFF"
              />
              <Text style={styles.mapButtonText}>
                Select Location on Map
              </Text>
              <Ionicons
                name="chevron-forward"
                size={17}
                color="#D58AFF"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon}>
              <Ionicons
                name="wallet-outline"
                size={21}
                color="#D58AFF"
              />
            </View>

            <View>
              <Text style={styles.sectionTitle}>Budget & Guests</Text>
              <Text style={styles.sectionSubtitle}>
                Set your event expectations
              </Text>
            </View>
          </View>

          <View style={styles.card}>
            {renderInputLabel('Estimated Budget (LKR)')}

            <View style={styles.inputBox}>
              <Text style={styles.currency}>LKR</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. 150000"
                placeholderTextColor="#8F86A6"
                value={budget}
                onChangeText={setBudget}
                keyboardType="numeric"
              />
            </View>

            {renderInputLabel('Expected Number of Guests', true)}

            <View style={styles.inputBox}>
              <Ionicons
                name="people-outline"
                size={19}
                color="#BDA6E8"
              />
              <TextInput
                style={styles.input}
                placeholder="Number of guests"
                placeholderTextColor="#8F86A6"
                value={guestCount}
                onChangeText={setGuestCount}
                keyboardType="number-pad"
              />
              <Text style={styles.guestSuffix}>Guests</Text>
            </View>
          </View>

          <View style={styles.summaryCard}>
            <Ionicons
              name="sparkles-outline"
              size={24}
              color="#D58AFF"
            />

            <View style={styles.summaryContent}>
              <Text style={styles.summaryTitle}>
                {isEditing ? 'Update your event' : 'Your event, your way'}
              </Text>
              <Text style={styles.summaryDescription}>
                {isEditing
                  ? 'Review your changes before saving the updated event details.'
                  : 'You can organise guests, tasks, payments and invitations after creating your event.'}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.buttonWrapper}
            onPress={handleSaveEvent}
          >
            <LinearGradient
              colors={['#7438FF', '#B63CEB', '#E547D0']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.createButton}
            >
              <Ionicons
                name={isEditing ? 'save-outline' : 'sparkles'}
                size={21}
                color="#FFFFFF"
              />
              <Text style={styles.createButtonText}>
                {isEditing ? 'Save Changes' : 'Create My Event'}
              </Text>
              <Ionicons
                name="arrow-forward"
                size={20}
                color="#FFFFFF"
              />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleBack}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>

          <Text style={styles.footer}>
            MADE FOR YOUR MOST UNFORGETTABLE MOMENTS
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
  flex: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
    gap: 12,
  },
  backButton: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: '#251641',
    borderWidth: 1,
    borderColor: '#49316D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 21,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#B7A9CA',
    marginTop: 4,
  },
  headerIcon: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: '#291B43',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hero: {
    minHeight: 155,
    borderRadius: 23,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 28,
    overflow: 'hidden',
  },
  heroTextContainer: {
    flex: 1,
  },
  heroEyebrow: {
    fontSize: 9,
    fontWeight: '900',
    color: '#F1D9FF',
    letterSpacing: 1.4,
    marginBottom: 9,
  },
  heroTitle: {
    fontSize: 23,
    lineHeight: 29,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  heroSubtitle: {
    fontSize: 10,
    color: '#F2DFFF',
    marginTop: 9,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    marginBottom: 14,
  },
  sectionIcon: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: '#291B43',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  sectionSubtitle: {
    fontSize: 10,
    color: '#A99BBE',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#19112F',
    borderRadius: 21,
    borderWidth: 1,
    borderColor: '#382451',
    padding: 16,
    marginBottom: 25,
  },
  label: {
    fontSize: 12,
    fontWeight: '800',
    color: '#E6D9F7',
    marginBottom: 9,
    marginTop: 8,
  },
  inputBox: {
    minHeight: 51,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 13,
    backgroundColor: '#251B3F',
    borderWidth: 1,
    borderColor: '#493363',
    borderRadius: 13,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 12,
    paddingVertical: 12,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 9,
    marginBottom: 14,
  },
  typeCard: {
    width: '31%',
    minHeight: 83,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#251B3F',
    borderWidth: 1,
    borderColor: '#493363',
    borderRadius: 14,
    padding: 8,
    gap: 7,
  },
  typeCardSelected: {
    backgroundColor: '#35204F',
    borderColor: '#C17AFF',
  },
  typeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#C4B7D7',
  },
  typeTextSelected: {
    color: '#E5C3FF',
  },
  selectedCheck: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  descriptionBox: {
    minHeight: 110,
    alignItems: 'stretch',
  },
  descriptionInput: {
    minHeight: 86,
    lineHeight: 19,
  },
  characterCount: {
    fontSize: 10,
    color: '#9285AC',
    textAlign: 'right',
    marginTop: -7,
  },
  helperText: {
    fontSize: 10,
    color: '#9285AC',
    marginTop: -7,
    marginBottom: 12,
    marginLeft: 3,
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    borderRadius: 12,
    backgroundColor: '#291B43',
    padding: 13,
    marginTop: 3,
  },
  mapButtonText: {
    flex: 1,
    color: '#D58AFF',
    fontSize: 11,
    fontWeight: '800',
  },
  currency: {
    color: '#D58AFF',
    fontSize: 11,
    fontWeight: '900',
  },
  guestSuffix: {
    color: '#A99BBE',
    fontSize: 10,
  },
  summaryCard: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
    backgroundColor: '#25183C',
    borderWidth: 1,
    borderColor: '#493363',
    borderRadius: 17,
    padding: 16,
    marginBottom: 22,
  },
  summaryContent: {
    flex: 1,
  },
  summaryTitle: {
    color: '#E7D3FF',
    fontSize: 13,
    fontWeight: '900',
    marginBottom: 6,
  },
  summaryDescription: {
    color: '#B7A9CA',
    fontSize: 11,
    lineHeight: 18,
  },
  buttonWrapper: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  createButton: {
    minHeight: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 11,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
  },
  cancelButton: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  cancelText: {
    color: '#B7A9CA',
    fontSize: 12,
    fontWeight: '700',
  },
  footer: {
    textAlign: 'center',
    fontSize: 8,
    color: '#8F7CA8',
    fontWeight: '700',
    letterSpacing: 1,
    marginTop: 7,
  },
});
