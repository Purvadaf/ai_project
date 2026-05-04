import { useEffect } from 'react';

export const useHotkey = (callback) => {
    useEffect(() => {
        const handleKeyDown = (event) => {
            const activeElement = document.activeElement;
            const activeTag = activeElement ? activeElement.tagName.toLowerCase() : '';
            
            // Prevent hotkey from triggering while user is typing in form fields
            const isInput = activeTag === 'input' || 
                            activeTag === 'textarea' || 
                            activeElement?.isContentEditable;

            if (isInput) return;

            // Trigger on Alt + Shift + 2
            if (event.altKey && event.shiftKey && (event.key === '2' || event.code === 'Digit2')) {
                event.preventDefault();
                callback();
            }
        };

        document.addEventListener('keydown', handleKeyDown, { capture: true });
        
        return () => {
            document.removeEventListener('keydown', handleKeyDown, { capture: true });
        };
    }, [callback]);
};
