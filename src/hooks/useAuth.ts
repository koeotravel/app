'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useSupabase } from './useSupabase';
import type { User } from '@/types';

export function useAuth() {
  const supabase = useSupabase();
  const { user, isLoading, setUser, setLoading } = useAuthStore();

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (authUser) {
          const { data } = await supabase
            .from('users')
            .select('*')
            .eq('id', authUser.id)
            .single();
          setUser(data as User | null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          const { data } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();
          setUser(data as User | null);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase, setUser, setLoading]);

  return { user, isLoading };
}
