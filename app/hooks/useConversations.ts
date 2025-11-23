'use client';

import { useState, useCallback, useEffect } from 'react';

interface Conversation {
  id: string;
  title: string | null;
  created_at: string;
  updated_at: string;
}

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  const loadConversations = useCallback(() => {
    const stored = localStorage.getItem('conversations');
    if (stored) {
      setConversations(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  return {
    conversations,
    loadConversations,
  };
}
