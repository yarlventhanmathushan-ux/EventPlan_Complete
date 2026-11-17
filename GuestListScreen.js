
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const initialGuests = [
  { id: '1', name: 'Arun Kumar', email: 'arun@gmail.com', status: 'Confirmed' },
  { id: '2', name: 'Priya S', email: 'priya@gmail.com', status: 'Pending' },
  { id: '3', name: 'Kavin Raj', email: 'kavin@gmail.com', status: 'Confirmed' },
  { id: '4', name: 'Nisha Devi', email: 'nisha@gmail.com', status: 'Declined' },
  { id: '5', name: 'Dinesh M', email: 'dinesh@gmail.com', status: 'Pending' },
];

const avatarColors = ['#8B5CF6', '#EC4899', '#0891B2', '#D97706', '#059669'];

const statuses = ['Confirmed', 'Pending', 'Declined'];

export default function GuestListScreen({ navigation, route }) {
  const [guests, setGuests] = useState(initialGuests);
  const [search, setSearch] = useState('');

  const event = route?.params?.event;

  const confirmed = guests.filter(
    guest => guest.status === 'Confirmed'
  ).length;

  const pending = guests.filter(
    guest => guest.status === 'Pending'
  ).length;

  const declined = guests.filter(
    guest => guest.status === 'Declined'
  ).length;

  const filteredGuests = guests.filter(guest =>
    `${guest.name} ${guest.email}`
      .toLowerCase()
      .includes(search.toLowerCase().trim())
  );

  function goBack() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Home');
    }
  }

  function addGuest() {
    Alert.prompt?.(
      'Add Guest',
      'Enter the guest name:',
      name => {
        if (!name || !name.trim()) {
          Alert.alert('Required', 'Please enter a guest name.');
          return;
        }

        Alert.alert(
          'Guest Email',
          'To keep this screen compatible with Android and iOS, the full guest form will be added in a separate step.'
        );
      }
    );

    if (!Alert.prompt) {
      Alert.alert(
        'Add Guest',
        'The add-guest form will be created in a separate step.'
      );
    }
  }

  function showGuestOptions(guest) {
    Alert.alert(
      guest.name,
      `Email: ${guest.email}\nStatus: ${guest.status}`,
      [
        {
          text: 'Change Status',
          onPress: () => {
            Alert.alert(
              'Update Invitation',
              `Choose a status for ${guest.name}.`,
              [
                {
                  text: 'Confirmed',
                  onPress: () => updateStatus(guest.id, 'Confirmed'),
                },
                {
                  text: 'Pending',
                  onPress: () => updateStatus(guest.id, 'Pending'),
                },
                {
                  text: 'Declined',
                  onPress: () => updateStatus(guest.id, 'Declined'),
                },
                { text: 'Cancel', style: 'cancel' },
              ]
            );
          },
        },
        {
          text: 'Delete Guest',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Remove Guest?',
              `Remove ${guest.name} from this list?`,
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Remove',
                  style: 'destructive',
                  onPress: () => {
                    setGuests(current =>
                      current.filter(item => item.id !== guest.id)
                    );
                  },
                },
              ]
            );
          },
        },
        { text: 'Close', style: 'cancel' },
      ]
    );
  }

  function updateStatus(id, status) {
    setGuests(current =>
      current.map(guest =>
        guest.id === id ? { ...guest, status } : guest
      )
    );
  }

  function renderStatus(status) {
    const statusStyle = {
      Confirmed: styles.confirmedBadge,
      Pending: styles.pendingBadge,
      Declined: styles.declinedBadge,
    };

    const statusTextStyle = {
      Confirmed: styles.confirmedText,
      Pending: styles.pendingText,
      Declined: styles.declinedText,
    };

    return (
      <View style={[styles.statusBadge, statusStyle[status]]}>
        <Text style={[styles.statusText, statusTextStyle[status]]}>
          {status}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#100827" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={['#6527C8', '#35165E', '#100827']}
          style={styles.header}
        >
          <View style={styles.headerRow}>
            <TouchableOpacity style={styles.backButton} onPress={goBack}>
              <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Guest List</Text>

            <View style={{ width: 43 }} />
          </View>

          <View style={styles.headerIcon}>
            <Ionicons name="people" size={31} color="#FFFFFF" />
          </View>

          <Text style={styles.pageTitle}>Manage Your Guests</Text>

          <Text style={styles.pageSubtitle}>
            {event?.title || event?.eventName
              ? `Guests for ${event.title || event.eventName}`
              : 'Keep track of invitations and responses.'}
          </Text>

          <View style={styles.totalCard}>
            <View>
              <Text style={styles.totalLabel}>Total Guests</Text>
              <Text style={styles.totalNumber}>{guests.length}</Text>
              <Text style={styles.totalCaption}>On your guest list</Text>
            </View>

            <View style={styles.totalIcon}>
              <Ionicons name="people-outline" size={33} color="#D8B4FE" />
            </View>
          </View>
        </LinearGradient>

        <View style={styles.content}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryCard}>
              <View
                style={[styles.summaryDot, { backgroundColor: '#4ADE80' }]}
              />
              <Text style={styles.summaryNumber}>{confirmed}</Text>
              <Text style={styles.summaryLabel}>Confirmed</Text>
            </View>

            <View style={styles.summaryCard}>
              <View
                style={[styles.summaryDot, { backgroundColor: '#FBBF24' }]}
              />
              <Text style={styles.summaryNumber}>{pending}</Text>
              <Text style={styles.summaryLabel}>Pending</Text>
            </View>

            <View style={styles.summaryCard}>
              <View
                style={[styles.summaryDot, { backgroundColor: '#FB7185' }]}
              />
              <Text style={styles.summaryNumber}>{declined}</Text>
              <Text style={styles.summaryLabel}>Declined</Text>
            </View>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>All Guests</Text>
            <Text style={styles.guestCount}>
              {filteredGuests.length} people
            </Text>
          </View>

          <View style={styles.searchBox}>
            <Ionicons name="search-outline" size={21} color="#A99CBE" />

            <TextInput
              style={styles.searchInput}
              placeholder="Search name or email..."
              placeholderTextColor="#817493"
              value={search}
              onChangeText={setSearch}
              autoCapitalize="none"
            />

            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch('')}>
                <Ionicons name="close-circle" size={20} color="#A99CBE" />
              </TouchableOpacity>
            )}
          </View>

          {filteredGuests.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="people-outline" size={42} color="#A99CBE" />
              <Text style={styles.emptyTitle}>No guests found</Text>
              <Text style={styles.emptySubtitle}>
                Try another name or email address.
              </Text>
            </View>
          ) : (
            filteredGuests.map((guest, index) => (
              <View key={guest.id} style={styles.guestCard}>
                <View
                  style={[
                    styles.avatar,
                    {
                      backgroundColor:
                        avatarColors[index % avatarColors.length],
                    },
                  ]}
                >
                  <Text style={styles.avatarText}>
                    {guest.name.charAt(0).toUpperCase()}
                  </Text>
                </View>

                <View style={styles.guestInfo}>
                  <Text style={styles.guestName}>{guest.name}</Text>
                  <Text style={styles.guestEmail}>{guest.email}</Text>

                  <View style={styles.guestStatus}>
                    {renderStatus(guest.status)}
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.moreButton}
                  onPress={() => showGuestOptions(guest)}
                >
                  <Ionicons
                    name="ellipsis-vertical"
                    size={19}
                    color="#B8A8D0"
                  />
                </TouchableOpacity>
              </View>
            ))
          )}

          <TouchableOpacity activeOpacity={0.85} onPress={addGuest}>
            <LinearGradient
              colors={['#9B5CFF', '#D946EF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.addButton}
            >
              <Ionicons name="person-add-outline" size={21} color="#FFFFFF" />
              <Text style={styles.addButtonText}>Add New Guest</Text>
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.footerNote}>
            Sample guest data · Changes are temporary and not saved to a database
          </Text>

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
  header: {
    paddingTop: 48,
    paddingHorizontal: 21,
    paddingBottom: 27,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 26,
  },
  backButton: {
    width: 43,
    height: 43,
    borderRadius: 15,
    backgroundColor: '#FFFFFF20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  headerIcon: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: '#FFFFFF22',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 17,
  },
  pageTitle: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: '800',
  },
  pageSubtitle: {
    color: '#E3D5F8',
    fontSize: 13,
    marginTop: 8,
  },
  totalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF18',
    borderWidth: 1,
    borderColor: '#FFFFFF25',
    borderRadius: 21,
    padding: 19,
    marginTop: 23,
  },
  totalLabel: {
    color: '#E9D5FF',
    fontSize: 13,
  },
  totalNumber: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '800',
    marginTop: 5,
  },
  totalCaption: {
    color: '#E9D5FF',
    fontSize: 12,
    marginTop: 3,
  },
  totalIcon: {
    width: 63,
    height: 63,
    borderRadius: 20,
    backgroundColor: '#FFFFFF20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 27,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#19112F',
    borderWidth: 1,
    borderColor: '#30214C',
    borderRadius: 16,
    paddingVertical: 15,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  summaryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 9,
  },
  summaryNumber: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
  },
  summaryLabel: {
    color: '#A99CBE',
    fontSize: 11,
    marginTop: 5,
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '800',
  },
  guestCount: {
    color: '#BCA7DD',
    fontSize: 12,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#19112F',
    borderWidth: 1,
    borderColor: '#392854',
    borderRadius: 16,
    paddingHorizontal: 14,
    marginBottom: 17,
    height: 53,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
  },
  guestCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#19112F',
    borderWidth: 1,
    borderColor: '#30214C',
    borderRadius: 19,
    padding: 14,
    marginBottom: 11,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '800',
  },
  guestInfo: {
    flex: 1,
    marginLeft: 12,
  },
  guestName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  guestEmail: {
    color: '#A99CBE',
    fontSize: 11,
    marginTop: 5,
  },
  guestStatus: {
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  statusBadge: {
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
  },
  confirmedBadge: {
    backgroundColor: '#14532D',
  },
  confirmedText: {
    color: '#86EFAC',
  },
  pendingBadge: {
    backgroundColor: '#713F12',
  },
  pendingText: {
    color: '#FDE68A',
  },
  declinedBadge: {
    backgroundColor: '#881337',
  },
  declinedText: {
    color: '#FDA4AF',
  },
  moreButton: {
    width: 32,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 35,
  },
  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 13,
  },
  emptySubtitle: {
    color: '#A99CBE',
    fontSize: 12,
    marginTop: 7,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 17,
    borderRadius: 17,
    marginTop: 13,
    gap: 10,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  footerNote: {
    color: '#817493',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 17,
  },
});
