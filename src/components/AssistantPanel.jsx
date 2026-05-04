import React, { useState, useEffect } from 'react';
import { getAssistantResponse } from '../services/gemini';

// ==========================================
// API Service wrapper for hints
// ==========================================
const getAIHint = async (questionText) => {
    try {
        const prompt = `A student needs help understanding the following question/context. 
        Provide ONLY hints, reasoning steps, or conceptual explanations. 
        DO NOT provide the final correct answer or solve it completely for them.
        
        Question/Context: "${questionText}"`;
        
        const response = await getAssistantResponse(prompt);
        return response;
    } catch (error) {
        console.error("Failed to fetch AI hint:", error);
        throw new Error("Unable to reach the AI service. Please check your API key.");
    }
};

// ==========================================
// Assistant Panel Component
// ==========================================
const AssistantPanel = ({ currentContext = "General navigation", onClose }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [hint, setHint] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (currentContext && !hint && !isLoading) {
            fetchHintData(currentContext);
        }
    }, [currentContext]);

    const fetchHintData = async (text) => {
        setIsLoading(true);
        setError('');
        setHint(''); 

        try {
            const response = await getAIHint(text);
            setHint(response);
        } catch (err) {
            setError(err.message || "Failed to load hint.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: '380px',
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 20px',
                borderBottom: '1px solid #f1f5f9',
                backgroundColor: '#f8fafc'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '18px' }}>💡</span>
                    <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#0f172a' }}>
                        AI Hint Assistant
                    </h3>
                </div>
                <button 
                    onClick={onClose}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '20px',
                        color: '#94a3b8',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    aria-label="Close panel"
                >
                    &times;
                </button>
            </div>
            
            {/* Content Area */}
            <div style={{ padding: '24px 20px', minHeight: '120px', maxHeight: '400px', overflowY: 'auto' }}>
                {isLoading ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '20px 0' }}>
                        <div style={{
                            width: '24px',
                            height: '24px',
                            border: '3px solid #e2e8f0',
                            borderTopColor: '#6366f1',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite'
                        }}>
                            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                        </div>
                        <span style={{ fontSize: '14px', color: '#64748b' }}>Generating hints...</span>
                    </div>
                ) : error ? (
                     <div style={{ color: '#ef4444', fontSize: '14px', textAlign: 'center', padding: '20px 0' }}>
                        {error}
                     </div>
                ) : (
                    <div style={{ 
                        fontSize: '14px', 
                        lineHeight: 1.6, 
                        color: '#334155', 
                        whiteSpace: 'pre-wrap' 
                    }}>
                        {hint}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div style={{ 
                padding: '12px 20px', 
                backgroundColor: '#f8fafc', 
                borderTop: '1px solid #f1f5f9',
                fontSize: '12px',
                color: '#94a3b8',
                textAlign: 'center'
            }}>
                Answers are not auto-filled.
            </div>
        </div>
    );
};

export default AssistantPanel;
