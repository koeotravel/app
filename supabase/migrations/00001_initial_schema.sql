-- Users table
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone text UNIQUE,
  name text,
  avatar_url text,
  created_at timestamptz DEFAULT now()
);

-- Trips table
CREATE TABLE trips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  destination text,
  hero_image_url text,
  start_date date,
  end_date date,
  description text,
  created_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now()
);

-- Trip members
CREATE TABLE trip_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid REFERENCES trips(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  role text CHECK (role IN ('captain', 'crew')) DEFAULT 'crew',
  joined_at timestamptz DEFAULT now(),
  UNIQUE(trip_id, user_id)
);

-- Itinerary items
CREATE TABLE itinerary_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid REFERENCES trips(id) ON DELETE CASCADE,
  day_index int,
  sort_order int,
  title text NOT NULL,
  time text,
  location text,
  lat float,
  lng float,
  category text,
  notes text,
  link_preview jsonb,
  status text DEFAULT 'suggested',
  suggested_by uuid REFERENCES users(id),
  approved_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now()
);

-- Polls
CREATE TABLE polls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid REFERENCES trips(id) ON DELETE CASCADE,
  type text,
  question text NOT NULL,
  options jsonb,
  deadline timestamptz,
  is_anonymous bool DEFAULT false,
  status text DEFAULT 'open',
  winner_option_id text,
  created_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now()
);

-- Poll votes
CREATE TABLE poll_votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  poll_id uuid REFERENCES polls(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id),
  option_id text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(poll_id, user_id)
);

-- Messages
CREATE TABLE messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid REFERENCES trips(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id),
  content text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_messages_trip_created ON messages(trip_id, created_at);

-- Message reactions
CREATE TABLE message_reactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id uuid REFERENCES messages(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id),
  emoji text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(message_id, user_id, emoji)
);

-- Expenses
CREATE TABLE expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid REFERENCES trips(id) ON DELETE CASCADE,
  description text,
  amount numeric,
  currency text DEFAULT 'USD',
  category text,
  paid_by uuid REFERENCES users(id),
  split_type text,
  split_members jsonb,
  created_at timestamptz DEFAULT now()
);

-- Expense settlements
CREATE TABLE expense_settlements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  expense_id uuid REFERENCES expenses(id) ON DELETE CASCADE,
  from_user uuid REFERENCES users(id),
  to_user uuid REFERENCES users(id),
  amount numeric,
  status text DEFAULT 'pending',
  settled_at timestamptz
);

-- Invite links
CREATE TABLE invite_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid REFERENCES trips(id) ON DELETE CASCADE,
  created_by uuid REFERENCES users(id),
  token text UNIQUE NOT NULL,
  expires_at timestamptz,
  max_uses int DEFAULT 50,
  use_count int DEFAULT 0
);

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE trip_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE itinerary_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE polls ENABLE ROW LEVEL SECURITY;
ALTER TABLE poll_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE expense_settlements ENABLE ROW LEVEL SECURITY;
ALTER TABLE invite_links ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users: can read/update own row
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON users FOR INSERT WITH CHECK (auth.uid() = id);

-- Users: can view other users who share a trip
CREATE POLICY "Users can view trip members profiles" ON users FOR SELECT USING (
  id IN (
    SELECT tm2.user_id FROM trip_members tm1
    JOIN trip_members tm2 ON tm1.trip_id = tm2.trip_id
    WHERE tm1.user_id = auth.uid()
  )
);

-- Trips: accessible to members
CREATE POLICY "Trip members can view trips" ON trips FOR SELECT USING (
  id IN (SELECT trip_id FROM trip_members WHERE user_id = auth.uid())
);
CREATE POLICY "Authenticated users can create trips" ON trips FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Trip captains can update trips" ON trips FOR UPDATE USING (
  id IN (SELECT trip_id FROM trip_members WHERE user_id = auth.uid() AND role = 'captain')
);
CREATE POLICY "Trip captains can delete trips" ON trips FOR DELETE USING (
  id IN (SELECT trip_id FROM trip_members WHERE user_id = auth.uid() AND role = 'captain')
);

-- Trip members: accessible to trip members
CREATE POLICY "Trip members can view members" ON trip_members FOR SELECT USING (
  trip_id IN (SELECT trip_id FROM trip_members WHERE user_id = auth.uid())
);
CREATE POLICY "Users can join trips" ON trip_members FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Itinerary items: trip members only
CREATE POLICY "Trip members can view itinerary" ON itinerary_items FOR SELECT USING (
  trip_id IN (SELECT trip_id FROM trip_members WHERE user_id = auth.uid())
);
CREATE POLICY "Trip members can add itinerary items" ON itinerary_items FOR INSERT WITH CHECK (
  trip_id IN (SELECT trip_id FROM trip_members WHERE user_id = auth.uid())
);
CREATE POLICY "Trip members can update itinerary items" ON itinerary_items FOR UPDATE USING (
  trip_id IN (SELECT trip_id FROM trip_members WHERE user_id = auth.uid())
);

-- Polls: trip members only
CREATE POLICY "Trip members can view polls" ON polls FOR SELECT USING (
  trip_id IN (SELECT trip_id FROM trip_members WHERE user_id = auth.uid())
);
CREATE POLICY "Trip members can create polls" ON polls FOR INSERT WITH CHECK (
  trip_id IN (SELECT trip_id FROM trip_members WHERE user_id = auth.uid())
);

-- Poll votes: trip members only
CREATE POLICY "Trip members can view votes" ON poll_votes FOR SELECT USING (
  poll_id IN (SELECT id FROM polls WHERE trip_id IN (SELECT trip_id FROM trip_members WHERE user_id = auth.uid()))
);
CREATE POLICY "Trip members can vote" ON poll_votes FOR INSERT WITH CHECK (
  auth.uid() = user_id AND
  poll_id IN (SELECT id FROM polls WHERE trip_id IN (SELECT trip_id FROM trip_members WHERE user_id = auth.uid()))
);

-- Messages: trip members only
CREATE POLICY "Trip members can view messages" ON messages FOR SELECT USING (
  trip_id IN (SELECT trip_id FROM trip_members WHERE user_id = auth.uid())
);
CREATE POLICY "Trip members can send messages" ON messages FOR INSERT WITH CHECK (
  trip_id IN (SELECT trip_id FROM trip_members WHERE user_id = auth.uid()) AND auth.uid() = user_id
);

-- Message reactions: trip members only
CREATE POLICY "Trip members can view reactions" ON message_reactions FOR SELECT USING (
  message_id IN (SELECT id FROM messages WHERE trip_id IN (SELECT trip_id FROM trip_members WHERE user_id = auth.uid()))
);
CREATE POLICY "Trip members can add reactions" ON message_reactions FOR INSERT WITH CHECK (
  auth.uid() = user_id AND
  message_id IN (SELECT id FROM messages WHERE trip_id IN (SELECT trip_id FROM trip_members WHERE user_id = auth.uid()))
);

-- Expenses: trip members only
CREATE POLICY "Trip members can view expenses" ON expenses FOR SELECT USING (
  trip_id IN (SELECT trip_id FROM trip_members WHERE user_id = auth.uid())
);
CREATE POLICY "Trip members can add expenses" ON expenses FOR INSERT WITH CHECK (
  trip_id IN (SELECT trip_id FROM trip_members WHERE user_id = auth.uid())
);

-- Expense settlements: trip members only
CREATE POLICY "Trip members can view settlements" ON expense_settlements FOR SELECT USING (
  expense_id IN (SELECT id FROM expenses WHERE trip_id IN (SELECT trip_id FROM trip_members WHERE user_id = auth.uid()))
);
CREATE POLICY "Trip members can add settlements" ON expense_settlements FOR INSERT WITH CHECK (
  expense_id IN (SELECT id FROM expenses WHERE trip_id IN (SELECT trip_id FROM trip_members WHERE user_id = auth.uid()))
);

-- Invite links: publicly readable by token, creatable by trip captains
CREATE POLICY "Anyone can view invite links by token" ON invite_links FOR SELECT USING (true);
CREATE POLICY "Trip captains can create invite links" ON invite_links FOR INSERT WITH CHECK (
  trip_id IN (SELECT trip_id FROM trip_members WHERE user_id = auth.uid() AND role = 'captain')
);
CREATE POLICY "Anyone can update invite link use count" ON invite_links FOR UPDATE USING (true);
