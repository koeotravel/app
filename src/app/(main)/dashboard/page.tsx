'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useTrips } from '@/hooks/useTrips';
import { TripCard } from '@/components/TripCard';
import { Button } from '@/components/Button';
import { GlassCard } from '@/components/GlassCard';
import { Input } from '@/components/Input';
import { PageTransition } from '@/components/PageTransition';
import { Avatar } from '@/components/Avatar';
import { useCreateTrip } from '@/hooks/useTrips';
import styles from './page.module.css';

export default function DashboardPage() {
  const { user } = useAuth();
  const { data: trips, isLoading } = useTrips();
  const createTrip = useCreateTrip();
  const [showCreate, setShowCreate] = useState(false);
  const [title, setTitle] = useState('');
  const [destination, setDestination] = useState('');

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    await createTrip.mutateAsync({ title: title.trim(), destination: destination.trim() });
    setTitle('');
    setDestination('');
    setShowCreate(false);
  };

  return (
    <PageTransition>
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.greeting}>
              Hey, {user?.name || 'traveler'} 👋
            </h1>
            <p className={styles.subtitle}>Your upcoming adventures</p>
          </div>
          <Avatar name={user?.name || 'U'} src={user?.avatar_url} size="lg" />
        </header>

        <div className={styles.actions}>
          <Button onClick={() => setShowCreate(true)}>+ New Trip</Button>
        </div>

        {showCreate && (
          <GlassCard className={styles.createCard}>
            <form onSubmit={handleCreate} className={styles.createForm}>
              <Input
                placeholder="Trip name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
              />
              <Input
                placeholder="Destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
              <div className={styles.createActions}>
                <Button type="submit" isLoading={createTrip.isPending}>
                  Create Trip
                </Button>
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => setShowCreate(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </GlassCard>
        )}

        {isLoading ? (
          <div className={styles.loading}>Loading trips...</div>
        ) : trips && trips.length > 0 ? (
          <div className={styles.grid}>
            {trips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        ) : (
          <GlassCard className={styles.empty}>
            <p className={styles.emptyTitle}>No trips yet</p>
            <p className={styles.emptyText}>
              Create your first trip to start planning!
            </p>
          </GlassCard>
        )}
      </div>
    </PageTransition>
  );
}
