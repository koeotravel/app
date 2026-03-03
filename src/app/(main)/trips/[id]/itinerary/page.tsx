'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { PageTransition } from '@/components/PageTransition';
import { GlassCard } from '@/components/GlassCard';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { createClient } from '@/lib/supabase/client';
import type { ItineraryItem } from '@/types';
import styles from './page.module.css';

export default function ItineraryPage() {
  const params = useParams();
  const tripId = params.id as string;
  const [items, setItems] = useState<ItineraryItem[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');
  const supabase = createClient();

  useEffect(() => {
    const fetchItems = async () => {
      const { data } = await supabase
        .from('itinerary_items')
        .select('*')
        .eq('trip_id', tripId)
        .order('day_index')
        .order('sort_order');
      setItems((data as ItineraryItem[]) || []);
    };
    fetchItems();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tripId]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from('itinerary_items')
      .insert({
        trip_id: tripId,
        title: title.trim(),
        location: location.trim(),
        time: time.trim(),
        day_index: 0,
        sort_order: items.length,
        suggested_by: user?.id,
      })
      .select()
      .single();

    if (!error && data) {
      setItems([...items, data as ItineraryItem]);
      setTitle('');
      setLocation('');
      setTime('');
      setShowAdd(false);
    }
  };

  return (
    <PageTransition>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Itinerary</h2>
          <Button size="sm" onClick={() => setShowAdd(true)}>+ Add</Button>
        </div>

        {showAdd && (
          <GlassCard className={styles.addCard}>
            <form onSubmit={handleAdd} className={styles.addForm}>
              <Input placeholder="Activity title" value={title} onChange={(e) => setTitle(e.target.value)} autoFocus />
              <Input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
              <Input placeholder="Time (e.g. 2:00 PM)" value={time} onChange={(e) => setTime(e.target.value)} />
              <div className={styles.addActions}>
                <Button type="submit" size="sm">Save</Button>
                <Button variant="ghost" size="sm" type="button" onClick={() => setShowAdd(false)}>Cancel</Button>
              </div>
            </form>
          </GlassCard>
        )}

        {items.length === 0 ? (
          <GlassCard className={styles.empty}>
            <p>No itinerary items yet. Start adding activities!</p>
          </GlassCard>
        ) : (
          <div className={styles.list}>
            {items.map((item) => (
              <GlassCard key={item.id} className={styles.item}>
                <div className={styles.itemHeader}>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  {item.time && <span className={styles.itemTime}>{item.time}</span>}
                </div>
                {item.location && <p className={styles.itemLocation}>📍 {item.location}</p>}
                {item.notes && <p className={styles.itemNotes}>{item.notes}</p>}
              </GlassCard>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
}
