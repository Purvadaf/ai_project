import { ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export default function CheckInCard({ title, description, action, onClick, color = "bg-support-lavender/40 dark:bg-purple-900/20" }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={clsx("p-5 rounded-3xl shadow-sm border border-white/40 dark:border-gray-800 backdrop-blur-md cursor-pointer", color)} 
      onClick={onClick}
    >
      <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{description}</p>
      <button className="flex items-center gap-1 text-sm font-medium text-gray-800 dark:text-gray-200 hover:gap-2 transition-all">
        {action}
        <ArrowRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
