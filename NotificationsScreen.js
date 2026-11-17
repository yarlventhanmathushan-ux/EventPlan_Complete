
import React, { useState } from 'react';
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

const initialNotifications = [
  {
    id: '1',
    title: 'Event Reminder',
    message: 'Birthday Celebration is coming up on 15 November.',
    time: '10 minutes ago',
    category: 'Event',
    icon: 'calendar-outline',
    color: '#C084FC',
    unread: true,
  },
  {
    id: '2',
    title: 'Guest Confirmed',
    message: 'Arun Kumar confirmed attendance for your event.',
    time: '1 hour ago',
    category: 'Guest',
    icon: 'people-outline',
    color: '#86EFAC',
    unread: true,
  },
  {
    id: '3',
    title: 'Task Deadline Approaching',
    message: 'Confirm catering service before 4 November.',
    time: '3 hours ago',
    category: 'Task',
    icon: 'checkbox-outline',
    color: '#FBBF24',
    unread: true,
  },
  {
    id: '4',
    title: 'Budget Update',
    message: 'Your event budget summary is ready to review.',
    time: 'Yesterday',
    category: 'Budget',
    icon: 'wallet-outline',
    color: '#F9A8D4',
    unread: false,
  },
  {
    id: '5',
    title: 'Invitation Reminder',
    message: 'Some guests have not responded to their invitations.',
    time: 'Yesterday',
    category: 'Guest',
    icon: 'mail-outline',
    color: '#67E8F9',
    unread: false,
  },
  {
    id: '6',
    title: 'Planning Progress',
    message: 'You have completed your venue booking task.',
    time: '2 days ago',
    category: 'Task',
    icon: 'checkmark-circle-outline',
    color: '#86EFAC',
    unread: false,
  },
];

const filters = ['All', 'Unread', 'Read'];

export default function NotificationsScreen({
  navigation,
  onBack,
  onNotificationPress,
}) {
  const [notifications, setNotifications] = useState(
    initialNotifications
  );

  const [activeFilter, setActiveFilter] = useState('All');

  const unreadCount = notifications.filter(
    item => item.unread
  ).length;

  const visibleNotifications = notifications.filter(item => {
    if (activeFilter === 'Unread') return item.unread;
    if (activeFilter === 'Read') return !item.unread;
    return true;
  });

  const goBack = () => {
    if (onBack) {
      onBack();
    } else if (navigation?.canGoBack?.()) {
      navigation.goBack();
    } else {
      navigation?.navigate?.('Home');
    }
  };

  const markAllAsRead = () => {
    setNotifications(previous =>
      previous.map(item => ({
        ...item,
        unread: false,
      }))
    );
  };

  const openNotification = notification => {
    setNotifications(previous =>
      previous.map(item =>
        item.id === notification.id
          ? { ...item, unread: false }
          : item
      )
    );

    if (onNotificationPress) {
      onNotificationPress(notification);
      return;
    }

    Alert.alert(
      notification.title,
      notification.message,
      [{ text: 'OK' }]
    );
  };

  const clearNotifications = () => {
    if (notifications.length === 0) {
      Alert.alert(
        'No Notifications',
        'There are no notifications left to clear.'
      );
      return;
    }

    Alert.alert(
      'Clear Notifications',
      'Do you want to remove all notifications from this screen?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => setNotifications([]),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#100827"
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={['#6527C8', '#35165E', '#100827']}
          style={styles.header}
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

            <Text style={styles.topTitle}>
              Notifications
            </Text>

            <TouchableOpacity
              style={styles.headerAction}
              onPress={markAllAsRead}
            >
              <Ionicons
                name="checkmark-done"
                size={22}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.headerIcon}>
            <Ionicons
              name="notifications"
              size={31}
              color="#FFFFFF"
            />

            {unreadCount > 0 && (
              <View style={styles.headerBadge} />
            )}
          </View>

          <Text style={styles.pageTitle}>
            Stay in the Loop
          </Text>

          <Text style={styles.pageSubtitle}>
            Important updates for your special events.
          </Text>

          <View style={styles.summaryCard}>
            <View>
              <Text style={styles.summaryLabel}>
                Unread Notifications
              </Text>

              <Text style={styles.summaryNumber}>
                {unreadCount}
              </Text>

              <Text style={styles.summaryCaption}>
                {unreadCount === 0
                  ? 'You are all caught up!'
                  : 'Updates waiting for your attention'}
              </Text>
            </View>

            <View style={styles.summaryIcon}>
              <Ionicons
                name="mail-unread-outline"
                size={30}
                color="#E9D5FF"
              />
            </View>
          </View>
        </LinearGradient>

        <View style={styles.content}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Recent Activity
            </Text>

            <TouchableOpacity onPress={markAllAsRead}>
              <Text style={styles.markReadText}>
                Mark all as read
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.filterRow}>
            {filters.map(filter => {
              const selected = activeFilter === filter;

              return (
                <TouchableOpacity
                  key={filter}
                  style={[
                    styles.filterButton,
                    selected && styles.activeFilterButton,
                  ]}
                  onPress={() => setActiveFilter(filter)}
                >
                  <Text
                    style={[
                      styles.filterText,
                      selected && styles.activeFilterText,
                    ]}
                  >
                    {filter}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {visibleNotifications.length === 0 ? (
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <Ionicons
                  name="notifications-off-outline"
                  size={35}
                  color="#B9A9D1"
                />
              </View>

              <Text style={styles.emptyTitle}>
                Nothing to see here
              </Text>

              <Text style={styles.emptySubtitle}>
                No notifications match this filter.
              </Text>
            </View>
          ) : (
            visibleNotifications.map(notification => (
              <TouchableOpacity
                key={notification.id}
                activeOpacity={0.8}
                style={[
                  styles.notificationCard,
                  notification.unread && styles.unreadCard,
                ]}
                onPress={() =>
                  openNotification(notification)
                }
              >
                <View
                  style={[
                    styles.notificationIcon,
                    {
                      backgroundColor:
                        notification.color + '20',
                    },
                  ]}
                >
                  <Ionicons
                    name={notification.icon}
                    size={23}
                    color={notification.color}
                  />
                </View>

                <View style={styles.notificationContent}>
                  <View style={styles.notificationTitleRow}>
                    <Text style={styles.notificationTitle}>
                      {notification.title}
                    </Text>

                    {notification.unread && (
                      <View style={styles.unreadDot} />
                    )}
                  </View>

                  <Text style={styles.notificationMessage}>
                    {notification.message}
                  </Text>

                  <View style={styles.notificationFooter}>
                    <Ionicons
                      name="time-outline"
                      size={13}
                      color="#9585AC"
                    />

                    <Text style={styles.notificationTime}>
                      {notification.time}
                    </Text>

                    <View style={styles.categoryBadge}>
                      <Text style={styles.categoryText}>
                        {notification.category}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}

          <TouchableOpacity
            style={styles.clearButton}
            onPress={clearNotifications}
          >
            <Ionicons
              name="trash-outline"
              size={17}
              color="#FDA4AF"
            />

            <Text style={styles.clearButtonText}>
              Clear All Notifications
            </Text>
          </TouchableOpacity>

          <Text style={styles.footerNote}>
            Sample notifications · Real-time alerts will be connected later
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
    paddingBottom: 28,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 27,
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
    fontSize: 16,
    fontWeight: '700',
  },
  headerAction: {
    width: 43,
    height: 43,
    borderRadius: 15,
    backgroundColor: '#FFFFFF20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: {
    width: 61,
    height: 61,
    borderRadius: 20,
    backgroundColor: '#FFFFFF22',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  headerBadge: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FB7185',
    borderWidth: 2,
    borderColor: '#6527C8',
    position: 'absolute',
    top: 8,
    right: 9,
  },
  pageTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
  },
  pageSubtitle: {
    color: '#E3D5F8',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
  },
  summaryCard: {
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
  summaryLabel: {
    color: '#E9D5FF',
    fontSize: 12,
  },
  summaryNumber: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '800',
    marginTop: 5,
  },
  summaryCaption: {
    color: '#E9D5FF',
    fontSize: 11,
    marginTop: 4,
  },
  summaryIcon: {
    width: 59,
    height: 59,
    borderRadius: 19,
    backgroundColor: '#FFFFFF20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '800',
  },
  markReadText: {
    color: '#C084FC',
    fontSize: 11,
    fontWeight: '700',
  },
  filterRow: {
    flexDirection: 'row',
    gap: 9,
    marginBottom: 18,
  },
  filterButton: {
    paddingHorizontal: 17,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#19112F',
    borderWidth: 1,
    borderColor: '#30214C',
  },
  activeFilterButton: {
    backgroundColor: '#8B5CF6',
    borderColor: '#A78BFA',
  },
  filterText: {
    color: '#B9A9D1',
    fontSize: 12,
    fontWeight: '600',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#19112F',
    borderWidth: 1,
    borderColor: '#30214C',
    borderRadius: 19,
    padding: 15,
    marginBottom: 12,
  },
  unreadCard: {
    backgroundColor: '#21163A',
    borderColor: '#56358A',
  },
  notificationIcon: {
    width: 47,
    height: 47,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationContent: {
    flex: 1,
    marginLeft: 12,
  },
  notificationTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  notificationTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    flex: 1,
  },
  unreadDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#C084FC',
  },
  notificationMessage: {
    color: '#C1B4D5',
    fontSize: 12,
    lineHeight: 19,
    marginTop: 7,
  },
  notificationFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 5,
    marginTop: 11,
  },
  notificationTime: {
    color: '#9585AC',
    fontSize: 10,
  },
  categoryBadge: {
    backgroundColor: '#30214C',
    borderRadius: 7,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 5,
  },
  categoryText: {
    color: '#D8B4FE',
    fontSize: 10,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 35,
  },
  emptyIcon: {
    width: 65,
    height: 65,
    borderRadius: 22,
    backgroundColor: '#19112F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 14,
  },
  emptySubtitle: {
    color: '#A99CBE',
    fontSize: 12,
    marginTop: 7,
    textAlign: 'center',
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    backgroundColor: '#88133725',
    borderWidth: 1,
    borderColor: '#88133770',
    borderRadius: 15,
    paddingVertical: 15,
    marginTop: 13,
  },
  clearButtonText: {
    color: '#FDA4AF',
    fontSize: 13,
    fontWeight: '700',
  },
  footerNote: {
    color: '#817493',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 17,
  },
});
