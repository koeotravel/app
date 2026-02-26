'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { GlassCard } from '@/components/GlassCard';
import { PageTransition } from '@/components/PageTransition';
import { createClient } from '@/lib/supabase/client';
import styles from './page.module.css';

export default function VerifyPage() {
  return (
    <Suspense fallback={<div style={{ color: 'var(--color-zinc-500)', textAlign: 'center', padding: '48px' }}>Loading...</div>}>
      <VerifyForm />
    </Suspense>
  );
}

function VerifyForm() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (otp.length !== 6) {
      setError('Please enter the 6-digit code');
      return;
    }

    setIsLoading(true);
    try {
      const { data, error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'email',
      });

      if (verifyError) {
        setError(verifyError.message);
        return;
      }

      if (data.user) {
        // Check if user has a profile
        const { data: profile } = await supabase
          .from('users')
          .select('name')
          .eq('id', data.user.id)
          .single();

        if (!profile?.name) {
          router.push('/profile-setup');
        } else {
          router.push('/dashboard');
        }
      }
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
          <h1 className={styles.title}>Enter Code</h1>
          <p className={styles.subtitle}>
            We sent a 6-digit code to <strong>{email}</strong>
          </p>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            type="text"
            placeholder="000000"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
            maxLength={6}
            error={error}
            autoFocus
          />
          <Button type="submit" size="lg" isLoading={isLoading}>
            Verify
          </Button>
        </form>
      </GlassCard>
    </PageTransition>
  );
}
