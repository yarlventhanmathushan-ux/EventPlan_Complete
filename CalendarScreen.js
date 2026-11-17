
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const eventData = [
  {
    id: '1',
    title: 'Birthday Celebration',
    type: 'Birthday',
    date: '2026-11-15',
    time: '6:00 PM',
    location: 'Jaffna, Sri Lanka',
    color: '#C084FC',
  },
  {
    id: '2',
    title: 'Family Dinner',
    type: 'Dinner',
    date: '2026-11-08',
    time: '7:00 PM',
    location: 'Jaffna',
    color: '#F9A8D4',
  },
  {
    id: '3',
    title: 'Team Meeting',
    type: 'Meeting',
    date: '2026-11-20',
    time: '10:00 AM',
    location: 'Office',
    color: '#67E8F9',
  },
  {
    id: '4',
    title: 'Wedding Planning',
    type: 'Wedding',
    date: '2026-11-25',
    time: '4:00 PM',
    location: 'Jaffna',
    color: '#86EFAC',
  },
];

const monthNames = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December',
];

const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

const formatDateKey = (year, month, day) =>
  `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

export default function CalendarScreen({ navigation, onBack, onEventPress }) {
  const [currentMonth, setCurrentMonth] = useState(
    new Date(2026, 10, 1)
  );

  const [selectedDate, setSelectedDate] = useState('2026-11-15');

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const firstWeekday =
    (new Date(year, month, 1).getDay() + 6) % 7;

  const calendarCells = [
    ...Array(firstWeekday).fill(null),
    ...Array.from(
      { length: daysInMonth },
      (_, index) => index + 1
    ),
  ];

  while (calendarCells.length % 7 !== 0) {
    calendarCells.push(null);
  }

  const goBack = () => {
    if (onBack) {
      onBack();
    } else if (navigation?.canGoBack?.()) {
      navigation.goBack();
    } else {
      navigation?.navigate?.('Home');
    }
  };

  const changeMonth = direction => {
    const nextMonth = new Date(year, month + direction, 1);

    setCurrentMonth(nextMonth);

    setSelectedDate(
      formatDateKey(
        nextMonth.getFullYear(),
        nextMonth.getMonth(),
        1
      )
    );
  };

  const selectedEvents = eventData.filter(
    event => event.date === selectedDate
  );

  const monthEvents = eventData.filter(event => {
    const [eventYear, eventMonth] = event.date
      .split('-')
      .map(Number);

    return eventYear === year && eventMonth === month + 1;
  });

  const monthLabel = `${monthNames[month]} ${year}`;

  const openEvent = event => {
    if (onEventPress) {
      onEventPress(event);
      return;
    }

    navigation?.navigate?.('EventDetails', {
      event: {
        ...event,
        eventName: event.title,
        eventType: event.type,
        guestCount: 0,
        budget: null,
        description: '',
        status: 'Upcoming',
      },
    });
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

            <Text style={styles.topTitle}>Event Calendar</Text>

            <View style={{ width: 43 }} />
          </View>

          <View style={styles.headerIcon}>
            <Ionicons
              name="calendar"
              size={32}
              color="#FFFFFF"
            />
          </View>

          <Text style={styles.pageTitle}>Plan Every Moment</Text>

          <Text style={styles.pageSubtitle}>
            All your important dates, in one place.
          </Text>

          <View style={styles.monthSummary}>
            <View>
              <Text style={styles.monthSummaryLabel}>
                Events This Month
              </Text>

              <Text style={styles.monthSummaryNumber}>
                {monthEvents.length}
              </Text>

              <Text style={styles.monthSummaryCaption}>
                {monthLabel}
              </Text>
            </View>

            <View style={styles.summaryIcon}>
              <Ionicons
                name="sparkles"
                size={30}
                color="#E9D5FF"
              />
            </View>
          </View>
        </LinearGradient>

        <View style={styles.content}>
          <View style={styles.calendarCard}>
            <View style={styles.monthNavigation}>
              <TouchableOpacity
                style={styles.monthArrow}
                onPress={() => changeMonth(-1)}
              >
                <Ionicons
                  name="chevron-back"
                  size={22}
                  color="#FFFFFF"
                />
              </TouchableOpacity>

              <Text style={styles.monthTitle}>
                {monthLabel}
              </Text>

              <TouchableOpacity
                style={styles.monthArrow}
                onPress={() => changeMonth(1)}
              >
                <Ionicons
                  name="chevron-forward"
                  size={22}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.weekRow}>
              {weekDays.map(day => (
                <View key={day} style={styles.weekDayCell}>
                  <Text style={styles.weekDayText}>
                    {day}
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.daysGrid}>
              {calendarCells.map((day, index) => {
                const dateKey = day
                  ? formatDateKey(year, month, day)
                  : null;

                const isSelected = dateKey === selectedDate;

                const hasEvent = dateKey
                  ? eventData.some(
                      event => event.date === dateKey
                    )
                  : false;

                return (
                  <View
                    key={`${year}-${month}-${index}`}
                    style={styles.dayCell}
                  >
                    {day ? (
                      <TouchableOpacity
                        style={[
                          styles.dayButton,
                          isSelected && styles.selectedDayButton,
                        ]}
                        onPress={() => setSelectedDate(dateKey)}
                      >
                        <Text
                          style={[
                            styles.dayText,
                            isSelected && styles.selectedDayText,
                          ]}
                        >
                          {day}
                        </Text>

                        {hasEvent && (
                          <View
                            style={[
                              styles.eventDot,
                              isSelected && styles.selectedEventDot,
                            ]}
                          />
                        )}
                      </TouchableOpacity>
                    ) : (
                      <View style={styles.dayButton} />
                    )}
                  </View>
                );
              })}
            </View>

            <View style={styles.legend}>
              <View style={styles.legendDot} />

              <Text style={styles.legendText}>
                Event scheduled
              </Text>
            </View>
          </View>

          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>
                Selected Date
              </Text>

              <Text style={styles.sectionSubtitle}>
                {new Date(
                  `${selectedDate}T12:00:00`
                ).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </Text>
            </View>

            <View style={styles.selectedDateIcon}>
              <Ionicons
                name="calendar-outline"
                size={22}
                color="#C084FC"
              />
            </View>
          </View>

          {selectedEvents.length === 0 ? (
            <View style={styles.emptyCard}>
              <View style={styles.emptyIcon}>
                <Ionicons
                  name="calendar-clear-outline"
                  size={31}
                  color="#B9A9D1"
                />
              </View>

              <Text style={styles.emptyTitle}>
                No events scheduled
              </Text>

              <Text style={styles.emptySubtitle}>
                This date is free. Choose another date to see its events.
              </Text>
            </View>
          ) : (
            selectedEvents.map(event => (
              <TouchableOpacity
                key={event.id}
                style={styles.eventCard}
                activeOpacity={0.8}
                onPress={() => openEvent(event)}
              >
                <View
                  style={[
                    styles.eventColorBar,
                    { backgroundColor: event.color },
                  ]}
                />

                <View style={styles.eventCardContent}>
                  <Text style={styles.eventType}>
                    {event.type}
                  </Text>

                  <Text style={styles.eventTitle}>
                    {event.title}
                  </Text>

                  <View style={styles.eventInfoRow}>
                    <Ionicons
                      name="time-outline"
                      size={15}
                      color="#B9A9D1"
                    />

                    <Text style={styles.eventInfoText}>
                      {event.time}
                    </Text>
                  </View>

                  <View style={styles.eventInfoRow}>
                    <Ionicons
                      name="location-outline"
                      size={15}
                      color="#B9A9D1"
                    />

                    <Text style={styles.eventInfoText}>
                      {event.location}
                    </Text>
                  </View>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color="#A99CBE"
                />
              </TouchableOpacity>
            ))
          )}

          <Text style={styles.footerNote}>
            Sample events · Calendar data will be connected later
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
  headerIcon: {
    width: 61,
    height: 61,
    borderRadius: 20,
    backgroundColor: '#FFFFFF22',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
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
  monthSummary: {
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
  monthSummaryLabel: {
    color: '#E9D5FF',
    fontSize: 12,
  },
  monthSummaryNumber: {
    color: '#FFFFFF',
    fontSize: 33,
    fontWeight: '800',
    marginTop: 4,
  },
  monthSummaryCaption: {
    color: '#E9D5FF',
    fontSize: 12,
    marginTop: 3,
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
  calendarCard: {
    backgroundColor: '#19112F',
    borderRadius: 23,
    borderWidth: 1,
    borderColor: '#30214C',
    padding: 16,
    marginBottom: 27,
  },
  monthNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 23,
  },
  monthArrow: {
    width: 37,
    height: 37,
    borderRadius: 12,
    backgroundColor: '#30214C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
  weekRow: {
    flexDirection: 'row',
    marginBottom: 11,
  },
  weekDayCell: {
    width: '14.2857%',
    alignItems: 'center',
  },
  weekDayText: {
    color: '#A99CBE',
    fontSize: 10,
    fontWeight: '700',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.2857%',
    alignItems: 'center',
    marginBottom: 7,
  },
  dayButton: {
    width: 35,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedDayButton: {
    backgroundColor: '#8B5CF6',
  },
  dayText: {
    color: '#E9D5FF',
    fontSize: 13,
    fontWeight: '600',
  },
  selectedDayText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  eventDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#D8B4FE',
    position: 'absolute',
    bottom: 4,
  },
  selectedEventDot: {
    backgroundColor: '#FFFFFF',
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 13,
    gap: 7,
  },
  legendDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#D8B4FE',
  },
  legendText: {
    color: '#A99CBE',
    fontSize: 11,
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
  sectionSubtitle: {
    color: '#B9A9D1',
    fontSize: 12,
    marginTop: 6,
  },
  selectedDateIcon: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: '#9B5CFF20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCard: {
    backgroundColor: '#19112F',
    borderWidth: 1,
    borderColor: '#30214C',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
  },
  emptyIcon: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: '#30214C',
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
    lineHeight: 19,
    textAlign: 'center',
    marginTop: 8,
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#19112F',
    borderWidth: 1,
    borderColor: '#30214C',
    borderRadius: 19,
    padding: 14,
    marginBottom: 12,
  },
  eventColorBar: {
    width: 4,
    alignSelf: 'stretch',
    borderRadius: 4,
    marginRight: 13,
  },
  eventCardContent: {
    flex: 1,
  },
  eventType: {
    color: '#C084FC',
    fontSize: 11,
    fontWeight: '700',
  },
  eventTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    marginTop: 5,
    marginBottom: 9,
  },
  eventInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 5,
  },
  eventInfoText: {
    color: '#B9A9D1',
    fontSize: 11,
  },
  footerNote: {
    color: '#817493',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 17,
  },
});
