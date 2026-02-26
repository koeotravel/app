'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { GlassCard } from '@/components/GlassCard';
import { PageTransition } from '@/components/PageTransition';
import { createClient } from '@/lib/supabase/client';
import styles from './page.module.css';

export default function ProfileSetupPage() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/phone');
        return;
      }

      const { error: upsertError } = await supabase
        .from('users')
        .upsert({
          id: user.id,
          phone: user.email || user.phone || '',
          name: name.trim(),
          created_at: new Date().toISOString(),
        });

      if (upsertError) {
        setError(upsertError.message);
        return;
      }

      router.push('/dashboard');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageTransition>
      <GlassCard className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Set Up Your Profile</h1>
          <p className={styles.subtitle}>What should we call you?</p>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={error}
            autoFocus
          />
          <Button type="submit" size="lg" isLoading={isLoading}>
            Let&apos;s Go
          </Button>
        </form>
      </GlassCard>
    </PageTransition>
  );
}
