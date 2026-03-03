'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { PageTransition } from '@/components/PageTransition';
import { GlassCard } from '@/components/GlassCard';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { createClient } from '@/lib/supabase/client';
import { formatCurrency } from '@/lib/utils';
import type { Expense } from '@/types';
import styles from './page.module.css';

export default function ExpensesPage() {
  const params = useParams();
  const tripId = params.id as string;
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const supabase = createClient();

  useEffect(() => {
    const fetchExpenses = async () => {
      const { data } = await supabase
        .from('expenses')
        .select('*')
        .eq('trip_id', tripId)
        .order('created_at', { ascending: false });
      setExpenses((data as Expense[]) || []);
    };
    fetchExpenses();
  }, [tripId, supabase]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !amount) return;

    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from('expenses')
      .insert({
        trip_id: tripId,
        description: description.trim(),
        amount: parseFloat(amount),
        category: category.trim() || 'General',
        paid_by: user?.id,
        split_type: 'equal',
      })
      .select()
      .single();

    if (!error && data) {
      setExpenses([data as Expense, ...expenses]);
      setDescription('');
      setAmount('');
      setCategory('');
      setShowAdd(false);
    }
  };

  const total = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);

  return (
    <PageTransition>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Expenses</h2>
            <p className={styles.total}>Total: {formatCurrency(total)}</p>
          </div>
          <Button size="sm" onClick={() => setShowAdd(true)}>+ Add</Button>
        </div>

        {showAdd && (
          <GlassCard className={styles.addCard}>
            <form onSubmit={handleAdd} className={styles.addForm}>
              <Input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} autoFocus />
              <Input placeholder="Amount" type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} />
              <Input placeholder="Category (optional)" value={category} onChange={(e) => setCategory(e.target.value)} />
              <div className={styles.addActions}>
                <Button type="submit" size="sm">Save</Button>
                <Button variant="ghost" size="sm" type="button" onClick={() => setShowAdd(false)}>Cancel</Button>
              </div>
            </form>
          </GlassCard>
        )}

        {expenses.length === 0 ? (
          <GlassCard className={styles.empty}>
            <p>No expenses recorded yet.</p>
          </GlassCard>
        ) : (
          <div className={styles.list}>
            {expenses.map((expense) => (
              <GlassCard key={expense.id} className={styles.expenseCard}>
                <div className={styles.expenseHeader}>
                  <h3 className={styles.expenseDesc}>{expense.description}</h3>
                  <span className={styles.expenseAmount}>
                    {formatCurrency(expense.amount, expense.currency)}
                  </span>
                </div>
                <span className={styles.expenseCategory}>{expense.category}</span>
              </GlassCard>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
}
