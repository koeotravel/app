'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PageTransition } from '@/components/PageTransition';
import { GlassCard } from '@/components/GlassCard';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Avatar } from '@/components/Avatar';
import { createClient } from '@/lib/supabase/client';
import type { Trip, TripMember, User } from '@/types';
import styles from './page.module.css';

export default function SettingsPage() {
  const params = useParams();
  const router = useRouter();
  const tripId = params.id as string;
  const [trip, setTrip] = useState<Trip | null>(null);
  const [members, setMembers] = useState<(TripMember & { user: User })[]>([]);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteStatus, setInviteStatus] = useState('');
  const supabase = createClient();

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('trips').select('*').eq('id', tripId).single();
      setTrip(data as Trip | null);

      const { data: memberData } = await supabase
        .from('trip_members')
        .select('*, user:users(*)')
        .eq('trip_id', tripId);
      setMembers((memberData as (TripMember & { user: User })[]) || []);
    };
    fetch();
  }, [tripId, supabase]);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    setInviteStatus('Sending...');
    try {
      const response = await globalThis.fetch('/api/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tripId, email: inviteEmail.trim() }),
      });

      if (response.ok) {
        setInviteStatus('Invite sent!');
        setInviteEmail('');
      } else {
        setInviteStatus('Failed to send invite.');
      }
    } catch {
      setInviteStatus('Failed to send invite.');
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this trip?')) return;
    await supabase.from('trips').delete().eq('id', tripId);
    router.push('/dashboard');
  };

  if (!trip) return <div className={styles.loading}>Loading...</div>;

  return (
    <PageTransition>
      <div className={styles.container}>
        <h2 className={styles.title}>Trip Settings</h2>

        <GlassCard className={styles.section}>
          <h3 className={styles.sectionTitle}>Members ({members.length})</h3>
          <div className={styles.memberList}>
            {members.map((m) => (
              <div key={m.id} className={styles.member}>
                <Avatar name={m.user?.name || 'U'} src={m.user?.avatar_url} size="sm" />
                <div>
                  <p className={styles.memberName}>{m.user?.name}</p>
                  <p className={styles.memberRole}>{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className={styles.section}>
          <h3 className={styles.sectionTitle}>Invite Members</h3>
          <form onSubmit={handleInvite} className={styles.inviteForm}>
            <Input
              type="email"
              placeholder="Email address"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
            />
            <Button type="submit" size="sm">Send Invite</Button>
          </form>
          {inviteStatus && <p className={styles.inviteStatus}>{inviteStatus}</p>}
        </GlassCard>

        <GlassCard className={styles.section}>
          <h3 className={styles.sectionTitle}>Danger Zone</h3>
          <Button variant="destructive" onClick={handleDelete}>
            Delete Trip
          </Button>
        </GlassCard>
      </div>
    </PageTransition>
  );
}
