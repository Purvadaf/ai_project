import { MessageSquare, Plus, Settings, Sun, Moon, X, HeartPulse, Activity } from 'lucide-react';
import clsx from 'clsx';

export default function Sidebar({ isOpen, setIsOpen, darkMode, toggleDarkMode, onNewChat, currentView, setCurrentView }) {
  const previousChats = [
    { id: 1, title: 'Anxiety about work presentation', date: 'Today' },
    { id: 2, title: 'Feeling overwhelmed', date: 'Yesterday' },
    { id: 3, title: 'Breathing exercises', date: 'Previous 7 Days' },
  ];

  return (
    <div
      className={clsx(
        "fixed md:relative z-30 flex flex-col h-full w-72 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-700/50 transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        !isOpen && "hidden md:flex md:w-0" // Hide on desktop if explicitly toggled off, or maybe just let it slide
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/20 dark:border-gray-700/50">
        <button 
          onClick={onNewChat}
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-lg hover:opacity-80 transition-opacity text-left"
        >
          <HeartPulse className="w-6 h-6" />
          <span>Support Companion</span>
        </button>
        <button 
          onClick={() => setIsOpen(false)}
          className="md:hidden p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation & New Chat */}
      <div className="p-4 space-y-3">
        <button 
          onClick={() => {
            onNewChat();
            if(window.innerWidth < 768) setIsOpen(false);
          }}
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors font-medium border border-blue-100 dark:border-blue-800/50"
        >
          <Plus className="w-5 h-5" />
          New Conversation
        </button>

        <div className="flex bg-gray-100/50 dark:bg-gray-800/50 p-1 rounded-xl">
          <button 
            onClick={() => setCurrentView('chat')}
            className={clsx(
              "flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-colors",
              currentView === 'chat' ? "bg-white dark:bg-gray-700 shadow-sm text-gray-800 dark:text-gray-100" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            )}
          >
            <MessageSquare className="w-4 h-4" />
            Chat
          </button>
          <button 
            onClick={() => setCurrentView('tracker')}
            className={clsx(
              "flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-colors",
              currentView === 'tracker' ? "bg-white dark:bg-gray-700 shadow-sm text-gray-800 dark:text-gray-100" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            )}
          >
            <Activity className="w-4 h-4" />
            Tracker
          </button>
        </div>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-4">
        <div>
          <p className="px-3 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Recent</p>
          <div className="space-y-1">
            {previousChats.map((chat) => (
              <button 
                key={chat.id}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left group"
              >
                <MessageSquare className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors shrink-0" />
                <span className="truncate">{chat.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer / Settings */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-700 space-y-2">
        <button 
          onClick={toggleDarkMode}
          className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left"
        >
          {darkMode ? <Sun className="w-4 h-4 text-gray-400" /> : <Moon className="w-4 h-4 text-gray-400" />}
          <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
        <button className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left">
          <Settings className="w-4 h-4 text-gray-400" />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
}
