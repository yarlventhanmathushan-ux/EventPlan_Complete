
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

const initialTasks = [
  {
    id: '1',
    title: 'Book the event venue',
    category: 'Venue',
    dueDate: '02 Nov 2026',
    priority: 'High',
    completed: true,
  },
  {
    id: '2',
    title: 'Confirm catering service',
    category: 'Food & Drinks',
    dueDate: '04 Nov 2026',
    priority: 'High',
    completed: false,
  },
  {
    id: '3',
    title: 'Choose decoration theme',
    category: 'Decoration',
    dueDate: '06 Nov 2026',
    priority: 'Medium',
    completed: false,
  },
  {
    id: '4',
    title: 'Send invitations',
    category: 'Guests',
    dueDate: '07 Nov 2026',
    priority: 'High',
    completed: false,
  },
  {
    id: '5',
    title: 'Arrange music and DJ',
    category: 'Entertainment',
    dueDate: '09 Nov 2026',
    priority: 'Low',
    completed: false,
  },
  {
    id: '6',
    title: 'Confirm photography',
    category: 'Photography',
    dueDate: '10 Nov 2026',
    priority: 'Medium',
    completed: false,
  },
];

const filters = ['All', 'Pending', 'Completed'];

export default function TasksScreen({ navigation, route }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [activeFilter, setActiveFilter] = useState('All');

  const event = route?.params?.event;

  const eventName =
    event?.title || event?.eventName || 'Birthday Celebration';

  const completedCount = tasks.filter(task => task.completed).length;
  const pendingCount = tasks.length - completedCount;

  const progress =
    tasks.length > 0 ? completedCount / tasks.length : 0;

  const visibleTasks = tasks.filter(task => {
    if (activeFilter === 'Pending') return !task.completed;
    if (activeFilter === 'Completed') return task.completed;
    return true;
  });

  function goBack() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Home');
    }
  }

  function toggleTask(id) {
    setTasks(previous =>
      previous.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function addTask() {
    Alert.alert(
      'Add New Task',
      'The task creation form will be added in a separate step.'
    );
  }

  function showTaskOptions(task) {
    Alert.alert(
      task.title,
      `Priority: ${task.priority}\nDue date: ${task.dueDate}\nStatus: ${
        task.completed ? 'Completed' : 'Pending'
      }`,
      [
        {
          text: task.completed ? 'Mark Pending' : 'Mark Completed',
          onPress: () => toggleTask(task.id),
        },
        { text: 'Close', style: 'cancel' },
      ]
    );
  }

  function priorityStyle(priority) {
    if (priority === 'High') return styles.highPriority;
    if (priority === 'Medium') return styles.mediumPriority;
    return styles.lowPriority;
  }

  function priorityTextStyle(priority) {
    if (priority === 'High') return styles.highText;
    if (priority === 'Medium') return styles.mediumText;
    return styles.lowText;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#100827" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={['#6527C8', '#35165E', '#100827']}
          style={styles.header}
        >
          <View style={styles.topBar}>
            <TouchableOpacity style={styles.backButton} onPress={goBack}>
              <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
            </TouchableOpacity>

            <Text style={styles.topTitle}>Tasks & Checklist</Text>

            <TouchableOpacity
              style={styles.addIconButton}
              onPress={addTask}
            >
              <Ionicons name="add" size={25} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.headerIcon}>
            <Ionicons name="checkbox" size={32} color="#FFFFFF" />
          </View>

          <Text style={styles.pageTitle}>Make It Happen!</Text>

          <Text style={styles.pageSubtitle}>
            Every little detail brings your event to life.
          </Text>

          <View style={styles.progressCard}>
            <View style={styles.progressTop}>
              <View>
                <Text style={styles.progressLabel}>Overall Progress</Text>
                <Text style={styles.progressNumber}>
                  {Math.round(progress * 100)}% completed
                </Text>
              </View>

              <View style={styles.progressCircle}>
                <Text style={styles.progressCircleText}>
                  {completedCount}/{tasks.length}
                </Text>
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

            <Text style={styles.progressCaption}>
              {pendingCount === 0
                ? 'Amazing! All tasks are completed.'
                : `${pendingCount} tasks remaining. Keep going!`}
            </Text>
          </View>
        </LinearGradient>

        <View style={styles.content}>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Ionicons name="list-outline" size={21} color="#C084FC" />
              </View>
              <Text style={styles.statNumber}>{tasks.length}</Text>
              <Text style={styles.statLabel}>Total Tasks</Text>
            </View>

            <View style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: '#FBBF2420' }]}>
                <Ionicons name="time-outline" size={21} color="#FBBF24" />
              </View>
              <Text style={styles.statNumber}>{pendingCount}</Text>
              <Text style={styles.statLabel}>Pending</Text>
            </View>

            <View style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: '#4ADE8020' }]}>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={21}
                  color="#4ADE80"
                />
              </View>
              <Text style={styles.statNumber}>{completedCount}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Tasks</Text>
            <Text style={styles.sectionSubtitle}>{eventName}</Text>
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

          {visibleTasks.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons
                name="checkmark-done-circle-outline"
                size={45}
                color="#A99CBE"
              />
              <Text style={styles.emptyTitle}>No tasks here</Text>
              <Text style={styles.emptySubtitle}>
                Try another filter or add a new task.
              </Text>
            </View>
          ) : (
            visibleTasks.map(task => (
              <View
                key={task.id}
                style={[
                  styles.taskCard,
                  task.completed && styles.completedTaskCard,
                ]}
              >
                <TouchableOpacity
                  style={[
                    styles.checkbox,
                    task.completed && styles.checkedCheckbox,
                  ]}
                  onPress={() => toggleTask(task.id)}
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: task.completed }}
                >
                  {task.completed && (
                    <Ionicons name="checkmark" size={17} color="#FFFFFF" />
                  )}
                </TouchableOpacity>

                <View style={styles.taskInfo}>
                  <Text
                    style={[
                      styles.taskTitle,
                      task.completed && styles.completedTaskTitle,
                    ]}
                  >
                    {task.title}
                  </Text>

                  <View style={styles.categoryRow}>
                    <Ionicons
                      name="folder-outline"
                      size={13}
                      color="#A99CBE"
                    />
                    <Text style={styles.categoryText}>{task.category}</Text>
                  </View>

                  <View style={styles.taskBottom}>
                    <View style={styles.dueDateRow}>
                      <Ionicons
                        name="calendar-outline"
                        size={13}
                        color="#A99CBE"
                      />
                      <Text style={styles.dueDateText}>{task.dueDate}</Text>
                    </View>

                    <View
                      style={[
                        styles.priorityBadge,
                        priorityStyle(task.priority),
                      ]}
                    >
                      <Text
                        style={[
                          styles.priorityText,
                          priorityTextStyle(task.priority),
                        ]}
                      >
                        {task.priority}
                      </Text>
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.moreButton}
                  onPress={() => showTaskOptions(task)}
                >
                  <Ionicons
                    name="ellipsis-vertical"
                    size={19}
                    color="#A99CBE"
                  />
                </TouchableOpacity>
              </View>
            ))
          )}

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={addTask}
            style={styles.addTaskWrapper}
          >
            <LinearGradient
              colors={['#9B5CFF', '#D946EF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.addTaskButton}
            >
              <Ionicons name="add-circle-outline" size={22} color="#FFFFFF" />
              <Text style={styles.addTaskText}>Add New Task</Text>
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.footerNote}>
            Sample tasks · Changes are temporary and not saved to a database
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
  addIconButton: {
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
  progressCard: {
    backgroundColor: '#FFFFFF18',
    borderWidth: 1,
    borderColor: '#FFFFFF25',
    borderRadius: 21,
    padding: 18,
    marginTop: 23,
  },
  progressTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressLabel: {
    color: '#E9D5FF',
    fontSize: 12,
  },
  progressNumber: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    marginTop: 7,
  },
  progressCircle: {
    width: 53,
    height: 53,
    borderRadius: 27,
    borderWidth: 3,
    borderColor: '#D8B4FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressCircleText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  progressBackground: {
    height: 9,
    backgroundColor: '#FFFFFF25',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 20,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#D8B4FE',
    borderRadius: 10,
  },
  progressCaption: {
    color: '#E9D5FF',
    fontSize: 11,
    marginTop: 11,
  },
  content: {
    padding: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 27,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#19112F',
    borderWidth: 1,
    borderColor: '#30214C',
    borderRadius: 17,
    paddingVertical: 15,
    alignItems: 'center',
  },
  statIcon: {
    width: 39,
    height: 39,
    borderRadius: 13,
    backgroundColor: '#9B5CFF20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statNumber: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    marginTop: 10,
  },
  statLabel: {
    color: '#A99CBE',
    fontSize: 11,
    marginTop: 5,
  },
  sectionHeader: {
    marginBottom: 15,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '800',
  },
  sectionSubtitle: {
    color: '#A99CBE',
    fontSize: 12,
    marginTop: 5,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 9,
    marginBottom: 17,
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
  taskCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#19112F',
    borderWidth: 1,
    borderColor: '#30214C',
    borderRadius: 19,
    padding: 14,
    marginBottom: 11,
  },
  completedTaskCard: {
    borderColor: '#28583D',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#8B72B5',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkedCheckbox: {
    backgroundColor: '#22C55E',
    borderColor: '#22C55E',
  },
  taskInfo: {
    flex: 1,
    marginLeft: 12,
  },
  taskTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 19,
  },
  completedTaskTitle: {
    color: '#A99CBE',
    textDecorationLine: 'line-through',
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 7,
  },
  categoryText: {
    color: '#A99CBE',
    fontSize: 11,
  },
  taskBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  dueDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  dueDateText: {
    color: '#B9A9D1',
    fontSize: 10,
  },
  priorityBadge: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 7,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '700',
  },
  highPriority: {
    backgroundColor: '#881337',
  },
  highText: {
    color: '#FDA4AF',
  },
  mediumPriority: {
    backgroundColor: '#713F12',
  },
  mediumText: {
    color: '#FDE68A',
  },
  lowPriority: {
    backgroundColor: '#164E63',
  },
  lowText: {
    color: '#67E8F9',
  },
  moreButton: {
    paddingHorizontal: 3,
    paddingVertical: 5,
    marginLeft: 3,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 35,
  },
  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 12,
  },
  emptySubtitle: {
    color: '#A99CBE',
    fontSize: 12,
    marginTop: 6,
    textAlign: 'center',
  },
  addTaskWrapper: {
    marginTop: 10,
  },
  addTaskButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 17,
    borderRadius: 17,
    gap: 10,
  },
  addTaskText: {
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
