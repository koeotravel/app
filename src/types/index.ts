// ── Role & status aliases ──────────────────────────────────────────

export type TripMemberRole = "captain" | "crew";

export type ItineraryItemStatus = "suggested" | "approved" | "rejected";

export type PollStatus = "open" | "closed";

export type ExpenseSplitType = "equal" | "exact" | "percentage";

export type ExpenseSettlementStatus = "pending" | "settled";

// ── JSONB sub-types ────────────────────────────────────────────────

export interface PollOption {
  id: string;
  text: string;
}

export interface LinkPreview {
  url: string;
  title: string | null;
  description: string | null;
  image_url: string | null;
}

export interface SplitMember {
  user_id: string;
  amount: number;
}

// ── Table row types ────────────────────────────────────────────────

export interface User {
  id: string;
  phone: string;
  name: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface Trip {
  id: string;
  title: string;
  destination: string | null;
  hero_image_url: string | null;
  start_date: string | null;
  end_date: string | null;
  description: string | null;
  created_by: string;
  created_at: string;
}

export interface TripMember {
  id: string;
  trip_id: string;
  user_id: string;
  role: TripMemberRole;
  joined_at: string;
}

export interface ItineraryItem {
  id: string;
  trip_id: string;
  day_index: number;
  sort_order: number;
  title: string;
  time: string | null;
  location: string | null;
  lat: number | null;
  lng: number | null;
  category: string | null;
  notes: string | null;
  link_preview: LinkPreview | null;
  status: ItineraryItemStatus;
  suggested_by: string | null;
  approved_by: string | null;
  created_at: string;
}

export interface Poll {
  id: string;
  trip_id: string;
  type: string;
  question: string;
  options: PollOption[];
  deadline: string | null;
  is_anonymous: boolean;
  status: PollStatus;
  winner_option_id: string | null;
  created_by: string;
  created_at: string;
}

export interface PollVote {
  id: string;
  poll_id: string;
  user_id: string;
  option_id: string;
  created_at: string;
}

export interface Message {
  id: string;
  trip_id: string;
  user_id: string;
  content: string;
  created_at: string;
}

export interface MessageReaction {
  id: string;
  message_id: string;
  user_id: string;
  emoji: string;
  created_at: string;
}

export interface Expense {
  id: string;
  trip_id: string;
  description: string;
  amount: number;
  currency: string;
  category: string | null;
  paid_by: string;
  split_type: ExpenseSplitType;
  split_members: SplitMember[];
  created_at: string;
}

export interface ExpenseSettlement {
  id: string;
  expense_id: string;
  from_user: string;
  to_user: string;
  amount: number;
  status: ExpenseSettlementStatus;
  settled_at: string | null;
}

export interface InviteLink {
  id: string;
  trip_id: string;
  created_by: string;
  token: string;
  expires_at: string;
  max_uses: number;
  use_count: number;
}
