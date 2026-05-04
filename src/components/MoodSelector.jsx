import { motion } from 'framer-motion';

export default function MoodSelector({ onSelectMood }) {
  const moods = [
    { emoji: '🙂', label: 'Good', score: 5 },
    { emoji: '😐', label: 'Okay', score: 3 },
    { emoji: '😞', label: 'Sad', score: 2 },
    { emoji: '😰', label: 'Anxious', score: 2 },
    { emoji: '😡', label: 'Angry', score: 1 },
  ];

  return (
    <div className="flex flex-col items-center space-y-4">
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">How are you feeling right now?</p>
      <div className="flex gap-3 sm:gap-4 flex-wrap justify-center">
        {moods.map((mood, idx) => (
          <motion.button
            key={mood.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1, type: "spring", stiffness: 300 }}
            whileHover={{ scale: 1.15, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectMood(mood)}
            className="flex flex-col items-center gap-2 p-3 sm:p-4 rounded-3xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-md shadow-sm border border-white/40 dark:border-gray-700/50 hover:bg-white hover:shadow-md dark:hover:bg-gray-700 transition-colors duration-200 group"
          >
            <span className="text-3xl sm:text-4xl grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-200">{mood.emoji}</span>
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400">{mood.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
