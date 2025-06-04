-- Insert sample user with proper UUID
DO $$
DECLARE
  sample_user_id UUID := uuid_generate_v4();
  habit_exercise_id UUID := uuid_generate_v4();
  habit_reading_id UUID := uuid_generate_v4();
  habit_nutrition_id UUID := uuid_generate_v4();
  habit_meditation_id UUID := uuid_generate_v4();
  goal_marathon_id UUID := uuid_generate_v4();
  goal_books_id UUID := uuid_generate_v4();
  goal_weight_id UUID := uuid_generate_v4();
  sacrifice_social_id UUID := uuid_generate_v4();
  sacrifice_snacking_id UUID := uuid_generate_v4();
  sacrifice_snooze_id UUID := uuid_generate_v4();
BEGIN
  -- Insert sample user
  INSERT INTO users (id, email, name, bio, settings) VALUES 
  (
    sample_user_id,
    'alex@grytplatform.com',
    'Alex Johnson',
    'On a journey of transformation through discipline and faith.',
    '{
      "notifications": {
        "email": true,
        "push": true,
        "dailyReminder": true,
        "weeklyReflection": true,
        "achievements": true,
        "streakAlerts": true
      },
      "privacy": {
        "shareProgress": false,
        "shareAchievements": true,
        "publicProfile": false,
        "dataCollection": true
      },
      "theme": "light",
      "timeZone": "America/New_York"
    }'::jsonb
  ) ON CONFLICT (email) DO UPDATE SET
    name = EXCLUDED.name,
    bio = EXCLUDED.bio,
    settings = EXCLUDED.settings;

  -- Update sample_user_id to the actual user ID if it already exists
  SELECT id INTO sample_user_id FROM users WHERE email = 'alex@grytplatform.com';

  -- Insert sample habits
  INSERT INTO habits (id, user_id, title, description, category, frequency, target_value, unit, streak, longest_streak, xp_reward, integration) VALUES
  (
    habit_exercise_id,
    sample_user_id,
    'Morning Exercise',
    'Start each day with 30 minutes of physical activity',
    'physical',
    'daily',
    30,
    'minutes',
    12,
    15,
    15,
    '{"type": "apple-health", "dataType": "workout"}'::jsonb
  ),
  (
    habit_reading_id,
    sample_user_id,
    'Daily Reading',
    'Read for at least 20 minutes each day',
    'mental',
    'daily',
    20,
    'minutes',
    8,
    12,
    10,
    '{"type": "kindle", "dataType": "reading-time"}'::jsonb
  ),
  (
    habit_nutrition_id,
    sample_user_id,
    'Healthy Nutrition',
    'Track daily nutrition and stay within calorie goals',
    'nutrition',
    'daily',
    1,
    'goal',
    15,
    20,
    12,
    '{"type": "myfitnesspal", "dataType": "nutrition"}'::jsonb
  ),
  (
    habit_meditation_id,
    sample_user_id,
    'Meditation',
    'Practice mindfulness and meditation',
    'spiritual',
    'daily',
    10,
    'minutes',
    5,
    8,
    15,
    null
  ) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    streak = EXCLUDED.streak,
    longest_streak = EXCLUDED.longest_streak;

  -- Insert sample habit completions for the last week
  INSERT INTO habit_completions (habit_id, user_id, date, completed, value, notes) VALUES
  -- Exercise completions
  (habit_exercise_id, sample_user_id, CURRENT_DATE - INTERVAL '6 days', true, 35, 'Great morning run'),
  (habit_exercise_id, sample_user_id, CURRENT_DATE - INTERVAL '5 days', true, 30, 'Gym workout'),
  (habit_exercise_id, sample_user_id, CURRENT_DATE - INTERVAL '4 days', true, 40, 'Yoga session'),
  (habit_exercise_id, sample_user_id, CURRENT_DATE - INTERVAL '3 days', true, 25, 'Quick walk'),
  (habit_exercise_id, sample_user_id, CURRENT_DATE - INTERVAL '2 days', true, 45, 'Full workout'),
  (habit_exercise_id, sample_user_id, CURRENT_DATE - INTERVAL '1 day', true, 30, 'Morning jog'),
  (habit_exercise_id, sample_user_id, CURRENT_DATE, true, 35, 'Today''s exercise'),

  -- Reading completions
  (habit_reading_id, sample_user_id, CURRENT_DATE - INTERVAL '6 days', true, 25, 'Finished chapter 3'),
  (habit_reading_id, sample_user_id, CURRENT_DATE - INTERVAL '5 days', true, 20, 'Good progress'),
  (habit_reading_id, sample_user_id, CURRENT_DATE - INTERVAL '4 days', false, 0, 'Missed today'),
  (habit_reading_id, sample_user_id, CURRENT_DATE - INTERVAL '3 days', true, 30, 'Caught up'),
  (habit_reading_id, sample_user_id, CURRENT_DATE - INTERVAL '2 days', true, 22, 'Interesting book'),
  (habit_reading_id, sample_user_id, CURRENT_DATE - INTERVAL '1 day', true, 18, 'Almost done'),

  -- Nutrition completions
  (habit_nutrition_id, sample_user_id, CURRENT_DATE - INTERVAL '6 days', true, 1, 'Stayed within goals'),
  (habit_nutrition_id, sample_user_id, CURRENT_DATE - INTERVAL '5 days', true, 1, 'Good day'),
  (habit_nutrition_id, sample_user_id, CURRENT_DATE - INTERVAL '4 days', true, 1, 'Tracked everything'),
  (habit_nutrition_id, sample_user_id, CURRENT_DATE - INTERVAL '3 days', true, 1, 'Healthy choices'),
  (habit_nutrition_id, sample_user_id, CURRENT_DATE - INTERVAL '2 days', true, 1, 'On track'),
  (habit_nutrition_id, sample_user_id, CURRENT_DATE - INTERVAL '1 day', true, 1, 'Great nutrition'),
  (habit_nutrition_id, sample_user_id, CURRENT_DATE, true, 1, 'Today''s nutrition'),

  -- Meditation completions
  (habit_meditation_id, sample_user_id, CURRENT_DATE - INTERVAL '4 days', true, 10, 'Peaceful session'),
  (habit_meditation_id, sample_user_id, CURRENT_DATE - INTERVAL '3 days', true, 15, 'Deep meditation'),
  (habit_meditation_id, sample_user_id, CURRENT_DATE - INTERVAL '2 days', false, 0, 'Skipped today'),
  (habit_meditation_id, sample_user_id, CURRENT_DATE - INTERVAL '1 day', true, 12, 'Good focus')
  ON CONFLICT (habit_id, date) DO NOTHING;

  -- Insert sample goals
  INSERT INTO goals (id, user_id, title, description, category, target_value, current_value, unit, target_date, status) VALUES
  (
    goal_marathon_id,
    sample_user_id,
    'Run a Marathon',
    'Complete a full 26.2 mile marathon by the end of the year',
    'physical',
    26.2,
    15.5,
    'miles',
    '2024-12-31',
    'active'
  ),
  (
    goal_books_id,
    sample_user_id,
    'Read 50 Books',
    'Read 50 books this year to expand knowledge and perspective',
    'mental',
    50,
    23,
    'books',
    '2024-12-31',
    'active'
  ),
  (
    goal_weight_id,
    sample_user_id,
    'Lose 20 Pounds',
    'Achieve a healthy weight through consistent nutrition and exercise',
    'physical',
    20,
    12,
    'pounds',
    '2024-06-30',
    'active'
  ) ON CONFLICT (id) DO UPDATE SET
    current_value = EXCLUDED.current_value,
    status = EXCLUDED.status;

  -- Insert sample sacrifices
  INSERT INTO sacrifices (id, user_id, title, description, category, avoidance_streak, longest_avoidance_streak) VALUES
  (
    sacrifice_social_id,
    sample_user_id,
    'Social Media Scrolling',
    'Avoid mindless scrolling on social media platforms',
    'digital',
    8,
    12
  ),
  (
    sacrifice_snacking_id,
    sample_user_id,
    'Late Night Snacking',
    'Stop eating after 8 PM to improve sleep and health',
    'nutrition',
    5,
    10
  ),
  (
    sacrifice_snooze_id,
    sample_user_id,
    'Hitting Snooze',
    'Wake up immediately when the alarm goes off',
    'discipline',
    15,
    20
  ) ON CONFLICT (id) DO UPDATE SET
    avoidance_streak = EXCLUDED.avoidance_streak,
    longest_avoidance_streak = EXCLUDED.longest_avoidance_streak;

  -- Insert user XP
  INSERT INTO user_xp (user_id, total_xp, level) VALUES
  (sample_user_id, 1250, 3)
  ON CONFLICT (user_id) DO UPDATE SET
    total_xp = EXCLUDED.total_xp,
    level = EXCLUDED.level;

  -- Insert sample insights
  INSERT INTO insights (user_id, type, title, description, confidence, status) VALUES
  (
    sample_user_id,
    'strength',
    'Consistent Exercise Habit',
    'You''ve maintained your exercise habit for 12 consecutive days! Your consistency is impressive.',
    0.95,
    'new'
  ),
  (
    sample_user_id,
    'opportunity',
    'Reading Habit Improvement',
    'Your reading habit has some gaps. Consider setting a specific time each day for reading.',
    0.85,
    'new'
  ),
  (
    sample_user_id,
    'pattern',
    'Morning Routine Success',
    'You complete 80% more habits when you start your day with exercise.',
    0.90,
    'new'
  );

  -- Insert sample integrations
  INSERT INTO integrations (user_id, type, status, last_synced) VALUES
  (
    sample_user_id,
    'apple-health',
    'connected',
    NOW() - INTERVAL '2 hours'
  ),
  (
    sample_user_id,
    'myfitnesspal',
    'connected',
    NOW() - INTERVAL '1 hour'
  ),
  (
    sample_user_id,
    'kindle',
    'connected',
    NOW() - INTERVAL '30 minutes'
  ) ON CONFLICT (user_id, type) DO UPDATE SET
    status = EXCLUDED.status,
    last_synced = EXCLUDED.last_synced;

  -- Store the sample user ID for reference
  RAISE NOTICE 'Sample user created with ID: %', sample_user_id;
END $$;
