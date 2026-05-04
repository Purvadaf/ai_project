import { Menu, MoreVertical } from 'lucide-react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import Onboarding from './Onboarding';
import { useRef, useEffect } from 'react';

export default function ChatArea({ messages, isTyping, onSendMessage, toggleSidebar }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-full w-full bg-white/40 dark:bg-gray-900/40 backdrop-blur-md rounded-tl-none md:rounded-tl-2xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)] border-l border-white/20 dark:border-gray-800/50 transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/20 dark:border-gray-800/50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleSidebar}
            className="md:hidden p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100">AI Companion</h2>
            <p className="text-xs text-green-500 font-medium flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
              Online
            </p>
          </div>
        </div>
        <button className="p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      {/* Messages / Onboarding */}
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        {messages.length === 0 ? (
          <Onboarding onSuggestionClick={onSendMessage} />
        ) : (
          <div className="max-w-3xl mx-auto space-y-6 pb-4">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {isTyping && (
              <ChatMessage 
                message={{ role: 'ai', content: '' }} 
                isTyping={true} 
              />
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg border-t border-white/20 dark:border-gray-800/50">
        <div className="max-w-3xl mx-auto">
          <ChatInput onSend={onSendMessage} disabled={isTyping} />
        </div>
      </div>
    </div>
  );
}
