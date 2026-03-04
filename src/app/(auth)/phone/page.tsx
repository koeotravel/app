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
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [useOtp, setUseOtp] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handlePostLogin = async (userId: string) => {
    try {
      const { data: profile } = await supabase
        .from('users')
        .select('name')
        .eq('id', userId)
        .single();

      if (!profile?.name) {
        router.push('/profile-setup');
      } else {
        router.push('/dashboard');
      }
    } catch {
      router.push('/profile-setup');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    setIsLoading(true);
    try {
      if (useOtp) {
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
      } else {
        if (!password) {
          setError('Please enter your password');
          return;
        }

        const { data, error: authError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (authError) {
          setError(authError.message);
          return;
        }

        if (data.user) {
          await handlePostLogin(data.user.id);
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
          <h1 className={styles.title}>Welcome to Coeo</h1>
          <p className={styles.subtitle}>
            {useOtp
              ? 'Enter your email to receive a sign-in code'
              : 'Enter your email and password to sign in'}
          </p>
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
          {!useOtp && (
            <Input
              type="password"
              placeholder="Password"
              aria-label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}
          <Button type="submit" size="lg" isLoading={isLoading}>
            {useOtp ? 'Send Code' : 'Sign In'}
          </Button>
        </form>
        <button
          type="button"
          className={styles.toggleLink}
          onClick={() => {
            setUseOtp(!useOtp);
            setPassword('');
            setError('');
          }}
        >
          {useOtp ? 'Sign in with password' : 'Sign in with email code instead'}
        </button>
      </GlassCard>
    </PageTransition>
  );
}
