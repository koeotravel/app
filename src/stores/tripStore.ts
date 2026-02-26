import { create } from 'zustand';
import type { Trip } from '@/types';

interface TripState {
  currentTrip: Trip | null;
  trips: Trip[];
  setCurrentTrip: (trip: Trip | null) => void;
  setTrips: (trips: Trip[]) => void;
}

export const useTripStore = create<TripState>((set) => ({
  currentTrip: null,
  trips: [],
  setCurrentTrip: (currentTrip) => set({ currentTrip }),
  setTrips: (trips) => set({ trips }),
}));
