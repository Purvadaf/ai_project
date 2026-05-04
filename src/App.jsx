import { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import MoodTracker from './components/MoodTracker';
import { getGeminiChatSession } from './services/gemini';
import { useMoodData } from './hooks/useMoodData';
import AssistantPanel from './components/AssistantPanel';
import { useHotkey } from './hooks/useHotkey';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentView, setCurrentView] = useState('chat');
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const chatSessionRef = useRef(null);
  const { moodData, addMoodEntry, clearMoodData } = useMoodData();

  useHotkey(() => {
    setIsAssistantOpen(prev => !prev);
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Initialize Gemini Session
  useEffect(() => {
    try {
      chatSessionRef.current = getGeminiChatSession();
    } catch (error) {
      console.warn("Gemini API not initialized. Please set VITE_GEMINI_API_KEY in .env");
    }
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  
  const handleNewChat = () => {
    setCurrentView('chat');
    setMessages([]);
    try {
      chatSessionRef.current = getGeminiChatSession();
    } catch (error) {
      // Ignore
    }
  };

  const handleSendMessage = async (text, moodLabel = null, score = null, emoji = null) => {
    // If it's a mood check-in, record it
    if (moodLabel && score && emoji) {
      addMoodEntry(moodLabel, score, emoji);
    }

    setCurrentView('chat');

    // Add user message
    const newUserMsg = { id: Date.now(), role: 'user', content: text };
    setMessages((prev) => [...prev, newUserMsg]);
    setIsTyping(true);

    if (!chatSessionRef.current) {
      setTimeout(() => {
        setMessages((prev) => [...prev, { 
          id: Date.now() + 1, 
          role: 'ai', 
          content: "⚠️ **API Key Missing**\n\nTo enable the advanced AI companion, please create a `.env` file in the root directory of this project, add `VITE_GEMINI_API_KEY=your_actual_api_key_here`, and restart the app." 
        }]);
        setIsTyping(false);
      }, 1000);
      return;
    }

    try {
      // Send message to Gemini
      const result = await chatSessionRef.current.sendMessage(text);
      const responseText = result.response.text();
      
      const newAiMsg = { id: Date.now() + 1, role: 'ai', content: responseText };
      setMessages((prev) => [...prev, newAiMsg]);
    } catch (error) {
      console.error("Error communicating with Gemini:", error);
      setMessages((prev) => [...prev, { 
        id: Date.now() + 1, 
        role: 'ai', 
        content: "I'm sorry, I'm having trouble connecting right now. Please check your internet connection or API key." 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden animated-gradient-bg transition-colors duration-300">
      {/* Mobile Sidebar Overlay */}
      {!isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 z-20 bg-black/50" 
          onClick={() => setIsSidebarOpen(true)}
        />
      )}

      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode}
        onNewChat={handleNewChat}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      {/* Main Area */}
      <div className="flex-1 flex flex-col h-full relative w-full overflow-hidden">
        {currentView === 'tracker' ? (
          <MoodTracker moodData={moodData} onLogMood={addMoodEntry} onClearData={clearMoodData} />
        ) : (
          <ChatArea 
            messages={messages} 
            isTyping={isTyping} 
            onSendMessage={handleSendMessage} 
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        )}
      </div>
      {isAssistantOpen && (
        <AssistantPanel 
          currentContext="Mental Health Tracking and Support Chatbot Navigation" 
          onClose={() => setIsAssistantOpen(false)} 
        />
      )}
    </div>
  );
}

export default App;
