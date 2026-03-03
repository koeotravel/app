'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PageTransition } from '@/components/PageTransition';
import { GlassCard } from '@/components/GlassCard';
import { Button } from '@/components/Button';
import { createClient } from '@/lib/supabase/client';
import { formatDate } from '@/lib/utils';
import type { Trip } from '@/types';
import styles from './page.module.css';

export default function InvitePage() {
  const params = useParams();
  const router = useRouter();
  const token = params.token as string;
  const [trip, setTrip] = useState<Trip | null>(null);
  const [memberCount, setMemberCount] = useState(0);
  const [error, setError] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const fetchInvite = async () => {
      const { data: invite } = await supabase
        .from('invite_links')
        .select('*, trip:trips(*)')
        .eq('token', token)
        .single();

      if (!invite) {
        setError('This invite link is invalid or has expired.');
        return;
      }

      if (invite.expires_at && new Date(invite.expires_at) < new Date()) {
        setError('This invite link has expired.');
        return;
      }

      if (invite.max_uses && invite.use_count >= invite.max_uses) {
        setError('This invite link has reached its maximum uses.');
        return;
      }

      setTrip(invite.trip as unknown as Trip);

      const { count } = await supabase
        .from('trip_members')
        .select('*', { count: 'exact', head: true })
        .eq('trip_id', (invite.trip as unknown as Trip).id);
      setMemberCount(count || 0);
    };

    fetchInvite();
  }, [token, supabase]);

  const handleJoin = async () => {
    setIsJoining(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push(`/phone?redirect=/invite/${token}`);
        return;
      }

      if (!trip) return;

      await supabase.from('trip_members').insert({
        trip_id: trip.id,
        user_id: user.id,
        role: 'crew',
      });

      await supabase
        .from('invite_links')
        .update({ use_count: memberCount + 1 })
        .eq('token', token);

      router.push('/dashboard');
    } catch {
      setError('Failed to join the trip. Please try again.');
    } finally {
      setIsJoining(false);
    }
  };

  if (error) {
    return (
      <PageTransition>
        <div className={styles.container}>
          <GlassCard className={styles.errorCard}>
            <p className={styles.errorText}>{error}</p>
            <Button onClick={() => router.push('/phone')}>Go to Login</Button>
          </GlassCard>
        </div>
      </PageTransition>
    );
  }

  if (!trip) {
    return (
      <div className={styles.container}>
        <p className={styles.loading}>Loading...</p>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className={styles.container}>
        {trip.hero_image_url && (
          <div className={styles.hero}>
            <img src={trip.hero_image_url} alt={trip.title} className={styles.heroImage} />
            <div className={styles.heroOverlay} />
          </div>
        )}
        <GlassCard className={styles.card}>
          <h1 className={styles.title}>You&apos;re invited!</h1>
          <h2 className={styles.tripTitle}>{trip.title}</h2>
          {trip.destination && <p className={styles.destination}>{trip.destination}</p>}
          {trip.start_date && trip.end_date && (
            <p className={styles.dates}>
              {formatDate(trip.start_date)} — {formatDate(trip.end_date)}
            </p>
          )}
          <p className={styles.members}>{memberCount} members</p>
          <Button size="lg" onClick={handleJoin} isLoading={isJoining}>
            Join the Trip
          </Button>
        </GlassCard>
      </div>
    </PageTransition>
  );
}
