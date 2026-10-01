-- ============================================================================
-- ELEVE | BIGGEST FITNESS REVOLUTION
-- Production Seed Data
-- ============================================================================

-- Exercises Seed
INSERT INTO public.exercises (id, name, slug, muscle_groups, secondary_muscles, equipment, difficulty, movement_pattern, instructions, common_mistakes, safety_notes, video_url, has_3d)
VALUES
(
    '11111111-1111-1111-1111-111111111101',
    'Barbell Back Squat',
    'barbell-back-squat',
    ARRAY['Quadriceps', 'Glutes'],
    ARRAY['Hamstrings', 'Core', 'Lower Back'],
    'Barbell',
    'Intermediate',
    'Squat',
    ARRAY[
        'Position barbell across upper trapezius with chest proud and elbows pinned down.',
        'Set feet shoulder-width apart, toes flared slightly 15-30 degrees.',
        'Brace abdominal core 360-degrees with intra-abdominal pressure.',
        'Hinge hips back and descend smoothly until hip crease drops beneath top of knee patella.',
        'Drive through mid-foot explosively while maintaining neutral spine to lockout.'
    ],
    ARRAY[
        'Collapsing knees inward (valgus collapse) on concentric phase',
        'Excessive forward torso lean rounding lower lumbar spine',
        'Shifting weight onto toes causing heels to rise'
    ],
    'Always squat inside a power rack with safety pin catches adjusted to 2 inches below maximum depth.',
    'https://assets.mixkit.co/videos/preview/mixkit-man-doing-squats-in-a-gym-43093-large.mp4',
    true
),
(
    '11111111-1111-1111-1111-111111111102',
    'Incline Dumbbell Press',
    'incline-dumbbell-press',
    ARRAY['Chest', 'Clavicular Head'],
    ARRAY['Anterior Deltoid', 'Triceps'],
    'Dumbbells',
    'Intermediate',
    'Horizontal Push',
    ARRAY[
        'Set adjustable bench to a 30-degree incline.',
        'Kick dumbbells to shoulder position with knees as you recline.',
        'Pack scapulae tightly together and pull shoulders down into back pockets.',
        'Press dumbbells along a slight arc until arms are extended without clinking weights.',
        'Lower weights under tension with elbows flared at roughly 45 degrees.'
    ],
    ARRAY[
        'Setting bench too steep (over 45 degrees shifts load to front deltoids)',
        'Flaring elbows out at 90 degrees risking shoulder impingement',
        'Bouncing dumbbells at bottom'
    ],
    'Keep wrists stacked directly over forearms to protect carpal alignment.',
    'https://assets.mixkit.co/videos/preview/mixkit-man-training-with-dumbbells-in-a-gym-43096-large.mp4',
    true
),
(
    '11111111-1111-1111-1111-111111111103',
    'Barbell Deadlift (Conventional)',
    'barbell-deadlift-conventional',
    ARRAY['Hamstrings', 'Glutes', 'Lower Back'],
    ARRAY['Lats', 'Traps', 'Forearms', 'Core'],
    'Barbell',
    'Advanced',
    'Hinge',
    ARRAY[
        'Step up so barbell cuts across mid-foot, shins 1-2 inches away.',
        'Hinge at hips to grab bar just outside knees with double overhand or hook grip.',
        'Pull shins forward until they touch barbell without rolling it.',
        'Wedge lats back, pull slack out of barbell until click sounds.',
        'Drive floor away through feet, lock hips forward at apex.'
    ],
    ARRAY[
        'Rounding lumbar spine during initial pull',
        'Hyperextending spine backwards at top lockout',
        'Letting bar drift forward away from shins'
    ],
    'Maintain tight core brace throughout; do not jerk bar off floor.',
    'https://assets.mixkit.co/videos/preview/mixkit-young-man-exercising-in-the-gym-43092-large.mp4',
    true
),
(
    '11111111-1111-1111-1111-111111111104',
    'Weighted Pull-Up',
    'weighted-pull-up',
    ARRAY['Lats', 'Upper Back'],
    ARRAY['Biceps', 'Brachialis', 'Core'],
    'Pull-Up Bar',
    'Advanced',
    'Vertical Pull',
    ARRAY[
        'Secure weight belt with plate between thighs or hold dumbbell between feet.',
        'Grip bar slightly wider than shoulder width with overhand grip.',
        'Initiate pull by retracting scapulae downwards.',
        'Drive elbows towards back pockets until chin cleanly clears the bar.',
        'Lower under complete 3-second control to full dead-hang stretch.'
    ],
    ARRAY[
        'Kicking legs or kipping body momentum',
        'Cutting depth without full elbow extension at bottom',
        'Craning neck unnaturally forward'
    ],
    'Warm up rotator cuff and shoulders thoroughly before loading additional ballast.',
    'https://assets.mixkit.co/videos/preview/mixkit-athlete-working-out-with-pull-ups-43091-large.mp4',
    false
),
(
    '11111111-1111-1111-1111-111111111105',
    'HYROX Sled Push',
    'hyrox-sled-push',
    ARRAY['Quadriceps', 'Calves', 'Glutes'],
    ARRAY['Shoulders', 'Core', 'Cardiovascular System'],
    'Sled / Turf',
    'Intermediate',
    'Locomotion / Power',
    ARRAY[
        'Load sled with designated competition weight (e.g. 152kg incl. sled for Men Open).',
        'Grip upright poles with arms locked or slightly braced.',
        'Maintain a 45-degree forward torso angle with spine rigid.',
        'Drive powerfully through balls of feet with deep knee drives.',
        'Breathe rhythmically; maintain continuous momentum across each 12.5m lane.'
    ],
    ARRAY[
        'Stopping halfway; starting friction requires 2x energy to re-accelerate',
        'Standing too upright, losing drive traction',
        'Taking shallow stutter steps instead of full extensions'
    ],
    'Keep eyes forward and turf clear of stray plates or cables.',
    'https://assets.mixkit.co/videos/preview/mixkit-man-doing-sled-push-exercise-43094-large.mp4',
    false
)
ON CONFLICT (id) DO NOTHING;

-- Workout Plans Seed
INSERT INTO public.workout_plans (id, title, discipline, level, duration_weeks, days_per_week, session_duration_min, description, schedule, tags, is_featured)
VALUES
(
    '22222222-2222-2222-2222-222222222201',
    'HYPERTROPHY BLOCK',
    'Strength',
    'Intermediate',
    8,
    5,
    60,
    'Elite progressive overload architecture structured around Push / Pull / Legs / Upper / Lower. Optimized for neuromuscular hypertrophy and aesthetic density.',
    '{
        "week": 5,
        "totalWeeks": 8,
        "split": ["Push Power", "Pull Hypertrophy", "Legs Quad Bias", "Rest / Mobility", "Upper Hypertrophy", "Legs Posterior Bias", "Active Recovery"],
        "todayWorkout": {
            "name": "Push Hypertrophy & Delts",
            "discipline": "Strength",
            "duration": 60,
            "exercisesCount": 6,
            "targetVolume": 14500
        }
    }'::jsonb,
    ARRAY['Hypertrophy', 'Periodization', 'Push-Pull-Legs', 'Aesthetic'],
    true
),
(
    '22222222-2222-2222-2222-222222222202',
    'HYROX PERFORMANCE ENGINE',
    'HYROX',
    'Advanced',
    12,
    5,
    75,
    'High-intensity functional hybrid conditioning engineered to shatter your competition split times. Sled, SkiErg, Wall Balls and aerobic pacing protocols.',
    '{
        "week": 3,
        "totalWeeks": 12,
        "split": ["Sled & Running Intervals", "Upper Body Pull & SkiErg", "Zone 2 Long Run", "Rest", "Row & Burpee Broad Jumps", "Full Race Simulation", "Active Reset"]
    }'::jsonb,
    ARRAY['HYROX', 'Hybrid Athlete', 'Zone 2', 'Sled Push'],
    true
),
(
    '22222222-2222-2222-2222-222222222203',
    'CALISTHENICS MASTERY',
    'Calisthenics',
    'Intermediate',
    6,
    4,
    50,
    'Master bodyweight leverage, front levers, muscle-ups, handstands, and explosive plyometric pulling power.',
    '{
        "week": 2,
        "totalWeeks": 6,
        "split": ["Straight Arm Strength", "Handstand & Shoulder Mobility", "Rest", "Explosive Pull / Muscle Up", "Leg Power & Core", "Rest", "Freestyle"]
    }'::jsonb,
    ARRAY['Calisthenics', 'Bodyweight', 'Gymnastics', 'Skill'],
    false
)
ON CONFLICT (id) DO NOTHING;

-- Challenges Seed
INSERT INTO public.challenges (id, title, category, description, duration_days, goal_type, target_value, participants_count, xp_reward, badge_name, end_date)
VALUES
(
    '33333333-3333-3333-3333-333333333301',
    '30 Day Consistency Protocol',
    'Habit & Discipline',
    'Complete at least 24 training or active recovery sessions over 30 days. No excuses, pure discipline.',
    30,
    'consistency',
    24,
    3420,
    1500,
    'Titan of Consistency',
    CURRENT_DATE + INTERVAL '16 days'
),
(
    '33333333-3333-3333-3333-333333333302',
    '100K Steps Aerobic Surge',
    'Cardiovascular',
    'Accumulate 100,000 recorded steps across 7 days to supercharge mitochondrial density and daily NEAT.',
    7,
    'steps',
    100000,
    1890,
    800,
    'Centurion Pacer',
    CURRENT_DATE + INTERVAL '4 days'
),
(
    '33333333-3333-3333-3333-333333333303',
    'HYROX Prep Championship',
    'Hybrid Competition',
    'Complete 8 HYROX simulations, 50km total running, and 4,000m sled resistance.',
    21,
    'volume',
    8,
    950,
    2000,
    'HYROX Finisher',
    CURRENT_DATE + INTERVAL '12 days'
)
ON CONFLICT (id) DO NOTHING;

-- Coaches Seed
INSERT INTO public.coaches (id, name, title, specialization, experience_years, rating, reviews_count, hourly_rate, bio, credentials, avatar_url)
VALUES
(
    '44444444-4444-4444-4444-444444444401',
    'Elena Vance',
    'Head of Strength & Biomechanics',
    'Strength & Hypertrophy',
    11,
    4.98,
    142,
    120,
    'Former Olympic weightlifting coach specializing in bar trajectory optimization, joint longevity, and progressive overload periodization.',
    ARRAY['CSCS Certified', 'USAW Level 2', 'M.S. Exercise Physiology'],
    'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&auto=format&fit=crop&q=80'
),
(
    '44444444-4444-4444-4444-444444444402',
    'Marcus Thorne',
    'Elite HYROX & Hybrid Endurance Lead',
    'HYROX & Combat Conditioning',
    9,
    4.94,
    98,
    110,
    'Top 1% HYROX Pro athlete with podium finishes in European championships. Master of metabolic conditioning and pacing strategy.',
    ARRAY['HYROX Master Trainer', 'CrossFit Level 3', 'Oxygen Advantage Coach'],
    'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&auto=format&fit=crop&q=80'
),
(
    '44444444-4444-4444-4444-444444444403',
    'Aria Solis',
    'Director of Functional Mobility & Recovery',
    'Mobility, Yoga & Fascial Health',
    8,
    4.96,
    87,
    95,
    'Dedicated to unlocking dormant athletic range of motion, nervous system down-regulation, and bulletproofing joints against injury.',
    ARRAY['FRC Mobility Specialist', 'E-RYT 500', 'Functional Movement Screen (FMS)'],
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&auto=format&fit=crop&q=80'
)
ON CONFLICT (id) DO NOTHING;

-- Products Seed
INSERT INTO public.products (id, name, category, subtitle, rating, reviews_count, price, description, ingredients, considerations, safety_notes, image_url)
VALUES
(
    '55555555-5555-5555-5555-555555555501',
    'ELEVE Isolate Matrix 100',
    'Protein',
    'Micro-filtered Native Whey Isolate with Digestive Enzymes',
    4.95,
    312,
    58.00,
    'Ultra-pure, cold-processed native whey isolate yielding 27g protein per scoop with zero added sugars and 6.2g naturally occurring BCAAs.',
    ARRAY['Cold-Processed Whey Protein Isolate', 'DigeZyme Multi-Enzyme Complex', 'Natural Vanilla Bean', 'Stevia Leaf Extract', 'Sunflower Lecithin'],
    ARRAY['Consume within 45 minutes post-workout for maximal muscle protein synthesis.', 'Mixes instantly with cold water or almond milk.'],
    'Contains milk derivatives. Consult a healthcare professional before use if lactose sensitive. This product is not intended to diagnose, treat, or cure any disease.',
    'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=500&auto=format&fit=crop&q=80'
),
(
    '55555555-5555-5555-5555-555555555502',
    'ELEVE Creapure Ultrafine',
    'Creatine',
    '100% German Creapure Micronized Creatine Monohydrate',
    4.99,
    480,
    36.00,
    'Gold-standard micronized creatine monohydrate synthesized in Germany. Clinically tested to boost ATP resynthesis, peak power output, and intracellular hydration.',
    ARRAY['Creapure Micronized Creatine Monohydrate (99.99% purity)'],
    ARRAY['Take 5g consistently every single day, whether training or resting.', 'No loading phase strictly required; saturation achieved in 21 days.'],
    'Maintain adequate daily hydration (minimum 2.5-3.0 liters of water daily). Consult your physician if you have pre-existing kidney conditions.',
    'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=500&auto=format&fit=crop&q=80'
),
(
    '55555555-5555-5555-5555-555555555503',
    'ELEVE Deep Sleep Neuro-Recovery',
    'Recovery',
    'Magnesium Bisglycinate, L-Theanine & Apigenin Sleep Stack',
    4.92,
    195,
    44.00,
    'Non-melatonin restorative nocturnal formulation engineered to maximize deep slow-wave sleep and athletic neural rejuvenation.',
    ARRAY['Magnesium Bisglycinate Chelate (350mg)', 'L-Theanine (200mg)', 'Apigenin from Chamomile (50mg)', 'Tart Cherry Extract (500mg)'],
    ARRAY['Take 30-45 minutes before sleep with a small glass of water.', 'Avoid blue light screens for optimal synergy.'],
    'Do not operate heavy machinery after ingestion. Do not combine with sedatives or alcohol. Individual results may vary.',
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80'
)
ON CONFLICT (id) DO NOTHING;
