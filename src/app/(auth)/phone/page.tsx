'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { GlassCard } from '@/components/GlassCard';
import { PageTransition } from '@/components/PageTransition';
import { createClient } from '@/lib/supabase/client';
import styles from './page.module.css';

export default function PhonePage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    setIsLoading(true);
    try {
      const { error: authError } = await supabase.auth.signInWithOtp({
        email: email.trim(),
      });

      if (authError) {
        const isEmailProviderDisabled =
          authError.message.toLowerCase().includes('email provider is disabled') ||
          authError.message.toLowerCase().includes('email logins are disabled') ||
          authError.message.toLowerCase().includes('signups not allowed');
        setError(
          isEmailProviderDisabled
            ? 'Email login is disabled in Supabase. Enable Email provider and signups in Auth > Providers > Email.'
            : authError.message
        );
        return;
      }

      router.push(`/verify?email=${encodeURIComponent(email.trim())}`);
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
          <h1 className={styles.title}>Welcome to Coeo</h1>
          <p className={styles.subtitle}>Enter your email to sign in or create an account</p>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error}
            autoFocus
          />
          <Button type="submit" size="lg" isLoading={isLoading}>
            Continue
          </Button>
        </form>
      </GlassCard>
    </PageTransition>
  );
}
