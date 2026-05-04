import clsx from 'clsx';
import { HeartPulse, User } from 'lucide-react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ChatMessage({ message, isTyping }) {
  const isUser = message.role === 'user';

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 20 
      }}
      className={clsx(
        "flex w-full",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div className={clsx(
        "flex max-w-[90%] md:max-w-[80%] gap-3",
        isUser ? "flex-row-reverse" : "flex-row"
      )}>
        {/* Avatar */}
        <div className={clsx(
          "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-auto sm:mt-0",
          isUser 
            ? "bg-gray-200 dark:bg-gray-700 text-gray-500" 
            : "bg-support-blue dark:bg-blue-900/40 text-blue-500"
        )}>
          {isUser ? <User className="w-5 h-5" /> : <HeartPulse className="w-5 h-5" />}
        </div>

        {/* Message Bubble */}
        <div className={clsx(
          "px-5 py-3.5 rounded-2xl relative text-[15px] leading-relaxed shadow-sm",
          isUser 
            ? "bg-gradient-to-tr from-gray-900 to-gray-800 text-white dark:from-gray-100 dark:to-white dark:text-gray-900 rounded-br-sm shadow-md" 
            : "bg-white/80 backdrop-blur-md border border-white/40 dark:bg-gray-800/80 dark:border-gray-700/50 dark:text-gray-200 rounded-bl-sm prose dark:prose-invert prose-sm max-w-none"
        )}>
          {isTyping ? (
            <div className="flex gap-1.5 items-center h-6 px-2 typing-wave">
              <span className="w-2 h-2 bg-blue-500/60 dark:bg-blue-400/60 rounded-full" style={{ animationDelay: '0ms' }}></span>
              <span className="w-2 h-2 bg-blue-500/60 dark:bg-blue-400/60 rounded-full" style={{ animationDelay: '150ms' }}></span>
              <span className="w-2 h-2 bg-blue-500/60 dark:bg-blue-400/60 rounded-full" style={{ animationDelay: '300ms' }}></span>
            </div>
          ) : isUser ? (
            <p>{message.content}</p>
          ) : (
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal pl-4 mb-2 space-y-1" {...props} />,
                li: ({node, ...props}) => <li className="marker:text-blue-500" {...props} />,
                strong: ({node, ...props}) => <strong className="font-semibold text-gray-900 dark:text-white" {...props} />,
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}
        </div>
      </div>
    </motion.div>
  );
}
