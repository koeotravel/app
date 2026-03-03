'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { PageTransition } from '@/components/PageTransition';
import { GlassCard } from '@/components/GlassCard';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { createClient } from '@/lib/supabase/client';
import type { Poll } from '@/types';
import styles from './page.module.css';

export default function PollsPage() {
  const params = useParams();
  const tripId = params.id as string;
  const [polls, setPolls] = useState<Poll[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const supabase = createClient();

  useEffect(() => {
    const fetchPolls = async () => {
      const { data } = await supabase
        .from('polls')
        .select('*')
        .eq('trip_id', tripId)
        .order('created_at', { ascending: false });
      setPolls((data as Poll[]) || []);
    };
    fetchPolls();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tripId]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || options.filter((o) => o.trim()).length < 2) return;

    const { data: { user } } = await supabase.auth.getUser();
    const pollOptions = options
      .filter((o) => o.trim())
      .map((text, i) => ({ id: String(i), text: text.trim() }));

    const { data, error } = await supabase
      .from('polls')
      .insert({
        trip_id: tripId,
        question: question.trim(),
        options: pollOptions,
        type: 'multiple_choice',
        created_by: user?.id,
      })
      .select()
      .single();

    if (!error && data) {
      setPolls([data as Poll, ...polls]);
      setQuestion('');
      setOptions(['', '']);
      setShowCreate(false);
    }
  };

  return (
    <PageTransition>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Polls</h2>
          <Button size="sm" onClick={() => setShowCreate(true)}>+ New Poll</Button>
        </div>

        {showCreate && (
          <GlassCard className={styles.createCard}>
            <form onSubmit={handleCreate} className={styles.createForm}>
              <Input placeholder="Ask a question..." value={question} onChange={(e) => setQuestion(e.target.value)} autoFocus />
              {options.map((opt, i) => (
                <Input
                  key={i}
                  placeholder={`Option ${i + 1}`}
                  value={opt}
                  onChange={(e) => {
                    const newOpts = [...options];
                    newOpts[i] = e.target.value;
                    setOptions(newOpts);
                  }}
                />
              ))}
              <Button variant="ghost" size="sm" type="button" onClick={() => setOptions([...options, ''])}>
                + Add Option
              </Button>
              <div className={styles.createActions}>
                <Button type="submit" size="sm">Create Poll</Button>
                <Button variant="ghost" size="sm" type="button" onClick={() => setShowCreate(false)}>Cancel</Button>
              </div>
            </form>
          </GlassCard>
        )}

        {polls.length === 0 ? (
          <GlassCard className={styles.empty}>
            <p>No polls yet. Create one to get the group&apos;s opinion!</p>
          </GlassCard>
        ) : (
          <div className={styles.list}>
            {polls.map((poll) => (
              <GlassCard key={poll.id} className={styles.pollCard}>
                <h3 className={styles.pollQuestion}>{poll.question}</h3>
                <div className={styles.pollOptions}>
                  {(poll.options as { id: string; text: string }[])?.map((opt) => (
                    <button key={opt.id} className={styles.pollOption}>
                      {opt.text}
                    </button>
                  ))}
                </div>
                <span className={styles.pollStatus}>{poll.status}</span>
              </GlassCard>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
}
