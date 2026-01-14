-- Gamification Schema for TrustChain Rewards
-- This adds points, achievements, and engagement features

-- User Stats table (tracks points, level, streaks)
CREATE TABLE IF NOT EXISTS user_stats (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  total_points INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  current_streak INTEGER DEFAULT 0,
  best_streak INTEGER DEFAULT 0,
  total_verifications INTEGER DEFAULT 0,
  total_registrations INTEGER DEFAULT 0,
  counterfeit_found INTEGER DEFAULT 0,
  last_activity_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Achievements table (predefined achievements)
CREATE TABLE IF NOT EXISTS achievements (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL, -- emoji or icon name
  point_value INTEGER NOT NULL,
  category TEXT NOT NULL, -- 'verification', 'registration', 'streak', 'special'
  criteria JSONB NOT NULL, -- { type: 'count', target: 5 } or { type: 'streak', days: 7 }
  tier TEXT DEFAULT 'bronze', -- bronze, silver, gold, platinum, diamond
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Achievements table (earned achievements)
CREATE TABLE IF NOT EXISTS user_achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id TEXT NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- User Activity table (for tracking daily activity)
CREATE TABLE IF NOT EXISTS user_activity (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL, -- 'verification', 'registration'
  activity_date DATE NOT NULL DEFAULT CURRENT_DATE,
  points_earned INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_user_stats_user_id ON user_stats(user_id);
CREATE INDEX IF NOT EXISTS idx_user_stats_total_points ON user_stats(total_points DESC);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_user_id ON user_activity(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_date ON user_activity(activity_date DESC);

-- Enable Row Level Security
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activity ENABLE ROW LEVEL SECURITY;

-- User Stats policies
CREATE POLICY "Users can view their own stats" ON user_stats
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own stats" ON user_stats
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own stats" ON user_stats
  FOR UPDATE USING (auth.uid() = user_id);

-- Achievements policies (read-only for all authenticated users)
CREATE POLICY "Anyone can view achievements" ON achievements
  FOR SELECT USING (true);

-- User Achievements policies
CREATE POLICY "Users can view their own achievements" ON user_achievements
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own achievements" ON user_achievements
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- User Activity policies
CREATE POLICY "Users can view their own activity" ON user_activity
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own activity" ON user_activity
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Trigger to auto-update updated_at for user_stats
CREATE TRIGGER update_user_stats_updated_at
  BEFORE UPDATE ON user_stats
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate level from points
CREATE OR REPLACE FUNCTION calculate_level(points INTEGER)
RETURNS INTEGER AS $$
BEGIN
  -- Level formula: sqrt(points / 100)
  -- Level 1: 0-99 points
  -- Level 2: 100-399 points
  -- Level 3: 400-899 points
  -- Level 4: 900-1599 points
  -- etc.
  RETURN GREATEST(1, FLOOR(SQRT(points / 100.0)) + 1);
END;
$$ LANGUAGE plpgsql;

-- Function to get points needed for next level
CREATE OR REPLACE FUNCTION points_for_next_level(current_level INTEGER)
RETURNS INTEGER AS $$
BEGIN
  -- Reverse of level formula
  RETURN (current_level * current_level) * 100;
END;
$$ LANGUAGE plpgsql;

-- Function to award points and update stats
CREATE OR REPLACE FUNCTION award_points(
  p_user_id UUID,
  p_points INTEGER,
  p_activity_type TEXT
)
RETURNS JSONB AS $$
DECLARE
  v_old_level INTEGER;
  v_new_level INTEGER;
  v_new_total INTEGER;
  v_level_up BOOLEAN := FALSE;
  v_new_achievements JSONB := '[]'::JSONB;
  v_current_streak INTEGER := 0;
  v_last_activity DATE;
BEGIN
  -- Initialize user_stats if not exists
  INSERT INTO user_stats (user_id, total_points, level)
  VALUES (p_user_id, 0, 1)
  ON CONFLICT (user_id) DO NOTHING;

  -- Get current stats
  SELECT total_points, level, current_streak, last_activity_date
  INTO v_new_total, v_old_level, v_current_streak, v_last_activity
  FROM user_stats
  WHERE user_id = p_user_id;

  -- Add points
  v_new_total := v_new_total + p_points;
  v_new_level := calculate_level(v_new_total);
  v_level_up := v_new_level > v_old_level;

  -- Update streak
  IF v_last_activity IS NULL OR v_last_activity < CURRENT_DATE THEN
    IF v_last_activity = CURRENT_DATE - 1 THEN
      -- Consecutive day
      v_current_streak := v_current_streak + 1;
    ELSIF v_last_activity < CURRENT_DATE - 1 OR v_last_activity IS NULL THEN
      -- Streak broken or first activity
      v_current_streak := 1;
    END IF;
  END IF;

  -- Update user stats
  UPDATE user_stats
  SET
    total_points = v_new_total,
    level = v_new_level,
    current_streak = v_current_streak,
    best_streak = GREATEST(best_streak, v_current_streak),
    last_activity_date = CURRENT_DATE,
    total_verifications = CASE WHEN p_activity_type = 'verification' THEN total_verifications + 1 ELSE total_verifications END,
    total_registrations = CASE WHEN p_activity_type = 'registration' THEN total_registrations + 1 ELSE total_registrations END,
    counterfeit_found = CASE WHEN p_activity_type = 'counterfeit' THEN counterfeit_found + 1 ELSE counterfeit_found END
  WHERE user_id = p_user_id;

  -- Record activity
  INSERT INTO user_activity (user_id, activity_type, activity_date, points_earned)
  VALUES (p_user_id, p_activity_type, CURRENT_DATE, p_points);

  -- Check for new achievements
  -- This is a simplified version - you can expand this logic
  -- to check various achievement criteria

  RETURN jsonb_build_object(
    'points_awarded', p_points,
    'new_total', v_new_total,
    'level', v_new_level,
    'level_up', v_level_up,
    'streak', v_current_streak,
    'new_achievements', v_new_achievements
  );
END;
$$ LANGUAGE plpgsql;

-- Insert predefined achievements
INSERT INTO achievements (id, name, description, icon, point_value, category, criteria, tier) VALUES
  ('first_verification', 'First Verification', 'Verified your first product', '🔍', 50, 'verification', '{"type": "count", "target": 1}', 'bronze'),
  ('truth_seeker', 'Truth Seeker', 'Verified 5 products', '🎯', 100, 'verification', '{"type": "count", "target": 5}', 'bronze'),
  ('guardian', 'Guardian', 'Verified 10 products', '🛡️', 200, 'verification', '{"type": "count", "target": 10}', 'silver'),
  ('blockchain_detective', 'Blockchain Detective', 'Verified 25 products', '🕵️', 500, 'verification', '{"type": "count", "target": 25}', 'gold'),
  ('trust_master', 'Trust Master', 'Verified 50 products', '👑', 1000, 'verification', '{"type": "count", "target": 50}', 'platinum'),
  ('verification_legend', 'Verification Legend', 'Verified 100 products', '⭐', 2500, 'verification', '{"type": "count", "target": 100}', 'diamond'),

  ('first_registration', 'Product Pioneer', 'Registered your first product', '📝', 100, 'registration', '{"type": "count", "target": 1}', 'bronze'),
  ('product_protector', 'Product Protector', 'Registered 5 products', '🔐', 300, 'registration', '{"type": "count", "target": 5}', 'silver'),
  ('brand_defender', 'Brand Defender', 'Registered 10 products', '💎', 750, 'registration', '{"type": "count", "target": 10}', 'gold'),

  ('streak_starter', 'Streak Starter', '3-day verification streak', '🔥', 150, 'streak', '{"type": "streak", "days": 3}', 'bronze'),
  ('week_warrior', 'Week Warrior', '7-day verification streak', '⚡', 350, 'streak', '{"type": "streak", "days": 7}', 'silver'),
  ('dedication_master', 'Dedication Master', '30-day verification streak', '💪', 1500, 'streak', '{"type": "streak", "days": 30}', 'platinum'),

  ('counterfeit_hunter', 'Counterfeit Hunter', 'Found your first counterfeit', '🎭', 200, 'special', '{"type": "counterfeit", "target": 1}', 'silver'),
  ('fake_finder', 'Fake Finder', 'Found 5 counterfeits', '🚨', 600, 'special', '{"type": "counterfeit", "target": 5}', 'gold'),

  ('speed_demon', 'Speed Demon', 'Verified 3 products in one day', '⚡', 250, 'special', '{"type": "daily", "target": 3}', 'silver'),
  ('verification_marathon', 'Verification Marathon', 'Verified 10 products in one day', '🏃', 800, 'special', '{"type": "daily", "target": 10}', 'platinum')
ON CONFLICT (id) DO NOTHING;
