'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './TripCard.module.css';
import { formatDate } from '@/lib/utils';
import type { Trip } from '@/types';

interface TripCardProps {
  trip: Trip;
}

export function TripCard({ trip }: TripCardProps) {
  return (
    <Link href={`/trips/${trip.id}`}>
      <motion.div
        className={styles.card}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className={styles.imageWrapper}>
          {trip.hero_image_url ? (
            <img
              src={trip.hero_image_url}
              alt={trip.title}
              className={styles.image}
            />
          ) : (
            <div className={styles.placeholder} />
          )}
          <div className={styles.overlay} />
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{trip.title}</h3>
          <p className={styles.destination}>{trip.destination}</p>
          {trip.start_date && trip.end_date && (
            <p className={styles.dates}>
              {formatDate(trip.start_date)} — {formatDate(trip.end_date)}
            </p>
          )}
        </div>
      </motion.div>
    </Link>
  );
}
