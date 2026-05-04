import MoodSelector from './MoodSelector';
import CheckInCard from './CheckInCard';
import EmergencyButton from './EmergencyButton';
import { motion } from 'framer-motion';

export default function Onboarding({ onSuggestionClick }) {
  const suggestions = [
    { label: "😆 Tell me a joke", prompt: "I am feeling sad. Please tell me a funny, lighthearted joke to cheer me up!" },
    { label: "✨ Motivational quote", prompt: "I am feeling low. Please give me an uplifting and powerful motivational quote." },
    { label: "🧘 Calm my anger", prompt: "I am feeling very angry right now. Please guide me through an exercise to calm down." },
    { label: "🗣️ I need to vent", prompt: "I just need someone to listen to me vent right now." }
  ];

  return (
    <div className="max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[70vh] space-y-10 py-10">
      
      {/* Welcome Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-4"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-support-blue dark:bg-blue-900/40 text-blue-500 mb-4 shadow-sm">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Hi, I'm your support companion.
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg max-w-md mx-auto">
          You can talk to me anytime. This is a safe, judgment-free space.
        </p>
      </motion.div>

      {/* Mood Selector */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full"
      >
        <MoodSelector onSelectMood={(moodObj) => onSuggestionClick(`I am feeling ${moodObj.label} today.`, moodObj.label, moodObj.score, moodObj.emoji)} />
      </motion.div>

      {/* Check In Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <CheckInCard 
          title="Daily Reflection" 
          description="Take a moment to write down one thing you're grateful for today."
          action="Start Journaling"
          onClick={() => onSuggestionClick("I want to do a daily reflection.")}
        />
        <CheckInCard 
          title="Take a Breather" 
          description="A quick 2-minute breathing exercise to help you center yourself."
          action="Start Exercise"
          onClick={() => onSuggestionClick("Guide me through a breathing exercise.")}
          color="bg-support-green dark:bg-green-900/20"
        />
      </motion.div>

      {/* Quick Suggestions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-wrap justify-center gap-3"
      >
        {suggestions.map((suggestion, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSuggestionClick(suggestion.prompt)}
            className="px-5 py-2.5 bg-white/50 hover:bg-white/80 dark:bg-gray-800/50 dark:hover:bg-gray-700/80 backdrop-blur-sm text-sm font-medium text-gray-700 dark:text-gray-200 rounded-full border border-white/40 dark:border-gray-700/50 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all"
          >
            {suggestion.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Emergency Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="pt-8"
      >
        <EmergencyButton />
      </motion.div>

    </div>
  );
}
