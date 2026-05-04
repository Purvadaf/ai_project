import { useState, useEffect } from 'react';

const STORAGE_KEY = 'support_companion_mood_data';

// Helper to generate dates for the past week
const getPastDate = (daysAgo) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

const FAKE_DATA = [
  { id: 1, date: getPastDate(6), mood: 'Good', score: 5, emoji: '🙂' },
  { id: 2, date: getPastDate(5), mood: 'Anxious', score: 2, emoji: '😰' },
  { id: 3, date: getPastDate(4), mood: 'Okay', score: 3, emoji: '😐' },
  { id: 4, date: getPastDate(3), mood: 'Good', score: 5, emoji: '🙂' },
  { id: 5, date: getPastDate(2), mood: 'Sad', score: 2, emoji: '😞' },
  { id: 6, date: getPastDate(1), mood: 'Okay', score: 3, emoji: '😐' },
  { id: 7, date: getPastDate(0), mood: 'Good', score: 5, emoji: '🙂' },
];

export function useMoodData() {
  const [moodData, setMoodData] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
    // Inject fake data if empty
    localStorage.setItem(STORAGE_KEY, JSON.stringify(FAKE_DATA));
    return FAKE_DATA;
  });

  const addMoodEntry = (moodLabel, score, emoji) => {
    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString(),
      mood: moodLabel,
      score,
      emoji
    };
    
    setMoodData(prev => {
      const updated = [...prev, newEntry];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const clearMoodData = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    setMoodData([]);
  };

  return { moodData, addMoodEntry, clearMoodData };
}
