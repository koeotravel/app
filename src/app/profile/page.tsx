'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageTransition } from '@/components/PageTransition';
import { GlassCard } from '@/components/GlassCard';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Avatar } from '@/components/Avatar';
import { createClient } from '@/lib/supabase/client';
import styles from './page.module.css';

export default function ProfilePage() {
  const [name, setName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/phone');
        return;
      }
      const { data } = await supabase.from('users').select('*').eq('id', user.id).single();
      if (data) {
        setName(data.name || '');
        setAvatarUrl(data.avatar_url || '');
      }
    };
    fetchProfile();
  }, [supabase, router]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('users')
      .update({ name: name.trim(), avatar_url: avatarUrl.trim() || null })
      .eq('id', user.id);

    setIsSaving(false);
    setMessage(error ? 'Failed to save.' : 'Profile updated!');
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/phone');
  };

  return (
    <PageTransition>
      <div className={styles.container}>
        <h1 className={styles.title}>Profile</h1>

        <GlassCard className={styles.card}>
          <div className={styles.avatarSection}>
            <Avatar name={name || 'U'} src={avatarUrl} size="lg" />
          </div>
          <form onSubmit={handleSave} className={styles.form}>
            <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input label="Avatar URL" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} placeholder="https://..." />
            <Button type="submit" isLoading={isSaving}>Save Changes</Button>
            {message && <p className={styles.message}>{message}</p>}
          </form>
        </GlassCard>

        <Button variant="destructive" onClick={handleSignOut}>Sign Out</Button>
      </div>
    </PageTransition>
  );
}
