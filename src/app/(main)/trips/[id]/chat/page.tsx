'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { PageTransition } from '@/components/PageTransition';
import { Avatar } from '@/components/Avatar';
import { createClient } from '@/lib/supabase/client';
import type { Message, User } from '@/types';
import styles from './page.module.css';

export default function ChatPage() {
  const params = useParams();
  const tripId = params.id as string;
  const [messages, setMessages] = useState<(Message & { user?: User })[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUserId, setCurrentUserId] = useState<string>('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setCurrentUserId(user.id);

      const { data } = await supabase
        .from('messages')
        .select('*, user:users(*)')
        .eq('trip_id', tripId)
        .order('created_at', { ascending: true })
        .limit(100);
      setMessages((data as (Message & { user?: User })[]) || []);
    };
    init();

    const channel = supabase
      .channel(`messages:${tripId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `trip_id=eq.${tripId}` },
        async (payload) => {
          const { data: user } = await supabase
            .from('users')
            .select('*')
            .eq('id', payload.new.user_id)
            .single();
          setMessages((prev) => [...prev, { ...payload.new as Message, user: user as User }]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [tripId, supabase]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    await supabase.from('messages').insert({
      trip_id: tripId,
      user_id: currentUserId,
      content: newMessage.trim(),
    });

    setNewMessage('');
  };

  return (
    <PageTransition>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Chat</h2>
        </div>

        <div className={styles.messages}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`${styles.message} ${msg.user_id === currentUserId ? styles.own : ''}`}
            >
              {msg.user_id !== currentUserId && (
                <Avatar name={msg.user?.name || 'U'} src={msg.user?.avatar_url} size="sm" />
              )}
              <div className={styles.bubble}>
                {msg.user_id !== currentUserId && (
                  <span className={styles.sender}>{msg.user?.name}</span>
                )}
                <p className={styles.content}>{msg.content}</p>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <form onSubmit={handleSend} className={styles.inputBar}>
          <input
            className={styles.input}
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button type="submit" className={styles.sendButton}>
            Send
          </button>
        </form>
      </div>
    </PageTransition>
  );
}
