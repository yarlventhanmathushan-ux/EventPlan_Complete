
import React from 'react';
import {
  NavigationContainer,
  CommonActions,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import CreateEventScreen from '../screens/CreateEventScreen';
import EventDetailsScreen from '../screens/EventDetailsScreen';
import GuestListScreen from '../GuestListScreen';
import TasksScreen from '../screens/TasksScreen';
import CalendarScreen from '../screens/CalendarScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: {
            backgroundColor: '#100B1D',
          },
          gestureEnabled: true,
        }}
      >
        {/* Splash */}
        <Stack.Screen name="Splash">
          {(props) => (
            <SplashScreen
              {...props}
              onFinish={() =>
                props.navigation.replace('Login')
              }
            />
          )}
        </Stack.Screen>

        {/* Authentication */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />

        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
        />

        {/* Main dashboard */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />

        {/* Event management */}
        <Stack.Screen
          name="CreateEvent"
          component={CreateEventScreen}
        />

        <Stack.Screen
          name="EventDetails"
          component={EventDetailsScreen}
        />

        <Stack.Screen
          name="GuestList"
          component={GuestListScreen}
        />

        {/* Planning tools */}
        <Stack.Screen
          name="Tasks"
          component={TasksScreen}
        />

        <Stack.Screen
          name="Calendar"
          component={CalendarScreen}
        />

        <Stack.Screen
          name="Notifications"
          component={NotificationsScreen}
        />

        {/* User account */}
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
