import { Phone } from 'lucide-react';

export default function EmergencyButton() {
  return (
    <button className="flex items-center gap-2 px-4 py-2 bg-rose-50 hover:bg-rose-100 dark:bg-rose-900/20 dark:hover:bg-rose-900/40 text-rose-600 dark:text-rose-400 rounded-full transition-colors border border-rose-100 dark:border-rose-900/50 text-sm font-medium">
      <Phone className="w-4 h-4" />
      Talk to someone
    </button>
  );
}
