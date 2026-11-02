
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { EventProvider } from './src/context/EventContext';

export default function App() {
  return (
    <EventProvider>
      <AppNavigator />
    </EventProvider>
  );
}
