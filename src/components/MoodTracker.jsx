import { useMemo, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { Activity, PieChart, TrendingUp, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import MoodSelector from './MoodSelector';

export default function MoodTracker({ moodData, onLogMood, onClearData }) {
  const [showToast, setShowToast] = useState(false);
  // Format data for Line Chart (Trends over time)
  const lineChartData = useMemo(() => {
    return moodData.map(entry => {
      const date = new Date(entry.date);
      return {
        name: date.toLocaleDateString('en-US', { weekday: 'short' }),
        score: entry.score,
        mood: entry.mood,
        emoji: entry.emoji
      };
    }).slice(-14); // Last 14 entries
  }, [moodData]);

  // Format data for Bar Chart (Frequency of moods)
  const barChartData = useMemo(() => {
    const counts = { Good: 0, Okay: 0, Sad: 0, Anxious: 0, Angry: 0 };
    moodData.forEach(entry => {
      if (counts[entry.mood] !== undefined) counts[entry.mood]++;
    });
    
    return [
      { name: 'Good', count: counts.Good, color: '#34d399' }, // Green
      { name: 'Okay', count: counts.Okay, color: '#94a3b8' }, // Slate
      { name: 'Sad', count: counts.Sad, color: '#60a5fa' }, // Blue
      { name: 'Anxious', count: counts.Anxious, color: '#fbbf24' }, // Amber
      { name: 'Angry', count: counts.Angry, color: '#f87171' }, // Red
    ].filter(item => item.count > 0);
  }, [moodData]);

  // Calculate dynamic insights based on recent data
  const insights = useMemo(() => {
    if (!moodData || moodData.length === 0) {
      return { 
        title: "Not enough data", 
        message: "Keep logging your moods to unlock personalized insights and suggestions.", 
        icon: "🔍", 
        color: "text-gray-500", 
        bg: "bg-gray-50 dark:bg-gray-800/50", 
        borderColor: "border-gray-200 dark:border-gray-700" 
      };
    }

    const recent = moodData.slice(-5);
    const avgScore = recent.reduce((sum, entry) => sum + entry.score, 0) / recent.length;
    const negativeCount = recent.filter(e => e.score <= 2).length;
    
    if (negativeCount >= 3) {
      return { 
        title: "Tough Week", 
        message: "You've had a few difficult days recently. Please remember to be kind to yourself. Consider trying the quick relaxing exercises in the chat, or talk to someone you trust.",
        icon: "🫂",
        color: "text-blue-600 dark:text-blue-400",
        bg: "bg-blue-50 dark:bg-blue-900/20",
        borderColor: "border-blue-200 dark:border-blue-800/50"
      };
    } else if (avgScore >= 4) {
      return {
        title: "Doing Great!",
        message: "Your recent mood has been overwhelmingly positive! Whatever you're doing, keep it up. This is a great time to tackle challenging tasks or share your good energy.",
        icon: "🌟",
        color: "text-green-600 dark:text-green-400",
        bg: "bg-green-50 dark:bg-green-900/20",
        borderColor: "border-green-200 dark:border-green-800/50"
      };
    } else if (avgScore >= 3) {
       return {
        title: "Steady & Balanced",
        message: "You've been hovering around an 'Okay' state. To lift your spirits, maybe try going for a walk, listening to upbeat music, or doing a quick daily reflection.",
        icon: "⚖️",
        color: "text-purple-600 dark:text-purple-400",
        bg: "bg-purple-50 dark:bg-purple-900/20",
        borderColor: "border-purple-200 dark:border-purple-800/50"
      };
    } else {
       return {
        title: "Mixed Feelings",
        message: "Your emotions have been fluctuating recently. That's completely normal! Take things one day at a time and prioritize a little self-care today.",
        icon: "🎢",
        color: "text-amber-600 dark:text-amber-400",
        bg: "bg-amber-50 dark:bg-amber-900/20",
        borderColor: "border-amber-200 dark:border-amber-800/50"
      };
    }
  }, [moodData]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-3 border border-gray-100 dark:border-gray-700 rounded-xl shadow-lg">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{data.name}</p>
          <p className="text-lg font-bold flex items-center gap-2 text-gray-800 dark:text-gray-100">
            {data.emoji} {data.mood}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex-1 overflow-y-auto w-full bg-white/40 dark:bg-gray-900/40 backdrop-blur-md rounded-tl-none md:rounded-tl-2xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] border-l border-white/20 dark:border-gray-800/50 p-6 sm:p-10">
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Mental Health Dashboard</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Track your emotional well-being over time.</p>
            </div>
          </div>
          
          <button 
            onClick={() => {
              if (window.confirm("Are you sure you want to delete all your mood tracking data? This cannot be undone.")) {
                onClearData();
              }
            }}
            className="flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 dark:bg-red-900/10 dark:hover:bg-red-900/30 rounded-lg transition-colors border border-red-100 dark:border-red-900/30"
          >
            <Trash2 className="w-4 h-4" />
            <span className="font-medium">Reset Data</span>
          </button>
        </div>

        {/* Quick Log Mood Box */}
        <div className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg border border-white/40 dark:border-gray-700/50 rounded-3xl shadow-sm relative">
          {showToast && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-4 left-1/2 -translate-x-1/2 bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200 px-4 py-2 rounded-full text-sm font-medium shadow-sm z-10"
            >
              Mood logged successfully!
            </motion.div>
          )}
          <MoodSelector onSelectMood={(moodObj) => {
            if (onLogMood) {
              onLogMood(moodObj.label, moodObj.score, moodObj.emoji);
              setShowToast(true);
              setTimeout(() => setShowToast(false), 3000);
            }
          }} />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg border border-white/40 dark:border-gray-700/50 rounded-2xl shadow-sm flex flex-col justify-between">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Total Check-ins</h3>
            <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{moodData.length}</p>
          </div>
          <div className="p-5 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg border border-white/40 dark:border-gray-700/50 rounded-2xl shadow-sm flex flex-col justify-between">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Most Frequent</h3>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {barChartData.length > 0 ? barChartData.reduce((prev, current) => (prev.count > current.count) ? prev : current).name : 'N/A'}
            </p>
          </div>
          <div className="p-5 bg-gradient-to-br from-support-blue to-support-lavender dark:from-blue-900/40 dark:to-purple-900/40 backdrop-blur-lg border border-white/40 dark:border-gray-700/50 rounded-2xl shadow-sm flex flex-col justify-between">
            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">Current Streak</h3>
            <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">3 Days 🔥</p>
          </div>
        </div>

        {/* AI Insights & Suggestions Box */}
        <div className={`p-6 backdrop-blur-lg border rounded-3xl shadow-sm flex flex-col sm:flex-row gap-5 items-start sm:items-center ${insights.bg} ${insights.borderColor}`}>
          <div className="text-4xl sm:text-5xl bg-white/50 dark:bg-gray-800/50 p-4 rounded-2xl shadow-sm border border-white/40 dark:border-gray-700/50">
            {insights.icon}
          </div>
          <div>
            <h2 className={`text-lg font-bold mb-1 ${insights.color}`}>
              {insights.title}
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {insights.message}
            </p>
          </div>
        </div>

        {/* Charts Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Line Chart */}
          <div className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg border border-white/40 dark:border-gray-700/50 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-gray-400" />
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Mood Timeline</h2>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineChartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#9ca3af" strokeOpacity={0.2} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                  <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="score" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, fill: '#8b5cf6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg border border-white/40 dark:border-gray-700/50 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <PieChart className="w-5 h-5 text-gray-400" />
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Mood Distribution</h2>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#9ca3af" strokeOpacity={0.2} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                  <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <Tooltip cursor={{ fill: 'rgba(156, 163, 175, 0.1)' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {barChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
