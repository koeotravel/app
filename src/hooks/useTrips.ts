'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSupabase } from './useSupabase';
import { useAuthStore } from '@/stores/authStore';
import type { Trip } from '@/types';

export function useTrips() {
  const supabase = useSupabase();
  const user = useAuthStore((s) => s.user);

  return useQuery({
    queryKey: ['trips', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('trip_members')
        .select('trip_id, trips(*)')
        .eq('user_id', user.id);
      if (error) throw error;
      return (data?.map((tm: { trips: Trip }) => tm.trips) ?? []) as Trip[];
    },
    enabled: !!user,
  });
}

export function useCreateTrip() {
  const supabase = useSupabase();
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);

  return useMutation({
    mutationFn: async (trip: Partial<Trip>) => {
      if (!user) throw new Error('Not authenticated');
      const { data, error } = await supabase
        .from('trips')
        .insert({ ...trip, created_by: user.id })
        .select()
        .single();
      if (error) throw error;

      // Auto-add creator as captain
      await supabase.from('trip_members').insert({
        trip_id: data.id,
        user_id: user.id,
        role: 'captain',
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
    },
  });
}
