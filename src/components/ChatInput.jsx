import { useState, useRef } from 'react';
import { Send, Smile, Paperclip, X } from 'lucide-react';
import clsx from 'clsx';
import EmojiPicker from 'emoji-picker-react';

export default function ChatInput({ onSend, disabled }) {
  const [text, setText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [attachment, setAttachment] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  const onEmojiClick = (emojiObject) => {
    setText((prev) => prev + emojiObject.emoji);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((text.trim() || attachment) && !disabled) {
      let finalMsg = text.trim();
      if (attachment) {
        finalMsg += `\n*[Attached file: ${attachment.name}]*`;
      }
      onSend(finalMsg);
      setText('');
      setAttachment(null);
      setShowEmojiPicker(false);
    }
  };

  return (
    <div className="relative">
      {/* Attachment Indicator */}
      {attachment && (
        <div className="absolute -top-10 left-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-700 dark:text-gray-200 text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-2 border border-gray-200 dark:border-gray-700 shadow-sm z-10">
          <Paperclip className="w-3 h-3" />
          <span className="truncate max-w-[150px]">{attachment.name}</span>
          <button 
            type="button" 
            onClick={() => setAttachment(null)} 
            className="hover:text-red-500 transition-colors bg-gray-100 dark:bg-gray-700 rounded-full p-0.5"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Emoji Picker Popover */}
      {showEmojiPicker && (
        <div className="absolute bottom-20 right-0 z-50 shadow-2xl rounded-lg">
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowEmojiPicker(false)}
          />
          <div className="relative z-50">
            <EmojiPicker onEmojiClick={onEmojiClick} theme="auto" />
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="relative flex items-center">
        {/* Hidden File Input */}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
        />

        <div className="absolute left-3 flex items-center gap-2">
          <button 
            type="button" 
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Paperclip className="w-5 h-5" />
          </button>
        </div>
        
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="How are you feeling today?"
          disabled={disabled}
          className={clsx(
            "w-full py-4 pl-14 pr-24 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-white/40 dark:border-gray-700/50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400/50 dark:focus:ring-blue-500/50 focus:border-transparent transition-all shadow-[0_4px_16px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.2)] text-gray-800 dark:text-gray-100",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        />

        <div className="absolute right-2 flex items-center gap-1">
          <button 
            type="button" 
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 hidden sm:block"
          >
            <Smile className="w-5 h-5" />
          </button>
          <button 
            type="submit" 
            disabled={(!text.trim() && !attachment) || disabled}
            className="p-2 ml-1 bg-support-blue text-blue-600 dark:bg-blue-600 dark:text-white rounded-full hover:bg-blue-200 dark:hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
