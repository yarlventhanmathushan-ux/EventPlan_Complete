
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function EventCard({
  title = 'Birthday Celebration',
  category = 'Birthday',
  date = 'Nov 15, 2026',
  time = '6:00 PM',
  location = 'Jaffna, Sri Lanka',
  guests = 25,
  status = 'Planning',
  onPress,
}) {
  const isCompleted = status === 'Completed';

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <LinearGradient
        colors={['#30204F', '#1C1232']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Top section */}
        <View style={styles.topRow}>
          <View style={styles.categoryIcon}>
            <Ionicons
              name="calendar-outline"
              size={23}
              color="#D8B4FE"
            />
          </View>

          <View
            style={[
              styles.statusBadge,
              isCompleted && styles.completedBadge,
            ]}
          >
            <View
              style={[
                styles.statusDot,
                isCompleted && styles.completedDot,
              ]}
            />
            <Text
              style={[
                styles.statusText,
                isCompleted && styles.completedText,
              ]}
            >
              {status}
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color="#A99BBE"
          />
        </View>

        {/* Event title */}
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.title}>{title}</Text>

        {/* Date and time */}
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Ionicons
              name="calendar"
              size={16}
              color="#C084FC"
            />
            <Text style={styles.infoText}>{date}</Text>
          </View>

          <View style={styles.infoItem}>
            <Ionicons
              name="time-outline"
              size={16}
              color="#C084FC"
            />
            <Text style={styles.infoText}>{time}</Text>
          </View>
        </View>

        <View style={styles.separator} />

        {/* Location and guests */}
        <View style={styles.bottomRow}>
          <View style={styles.locationContainer}>
            <Ionicons
              name="location-outline"
              size={17}
              color="#A99BBE"
            />
            <Text
              style={styles.locationText}
              numberOfLines={1}
            >
              {location}
            </Text>
          </View>

          <View style={styles.guestsContainer}>
            <Ionicons
              name="people-outline"
              size={17}
              color="#D8B4FE"
            />
            <Text style={styles.guestsText}>{guests}</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: 22,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#3B2859',
  },

  gradient: {
    padding: 19,
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    gap: 10,
  },

  categoryIcon: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: '#49316B',
    alignItems: 'center',
    justifyContent: 'center',
  },

  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#493719',
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 20,
    marginLeft: 'auto',
  },

  completedBadge: {
    backgroundColor: '#173D35',
  },

  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FBBF24',
  },

  completedDot: {
    backgroundColor: '#34D399',
  },

  statusText: {
    color: '#FCD34D',
    fontSize: 11,
    fontWeight: '700',
  },

  completedText: {
    color: '#6EE7B7',
  },

  category: {
    color: '#C084FC',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 6,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 17,
  },

  infoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 18,
  },

  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },

  infoText: {
    color: '#D6C9E9',
    fontSize: 12,
  },

  separator: {
    height: 1,
    backgroundColor: '#493361',
    marginVertical: 17,
  },

  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },

  locationContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  locationText: {
    color: '#A99BBE',
    fontSize: 12,
    flexShrink: 1,
  },

  guestsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#382451',
    paddingHorizontal: 11,
    paddingVertical: 8,
    borderRadius: 12,
  },

  guestsText: {
    color: '#E9D5FF',
    fontSize: 12,
    fontWeight: '700',
  },
});
