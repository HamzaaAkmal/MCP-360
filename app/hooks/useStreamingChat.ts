'use client';

import { useState, useCallback } from 'react';
import { nanoid } from 'nanoid';

declare global {
  interface Window {
    puter: any;
  }
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface StreamingState {
  isLoading: boolean;
  streamingContent: string;
  currentStreamingId: string | null;
}

export function useStreamingChat() {
  const [state, setState] = useState<StreamingState>({
    isLoading: false,
    streamingContent: '',
    currentStreamingId: null,
  });

  const sendMessage = useCallback(
    async (
      message: string,
      messages: Message[],
      conversationId: string | null
    ): Promise<{ success: boolean; newConversationId?: string; content?: string }> => {
      if (!message.trim() || state.isLoading) {
        return { success: false };
      }

      setState(prev => ({ ...prev, isLoading: true, streamingContent: '' }));

      try {
        const prompt = [...messages, { sender: 'user', content: message }].map(m => `${m.sender === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join('\n');

        const chat_resp = await window.puter.ai.chat(prompt, {model: 'claude-sonnet-4', stream: true });

        let fullContent = '';
        const streamingId = nanoid();
        setState(prev => ({ ...prev, currentStreamingId: streamingId }));

        for await (const part of chat_resp) {
          fullContent += part?.text || '';
          setState(prev => ({ ...prev, streamingContent: fullContent }));
        }

        let newConversationId = conversationId;
        if (!conversationId) {
          newConversationId = nanoid();
        }

        return {
          success: true,
          newConversationId: newConversationId || undefined,
          content: fullContent || 'Sorry, I could not process your request.',
        };
      } catch (error) {
        console.error('Error calling puter.ai.chat:', error);
        return {
          success: false,
          content: 'Sorry, I encountered an error while processing your message. Please try again.',
        };
      } finally {
        setState(prev => ({
          ...prev,
          isLoading: false,
          streamingContent: '',
          currentStreamingId: null,
        }));
      }
    },
    [state.isLoading]
  );

  const resetStreaming = useCallback(() => {
    setState({
      isLoading: false,
      streamingContent: '',
      currentStreamingId: null,
    });
  }, []);

  return {
    ...state,
    sendMessage,
    resetStreaming,
  };
}
