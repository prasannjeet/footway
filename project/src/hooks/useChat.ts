import { useState, useCallback } from 'react';
import { Message } from '../types/chat';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI shopping assistant. How can I help you find the perfect outfit today?",
      role: 'assistant',
      timestamp: new Date(),
    },
  ]);

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      // TODO: Replace with actual AI API call
      const response = await new Promise<string>(resolve => 
        setTimeout(() => resolve("I'll help you find the perfect items based on your preferences. Could you tell me more about what you're looking for?"), 1000)
      );

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Failed to get AI response:', error);
    }
  }, []);

  return { messages, sendMessage };
};