'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { PageTransition } from '@/components/PageTransition';
import { GlassCard } from '@/components/GlassCard';
import { Avatar } from '@/components/Avatar';
import { createClient } from '@/lib/supabase/client';
import { formatDate } from '@/lib/utils';
import type { Trip, TripMember, User } from '@/types';
import styles from './page.module.css';

const tabs = [
  { label: 'Itinerary', href: 'itinerary' },
  { label: 'Polls', href: 'polls' },
  { label: 'Chat', href: 'chat' },
  { label: 'Expenses', href: 'expenses' },
  { label: 'Settings', href: 'settings' },
];

export default function TripPage() {
  const params = useParams();
  const tripId = params.id as string;
  const [trip, setTrip] = useState<Trip | null>(null);
  const [members, setMembers] = useState<(TripMember & { user: User })[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchTrip = async () => {
      const { data } = await supabase
        .from('trips')
        .select('*')
        .eq('id', tripId)
        .single();
      setTrip(data as Trip | null);

      const { data: memberData } = await supabase
        .from('trip_members')
        .select('*, user:users(*)')
        .eq('trip_id', tripId);
      setMembers((memberData as (TripMember & { user: User })[]) || []);
    };

    fetchTrip();
  }, [tripId, supabase]);

  if (!trip) {
    return <div className={styles.loading}>Loading...</div>;
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

        <div className={styles.content}>
          <h1 className={styles.title}>{trip.title}</h1>
          <p className={styles.destination}>{trip.destination}</p>
          {trip.start_date && trip.end_date && (
            <p className={styles.dates}>
              {formatDate(trip.start_date)} — {formatDate(trip.end_date)}
            </p>
          )}

          <div className={styles.members}>
            {members.map((m) => (
              <Avatar key={m.id} name={m.user?.name || 'U'} src={m.user?.avatar_url} size="sm" />
            ))}
            <span className={styles.memberCount}>{members.length} members</span>
          </div>

          <nav className={styles.tabs}>
            {tabs.map((tab) => (
              <Link
                key={tab.href}
                href={`/trips/${tripId}/${tab.href}`}
                className={styles.tab}
              >
                {tab.label}
              </Link>
            ))}
          </nav>

          {trip.description && (
            <GlassCard className={styles.descriptionCard}>
              <p>{trip.description}</p>
            </GlassCard>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
