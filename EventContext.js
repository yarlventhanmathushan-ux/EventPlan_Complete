
import React, { createContext, useContext, useState } from 'react';

const EventContext = createContext(null);

const initialEvents = [
  {
    id: '1',
    title: 'Birthday Celebration',
    eventName: 'Birthday Celebration',
    date: 'Nov 05, 2026',
    time: '6:00 PM',
    location: 'Jaffna, Sri Lanka',
    category: 'Birthday',
    eventType: 'Birthday',
    color: '#A78BFA',
    guests: 24,
    guestCount: 24,
    budget: 0,
    status: 'Planning',
  },
  {
    id: '2',
    title: 'Wedding Ceremony',
    eventName: 'Wedding Ceremony',
    date: 'Nov 12, 2026',
    time: '10:00 AM',
    location: 'Jaffna, Sri Lanka',
    category: 'Wedding',
    eventType: 'Wedding',
    color: '#FF6B9D',
    guests: 0,
    guestCount: 0,
    budget: 0,
    status: 'Planning',
  },
];

export function EventProvider({ children }) {
  const [events, setEvents] = useState(initialEvents);

  function addEvent(event) {
    const newEvent = {
      ...event,
      id: String(event.id || Date.now()),
    };

    setEvents((previous) => [...previous, newEvent]);
  }

  function updateEvent(updatedEvent) {
    setEvents((previous) =>
      previous.map((event) =>
        String(event.id) === String(updatedEvent.id)
          ? { ...event, ...updatedEvent }
          : event
      )
    );
  }

  function deleteEvent(eventId) {
    setEvents((previous) =>
      previous.filter(
        (event) => String(event.id) !== String(eventId)
      )
    );
  }

  return (
    <EventContext.Provider
      value={{ events, addEvent, updateEvent, deleteEvent }}
    >
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);

  if (!context) {
    throw new Error('useEvents must be used inside EventProvider');
  }

  return context;
}
