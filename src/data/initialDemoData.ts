// ============================================================================
// ELEVE | BIGGEST FITNESS REVOLUTION
// Initial Production-Style Demo Dataset
// ============================================================================

import {
  UserProfile,
  Exercise,
  WorkoutPlan,
  WorkoutSession,
  PersonalRecord,
  NutritionMacroSummary,
  MealEntry,
  Recipe,
  WellnessData,
  DiaryEntry,
  CommunityPost,
  Challenge,
  Achievement,
  LeaderboardEntry,
  Coach,
  ProductItem,
  ProductReview,
  ConnectedDevice,
} from '../types';

export const initialProfile: UserProfile = {
  id: 'usr_athlete_default',
  email: 'athlete@eleve.fit',
  fullName: 'New Athlete',
  username: 'athlete',
  avatarUrl: '',
  fitnessGoals: ['Strength & Conditioning', 'Mobility'],
  preferredTraining: ['Strength'],
  availableDays: 4,
  sessionDuration: 45,
  equipment: ['Bodyweight', 'Dumbbells'],
  experienceLevel: 'Beginner',
  streak: 0,
  consistencyScore: 0,
  totalVolumeKg: 0,
  prsCount: 0,
  weightKg: 70,
  heightCm: 175,
  onboardingCompleted: true,
  createdAt: '2026-01-01T00:00:00Z',
};

export const initialNutrition: NutritionMacroSummary = {
  date: new Date().toISOString().split('T')[0],
  caloriesTarget: 2600,
  caloriesConsumed: 1840,
  proteinTarget: 180,
  proteinConsumed: 145,
  carbsTarget: 280,
  carbsConsumed: 195,
  fatTarget: 70,
  fatConsumed: 48,
  waterTargetMl: 2000,
  waterConsumedMl: 1200, // 1.2 / 2.0 L as specified
};

export const initialWellness: WellnessData = {
  date: new Date().toISOString().split('T')[0],
  sleepHours: 5.6, // 5.6 / 8 h as specified in demo requirements
  deepSleepHours: 1.4,
  remSleepHours: 1.5,
  sleepScore: 78,
  steps: 8420,
  stepsGoal: 10000,
  distanceKm: 6.4,
  activeCalories: 540,
  activeMinutes: 52,
  restingHr: 54,
  hrvMs: 72,
  recoveryScore: 84,
};

export const initialExercises: Exercise[] = [
  // ==========================================
  // STRENGTH & POWER
  // ==========================================
  {
    id: 'ex_squat',
    name: 'Barbell Back Squat',
    slug: 'barbell-back-squat',
    discipline: 'Strength',
    muscleGroups: ['Quadriceps', 'Glutes'],
    secondaryMuscles: ['Hamstrings', 'Core', 'Lower Back'],
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    movementPattern: 'Squat / Knee Dominant',
    instructions: [
      'Unrack barbell across upper trapezius with rigid core brace.',
      'Place feet slightly wider than hips with toes 20 degrees turned out.',
      'Break at hips and knees simultaneously, descending with knees tracking toes.',
      'Hit parallel depth (hip crease below knee joint).',
      'Drive powerfully upwards maintaining vertical chest torso angle.'
    ],
    commonMistakes: [
      'Collapsing knees inward during ascending drive',
      'Heels lifting off ground shifting weight forward'
    ],
    safetyNotes: 'Always set power rack safety bars at mid-thigh height before loading max sets.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-squats-in-a-gym-43093-large.mp4',
  },
  {
    id: 'ex_incline_press',
    name: 'Incline Dumbbell Press',
    slug: 'incline-dumbbell-press',
    discipline: 'Strength',
    muscleGroups: ['Chest', 'Anterior Deltoid'],
    secondaryMuscles: ['Triceps'],
    equipment: 'Dumbbells',
    difficulty: 'Intermediate',
    movementPattern: 'Horizontal Push',
    instructions: [
      'Set bench to 30 degrees. Retract and depress shoulder blades.',
      'Press dumbbells up smoothly in a convergent arc without locking elbows aggressively.',
      'Lower weights under deep 3-second tension until a full pectoral stretch is felt.'
    ],
    commonMistakes: [
      'Flaring elbows out perpendicular at 90 degrees',
      'Arching lower back off bench excessively'
    ],
    safetyNotes: 'Maintain wrist stacking directly over elbow joint throughout concentric movement.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-with-dumbbells-in-a-gym-43096-large.mp4',
  },
  {
    id: 'ex_deadlift',
    name: 'Barbell Deadlift (Conventional)',
    slug: 'barbell-deadlift-conventional',
    discipline: 'Strength',
    muscleGroups: ['Hamstrings', 'Glutes', 'Lower Back'],
    secondaryMuscles: ['Lats', 'Traps', 'Forearms'],
    equipment: 'Barbell',
    difficulty: 'Advanced',
    movementPattern: 'Hip Hinge',
    instructions: [
      'Set bar over mid-foot with feet hip-width apart.',
      'Hinge hips, grasp bar, pull chest tall, wedging hips into starting tension.',
      'Push floor away with legs until bar passes knees, then lock out glutes.'
    ],
    commonMistakes: [
      'Rounding lumbar spine under heavy pull',
      'Hyperextending spine backward at apex'
    ],
    safetyNotes: 'Reset breath and intra-abdominal brace before every single repetition.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-exercising-in-the-gym-43092-large.mp4',
  },
  {
    id: 'ex_overhead_press',
    name: 'Barbell Overhead Press (OHP)',
    slug: 'barbell-overhead-press',
    discipline: 'Strength',
    muscleGroups: ['Shoulders', 'Triceps'],
    secondaryMuscles: ['Upper Chest', 'Core', 'Glutes'],
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    movementPattern: 'Vertical Push',
    instructions: [
      'Rest barbell across front deltoids with elbows slightly forward of bar.',
      'Squeeze glutes and brace core rigidly.',
      'Press bar straight upward in vertical trajectory, clearing head backward momentarily.',
      'Lock out overhead with arms in line with ears.'
    ],
    commonMistakes: [
      'Over-arching lumbar spine backward',
      'Flaring elbows wide at bottom'
    ],
    safetyNotes: 'Keep ribcage clamped down; do not turn lift into standing incline bench press.',
  },
  {
    id: 'ex_romanian_dl',
    name: 'Romanian Deadlift (RDL)',
    slug: 'romanian-deadlift',
    discipline: 'Strength',
    muscleGroups: ['Hamstrings', 'Glutes'],
    secondaryMuscles: ['Erector Spinae', 'Lats'],
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    movementPattern: 'Hip Hinge',
    instructions: [
      'Hold barbell in front of thighs with slight soft unlock in knees.',
      'Push hips back toward wall behind you while maintaining flat spine.',
      'Lower until hamstrings feel maximal stretch, then squeeze glutes to return.'
    ],
    commonMistakes: [
      'Bending knees into a squat instead of pure hip hinge',
      'Allowing shoulders to round forward'
    ],
    safetyNotes: 'Stop descent when pelvis stops traveling backwards.',
  },
  {
    id: 'ex_barbell_row',
    name: 'Bent-Over Barbell Row',
    slug: 'bent-over-barbell-row',
    discipline: 'Strength',
    muscleGroups: ['Lats', 'Upper Back', 'Rhomboids'],
    secondaryMuscles: ['Biceps', 'Hamstrings', 'Lower Back'],
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    movementPattern: 'Horizontal Pull',
    instructions: [
      'Hinge forward to 45 degrees with flat spine.',
      'Grip barbell slightly wider than shoulder width.',
      'Pull bar toward lower abdomen/sternum driving elbows backward.',
      'Squeeze shoulder blades tightly together at contraction apex.'
    ],
    commonMistakes: [
      'Jerking torso upright using momentum',
      'Allowing back to round during rep'
    ],
    safetyNotes: 'Keep hamstrings and glutes loaded as counterbalances throughout.',
  },

  // ==========================================
  // BODYWEIGHT & CALISTHENICS
  // ==========================================
  {
    id: 'ex_standard_pushup',
    name: 'Standard Strict Push-Up',
    slug: 'standard-strict-push-up',
    discipline: 'Calisthenics',
    muscleGroups: ['Chest', 'Triceps', 'Anterior Deltoid'],
    secondaryMuscles: ['Core', 'Serratus Anterior'],
    equipment: 'Bodyweight',
    difficulty: 'Beginner',
    movementPattern: 'Horizontal Push',
    instructions: [
      'Place hands slightly wider than shoulder width under shoulders.',
      'Lock legs and core into a rigid plank from head to heels.',
      'Lower body until chest touches floor with elbows at 45 degrees.',
      'Push floor away with full lockout and active scapular protraction.'
    ],
    commonMistakes: [
      'Sagging hips or piking pelvis into the air',
      'Flaring elbows out to 90 degrees'
    ],
    safetyNotes: 'Maintain active pelvic tuck and glute tension throughout entire set.',
  },
  {
    id: 'ex_diamond_pushup',
    name: 'Diamond Push-Up',
    slug: 'diamond-push-up',
    discipline: 'Calisthenics',
    muscleGroups: ['Triceps', 'Chest'],
    secondaryMuscles: ['Anterior Deltoid', 'Core'],
    equipment: 'Bodyweight',
    difficulty: 'Intermediate',
    movementPattern: 'Horizontal Push',
    instructions: [
      'Form diamond/triangle shape with thumbs and index fingers under center of chest.',
      'Keep body in unbroken straight plank alignment.',
      'Descend until sternum contacts hands.',
      'Press up through palms focusing purely on triceps extension.'
    ],
    commonMistakes: [
      'Elbows flaring excessively outward',
      'Cutting depth short'
    ],
    safetyNotes: 'Warm up wrists thoroughly; adjust hand width if experiencing wrist compression.',
  },
  {
    id: 'ex_archer_pushup',
    name: 'Archer Push-Up',
    slug: 'archer-push-up',
    discipline: 'Calisthenics',
    muscleGroups: ['Chest', 'Triceps', 'Shoulders'],
    secondaryMuscles: ['Core', 'Biceps (straight arm)'],
    equipment: 'Bodyweight',
    difficulty: 'Advanced',
    movementPattern: 'Horizontal Push (Unilateral)',
    instructions: [
      'Assume wide push-up stance with fingers pointing slightly outward.',
      'Lower toward one side, bending working arm while keeping opposite arm completely straight.',
      'Press back to center, then repeat to alternate side.'
    ],
    commonMistakes: [
      'Bending the non-working arm',
      'Rotating torso instead of maintaining level shoulders'
    ],
    safetyNotes: 'Pivotal stepping stone toward the single-arm push-up.',
  },
  {
    id: 'ex_pike_pushup',
    name: 'Pike Push-Up (Shoulder Builder)',
    slug: 'pike-push-up',
    discipline: 'Calisthenics',
    muscleGroups: ['Anterior Deltoid', 'Upper Chest'],
    secondaryMuscles: ['Triceps', 'Traps', 'Core'],
    equipment: 'Bodyweight',
    difficulty: 'Intermediate',
    movementPattern: 'Vertical Push',
    instructions: [
      'Start in downward dog position with hips piked high in air.',
      'Shift weight onto shoulders and balls of feet.',
      'Lower head forward creating a tripod between hands and forehead.',
      'Press upward and push head back through arms at apex.'
    ],
    commonMistakes: [
      'Dropping elbows backward without forward tripod lean',
      'Allowing hips to drop flat into regular push-up'
    ],
    safetyNotes: 'Essential progression for strict handstand push-up strength.',
  },
  {
    id: 'ex_pullup',
    name: 'Strict Overhand Pull-Up',
    slug: 'strict-overhand-pull-up',
    discipline: 'Calisthenics',
    muscleGroups: ['Lats', 'Upper Back'],
    secondaryMuscles: ['Biceps', 'Forearms', 'Core'],
    equipment: 'Pull-Up Bar',
    difficulty: 'Intermediate',
    movementPattern: 'Vertical Pull',
    instructions: [
      'Grip bar with overhand (pronated) grip slightly wider than shoulder width.',
      'Hang in complete dead-hang with relaxed shoulders.',
      'Engage scapulae by depressing and retracting shoulder blades.',
      'Drive elbows down and back until chin clears the bar cleanly.',
      'Lower under control back to dead-hang.'
    ],
    commonMistakes: [
      'Kipping or swinging legs to gain momentum',
      'Reaching with chin instead of pulling chest tall'
    ],
    safetyNotes: 'Do not bounce out of bottom dead-hang to protect shoulder labrum.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-athlete-working-out-with-pull-ups-43091-large.mp4',
  },
  {
    id: 'ex_chinup',
    name: 'Underhand Chin-Up',
    slug: 'underhand-chin-up',
    discipline: 'Calisthenics',
    muscleGroups: ['Biceps', 'Lats'],
    secondaryMuscles: ['Upper Back', 'Core'],
    equipment: 'Pull-Up Bar',
    difficulty: 'Beginner',
    movementPattern: 'Vertical Pull',
    instructions: [
      'Grip bar with underhand (supinated) grip shoulder-width apart.',
      'Start from full extension with core braced.',
      'Pull upward squeezing biceps and lats until upper chest approaches bar.',
      'Lower under smooth 3-second eccentric control.'
    ],
    commonMistakes: [
      'Swinging hips forward during pull',
      'Shortening range of motion at bottom'
    ],
    safetyNotes: 'Keep elbows tucked forward throughout movement.',
  },
  {
    id: 'ex_wide_pullup',
    name: 'Wide-Grip Lat Pull-Up',
    slug: 'wide-grip-lat-pull-up',
    discipline: 'Calisthenics',
    muscleGroups: ['Lats (Outer Sweep)', 'Teres Major'],
    secondaryMuscles: ['Upper Back', 'Biceps'],
    equipment: 'Pull-Up Bar',
    difficulty: 'Advanced',
    movementPattern: 'Vertical Pull',
    instructions: [
      'Grip bar 1.5x shoulder width with pronated grip.',
      'Retract scapulae and pull chest toward bar.',
      'Focus mental cue on driving elbows into back pockets.',
      'Descend smoothly to full arm extension.'
    ],
    commonMistakes: [
      'Incomplete range of motion',
      'Rounding shoulders forward at top'
    ],
    safetyNotes: 'Requires adequate shoulder external rotation; avoid if experiencing impingement.',
  },
  {
    id: 'ex_muscle_up',
    name: 'Bar Muscle-Up',
    slug: 'bar-muscle-up',
    discipline: 'Calisthenics',
    muscleGroups: ['Lats', 'Chest', 'Triceps'],
    secondaryMuscles: ['Forearms', 'Core', 'Shoulders'],
    equipment: 'Pull-Up Bar',
    difficulty: 'Elite',
    movementPattern: 'Compound Transition',
    instructions: [
      'Grip bar with false grip or aggressive overhand grip.',
      'Generate controlled hollow-to-arch swing.',
      'Pull explosively toward lower chest/belly button.',
      'Rapidly roll wrists and shoulders forward over bar into deep dip position.',
      'Press out dip to full arms lockout.'
    ],
    commonMistakes: [
      'Chicken-winging (one arm clearing before the other)',
      'Lack of pull height prior to transition'
    ],
    safetyNotes: 'Build prerequisite strength: minimum 15 strict pull-ups and 20 straight bar dips.',
  },
  {
    id: 'ex_parallel_dips',
    name: 'Parallel Bar Dips',
    slug: 'parallel-bar-dips',
    discipline: 'Calisthenics',
    muscleGroups: ['Chest (Lower)', 'Triceps'],
    secondaryMuscles: ['Anterior Deltoid'],
    equipment: 'Dip Station',
    difficulty: 'Intermediate',
    movementPattern: 'Vertical Push',
    instructions: [
      'Support full bodyweight on parallel bars with locked elbows.',
      'Lean torso 15-20 degrees forward for chest recruitment.',
      'Lower body until upper arms reach parallel with floor (90 degree elbow bend).',
      'Press back up forcefully to full lockout.'
    ],
    commonMistakes: [
      'Descending too deep into dangerous anterior shoulder extension',
      'Shrugging shoulders up toward ears'
    ],
    safetyNotes: 'Keep scapulae depressed; do not bottom out if shoulder mobility is restricted.',
  },

  // ==========================================
  // HYROX & HYBRID RACING
  // ==========================================
  {
    id: 'ex_sled_push',
    name: 'HYROX Sled Push',
    slug: 'hyrox-sled-push',
    discipline: 'HYROX',
    muscleGroups: ['Quadriceps', 'Glutes', 'Calves'],
    secondaryMuscles: ['Cardiovascular System', 'Core'],
    equipment: 'Sled / Turf',
    difficulty: 'Intermediate',
    movementPattern: 'Locomotion / Power',
    instructions: [
      'Grip vertical handles with arms locked out or tucked against chest.',
      'Adopt 45-degree forward torso lean.',
      'Drive powerfully through balls of feet with deep continuous marching strides.'
    ],
    commonMistakes: [
      'Standing too upright and losing drive traction',
      'Stopping midway instead of maintaining momentum'
    ],
    safetyNotes: 'Keep knees tracking in line with toes during high-velocity propulsion.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-sled-push-exercise-43094-large.mp4',
  },
  {
    id: 'ex_sled_pull',
    name: 'HYROX Sled Pull',
    slug: 'hyrox-sled-pull',
    discipline: 'HYROX',
    muscleGroups: ['Hamstrings', 'Glutes', 'Lats', 'Upper Back'],
    secondaryMuscles: ['Biceps', 'Forearms', 'Core'],
    equipment: 'Sled / Rope / Turf',
    difficulty: 'Intermediate',
    movementPattern: 'Hip Hinge / Horizontal Pull',
    instructions: [
      'Stand in athletic quarter squat with feet anchored on turf.',
      'Grip heavy rope with both hands.',
      'Hinge hips and pull rope arm-over-arm in continuous rhythm.',
      'Step backward in synchronization with pulls if utilizing moving style.'
    ],
    commonMistakes: [
      'Rounding lower spine under pull load',
      'Jerking arms without leg/hip engagement'
    ],
    safetyNotes: 'Plant feet wide to generate firm friction base against turf.',
  },
  {
    id: 'ex_wall_balls',
    name: 'HYROX Wall Balls',
    slug: 'hyrox-wall-balls',
    discipline: 'HYROX',
    muscleGroups: ['Quadriceps', 'Shoulders', 'Glutes'],
    secondaryMuscles: ['Core', 'Triceps', 'Cardiovascular System'],
    equipment: 'Medicine Ball (6-9kg)',
    difficulty: 'Intermediate',
    movementPattern: 'Squat & Press Thruster',
    instructions: [
      'Hold medicine ball at chest level with elbows tucked underneath.',
      'Descend into full squat below parallel.',
      'Explode upward using leg drive to launch ball to 10-foot target.',
      'Catch ball softly off wall and transition immediately into next squat.'
    ],
    commonMistakes: [
      'Not squatting below parallel (no-rep)',
      'Throwing purely with arms rather than hip drive'
    ],
    safetyNotes: 'Keep chest upright to prevent ball from pulling spine forward into flexion.',
  },
  {
    id: 'ex_burpee_broad_jump',
    name: 'Burpee Broad Jump',
    slug: 'burpee-broad-jump',
    discipline: 'HYROX',
    muscleGroups: ['Full Body', 'Cardiovascular System'],
    secondaryMuscles: ['Chest', 'Quadriceps', 'Glutes', 'Calves'],
    equipment: 'Bodyweight / Turf',
    difficulty: 'Intermediate',
    movementPattern: 'Plyometric Locomotion',
    instructions: [
      'Drop chest and thighs completely to floor.',
      'Push up and snap feet forward under hips.',
      'Immediately explode into forward horizontal broad jump covering maximum distance.',
      'Land softly with bent knees and transition directly into next rep.'
    ],
    commonMistakes: [
      'Not touching chest to ground',
      'Jumping upward rather than driving horizontal distance'
    ],
    safetyNotes: 'Land with soft knee flexion to absorb impact force safely.',
  },

  // ==========================================
  // COMBAT SPORTS CONDITIONING
  // ==========================================
  {
    id: 'ex_kettlebell_swing',
    name: 'Kettlebell Hardstyle Swing',
    slug: 'kettlebell-swing',
    discipline: 'Combat Sports',
    muscleGroups: ['Glutes', 'Hamstrings'],
    secondaryMuscles: ['Core', 'Shoulders', 'Cardiovascular System'],
    equipment: 'Kettlebell',
    difficulty: 'Intermediate',
    movementPattern: 'Ballistic Hinge',
    instructions: [
      'Hike kettlebell high between inner thighs.',
      'Snap hips forward with explosive glute contraction to propel bell to chest level.',
      'Let bell float momentarily, guide it back into hinge without squatting.'
    ],
    commonMistakes: [
      'Lifting with arms instead of driving with hips',
      'Squatting down instead of hinging backward'
    ],
    safetyNotes: 'Maintain neutral neck alignment with eyes tracking 10 feet ahead on floor.',
  },
  {
    id: 'ex_rotational_med_ball',
    name: 'Rotational Medicine Ball Slam',
    slug: 'rotational-med-ball-slam',
    discipline: 'Combat Sports',
    muscleGroups: ['Obliques', 'Rotational Core'],
    secondaryMuscles: ['Lats', 'Shoulders', 'Hips'],
    equipment: 'Slam Ball',
    difficulty: 'Intermediate',
    movementPattern: 'Rotational Power',
    instructions: [
      'Stand perpendicular to wall or floor in athletic stance.',
      'Wind up ball over back shoulder engaging rear hip.',
      'Rotate hips violently and slam ball into wall/floor with full core contraction.',
      'Catch rebound and pivot smoothly into next rep.'
    ],
    commonMistakes: [
      'Moving only through arms without hip pivot',
      'Over-rotating spine without pivoting rear foot'
    ],
    safetyNotes: 'Pivot rear foot on ball of foot to protect knee and hip joints.',
  },

  // ==========================================
  // ATHLETIC YOGA & FLOW
  // ==========================================
  {
    id: 'ex_warrior_two',
    name: 'Warrior II (Virabhadrasana II)',
    slug: 'warrior-two',
    discipline: 'Yoga',
    muscleGroups: ['Quadriceps', 'Hip Abductors', 'Groin'],
    secondaryMuscles: ['Shoulders', 'Core'],
    equipment: 'Yoga Mat',
    difficulty: 'Beginner',
    movementPattern: 'Isometric Balance',
    instructions: [
      'Step feet 4 feet apart, turn front foot out 90 degrees and back foot slightly in.',
      'Bend front knee to 90 degrees tracking over second toe.',
      'Extend arms parallel to floor reaching active energy through fingertips.',
      'Gaze over front middle finger with open pelvis and dropped shoulders.'
    ],
    commonMistakes: [
      'Front knee caving inward past big toe',
      'Torso leaning too far forward over front leg'
    ],
    safetyNotes: 'Keep back leg active and press firmly into outer blade of rear foot.',
  },
  {
    id: 'ex_crow_pose',
    name: 'Crow Pose (Bakasana)',
    slug: 'crow-pose',
    discipline: 'Yoga',
    muscleGroups: ['Core', 'Shoulders', 'Wrists'],
    secondaryMuscles: ['Triceps', 'Hip Flexors'],
    equipment: 'Yoga Mat',
    difficulty: 'Advanced',
    movementPattern: 'Arm Balance',
    instructions: [
      'Squat down and place hands flat on floor shoulder-width apart.',
      'Place knees high on backs of upper triceps.',
      'Shift gaze and weight forward onto hands.',
      'Lift one foot then the other, balancing solely on hands with round back.'
    ],
    commonMistakes: [
      'Looking down between hands (causes forward pitch)',
      'Jumping into balance instead of smooth weight transfer'
    ],
    safetyNotes: 'Place cushion or mat in front of head when learning balance point.',
  },

  // ==========================================
  // MOBILITY & JOINT LONGEVITY
  // ==========================================
  {
    id: 'ex_ninety_ninety_hip',
    name: '90/90 Hip Mobility Flow',
    slug: '90-90-hip-mobility-flow',
    discipline: 'Mobility',
    muscleGroups: ['Hip Internal Rotators', 'Hip External Rotators'],
    secondaryMuscles: ['Glutes', 'Adductors'],
    equipment: 'Mat',
    difficulty: 'Beginner',
    movementPattern: 'Active Joint End-Range',
    instructions: [
      'Sit on floor with both knees bent at 90 degrees.',
      'Position lead leg in external rotation and trail leg in internal rotation.',
      'Sit tall with flat spine, hinging forward over lead thigh.',
      'Transition smoothly across center without using hands to switch sides.'
    ],
    commonMistakes: [
      'Rounding lumbar spine during forward reach',
      'Forcing trail hip into painful impingement'
    ],
    safetyNotes: 'Place yoga block under hip if pelvis tilts excessively.',
  },
  {
    id: 'ex_thoracic_rotations',
    name: 'Side-Lying Thoracic Rotations',
    slug: 'thoracic-spine-rotations',
    discipline: 'Mobility',
    muscleGroups: ['Thoracic Spine', 'Chest', 'Lats'],
    secondaryMuscles: ['Shoulders', 'Neck'],
    equipment: 'Mat',
    difficulty: 'Beginner',
    movementPattern: 'Rotational Mobility',
    instructions: [
      'Lie on side with hips and knees stacked at 90 degrees.',
      'Pin top knee to floor or foam roller.',
      'Reach top arm in wide arc across body to opposite floor.',
      'Breathe deeply into ribcage at end range, then return.'
    ],
    commonMistakes: [
      'Top knee lifting off floor (compensates with lumbar spine)',
      'Rushing through rotation without synchronized breath'
    ],
    safetyNotes: 'Ensures rotational mobility comes from thoracic spine rather than lower back.',
  },

  // ==========================================
  // RHYTHMIC CARDIO & ZUMBA
  // ==========================================
  {
    id: 'ex_lateral_shuffle_taps',
    name: 'High-Tempo Lateral Shuffle Taps',
    slug: 'lateral-shuffle-taps',
    discipline: 'Zumba',
    muscleGroups: ['Cardiovascular System', 'Calves', 'Quadriceps'],
    secondaryMuscles: ['Glute Medius', 'Core'],
    equipment: 'Bodyweight',
    difficulty: 'Beginner',
    movementPattern: 'Lateral Agility',
    instructions: [
      'Assume athletic low stance with knees bent.',
      'Shuffle rapidly 3 steps to the right and tap floor with left fingertips.',
      'Explode across center shuffling 3 steps left and tap with right hand.',
      'Maintain continuous rhythmic tempo in sync with music cadence.'
    ],
    commonMistakes: [
      'Standing upright during shuffle',
      'Crossing feet over each other'
    ],
    safetyNotes: 'Stay light on balls of feet with knees aligned over toes.',
  },

  // ==========================================
  // HOME & MINIMAL EQUIPMENT
  // ==========================================
  {
    id: 'ex_banded_face_pulls',
    name: 'Resistance Band Face Pull',
    slug: 'resistance-band-face-pull',
    discipline: 'Home Workouts',
    muscleGroups: ['Rear Deltoids', 'Rotator Cuff', 'Rhomboids'],
    secondaryMuscles: ['Trapezius', 'Biceps'],
    equipment: 'Resistance Band',
    difficulty: 'Beginner',
    movementPattern: 'Horizontal Pull / External Rotation',
    instructions: [
      'Anchor resistance band at eye level.',
      'Grip band with overhand grip and step back to create tension.',
      'Pull hands toward eye/ear level while flaring elbows high and wide.',
      'Externally rotate shoulders at apex squeezing rear deltoids.'
    ],
    commonMistakes: [
      'Pulling down toward chin instead of eye level',
      'Arching lower back to heave band'
    ],
    safetyNotes: 'Gold-standard posture corrective exercise for desk workers and athletes.',
  },
  {
    id: 'ex_goblet_squat_db',
    name: 'Dumbbell Goblet Squat',
    slug: 'dumbbell-goblet-squat',
    discipline: 'Home Workouts',
    muscleGroups: ['Quadriceps', 'Glutes'],
    secondaryMuscles: ['Core', 'Upper Back', 'Calves'],
    equipment: 'Dumbbells',
    difficulty: 'Beginner',
    movementPattern: 'Squat / Knee Dominant',
    instructions: [
      'Hold single dumbbell vertically against sternum like a goblet.',
      'Set feet shoulder-width apart with toes turned out.',
      'Squat down with chest tall, tracking elbows inside knees at bottom.',
      'Drive up through whole foot squeezing glutes at top.'
    ],
    commonMistakes: [
      'Letting dumbbell drift away from chest',
      'Tucking pelvis under at bottom'
    ],
    safetyNotes: 'Ideal front-loaded squat pattern that enforces upright spinal posture.',
  }
];

export const initialPlans: WorkoutPlan[] = [
  {
    id: 'plan_hypertrophy',
    title: 'HYPERTROPHY BLOCK',
    discipline: 'Strength',
    level: 'Intermediate',
    durationWeeks: 8,
    daysPerWeek: 5,
    sessionDurationMin: 60,
    description: 'Week 5 / 8. Push / Pull / Legs periodization designed for functional muscle mass, joint structural integrity, and explosive density.',
    tags: ['Push / Pull / Legs', 'Volume Load', 'Hypertrophy', 'Periodized'],
    isFeatured: true,
    currentWeek: 5,
    currentDay: 2,
    schedule: {
      week: 5,
      totalWeeks: 8,
      split: [
        'Push Power (Chest & Shoulders)',
        'Pull Hypertrophy (Back & Biceps)',
        'Legs Quad Dominant',
        'Mobility & Active Reset',
        'Upper Volume Surge',
        'Legs Posterior & Core',
        'Rest / Recovery Protocol'
      ],
      todayWorkout: {
        name: 'Pull Hypertrophy & Back Density',
        discipline: 'Strength',
        duration: 60,
        exercisesCount: 5,
        targetVolume: 1240, // 1,240 kg volume as specified in demo requirements
      }
    }
  },
  {
    id: 'plan_hyrox_engine',
    title: 'HYROX PERFORMANCE ENGINE',
    discipline: 'HYROX',
    level: 'Advanced',
    durationWeeks: 12,
    daysPerWeek: 5,
    sessionDurationMin: 75,
    description: 'High-octane hybrid conditioning protocol engineered for elite competition split pacing, sled propulsion, and aerobic threshold resilience.',
    tags: ['HYROX', 'Hybrid Athlete', 'Zone 2', 'Lactate Threshold'],
    isFeatured: true,
  },
  {
    id: 'plan_calisthenics',
    title: 'CALISTHENICS MASTERY',
    discipline: 'Calisthenics',
    level: 'Intermediate',
    durationWeeks: 6,
    daysPerWeek: 4,
    sessionDurationMin: 50,
    description: 'Master bodyweight levers, hollow-body dynamics, strict muscle-up progression, and bulletproof scapular mobility.',
    tags: ['Bodyweight', 'Gymnastics', 'Relative Strength'],
    isFeatured: false,
  },
  {
    id: 'plan_combat_speed',
    title: 'COMBAT ROTATIONAL POWER',
    discipline: 'Combat Sports',
    level: 'Advanced',
    durationWeeks: 8,
    daysPerWeek: 4,
    sessionDurationMin: 55,
    description: 'Rotational kinetic chain power, anti-rotational core rigidity, neck stability, and explosive footwork conditioning.',
    tags: ['Rotational Force', 'Combat', 'Speed-Strength'],
    isFeatured: false,
  },
  {
    id: 'plan_mobility_restore',
    title: 'ATHLETIC MOBILITY & RESTORE',
    discipline: 'Mobility',
    level: 'All Levels',
    durationWeeks: 4,
    daysPerWeek: 3,
    sessionDurationMin: 35,
    description: 'Fascial decompression, hip capsule unlocking, thoracic extension, and central nervous system down-regulation.',
    tags: ['Mobility', 'Recovery', 'Longevity'],
    isFeatured: false,
  }
];

export const initialActiveWorkout: WorkoutSession = {
  id: 'session_today',
  name: 'Pull Hypertrophy & Back Density',
  discipline: 'Strength',
  scheduledDate: new Date().toISOString().split('T')[0],
  durationMin: 60,
  caloriesBurned: 460,
  totalVolumeKg: 1240, // 1,240 kg
  perceivedExertion: 8,
  notes: 'Felt explosive on weighted pull-ups. Clean scapular depression and full lockout.',
  exercises: [
    {
      exerciseId: 'ex_pullup',
      exerciseName: 'Weighted Pull-Up',
      targetSets: 4,
      targetReps: '6-8',
      sets: [
        { id: 's1', setNumber: 1, reps: 8, weightKg: 15, completed: true },
        { id: 's2', setNumber: 2, reps: 8, weightKg: 15, completed: true },
        { id: 's3', setNumber: 3, reps: 7, weightKg: 20, completed: true, isPr: true },
        { id: 's4', setNumber: 4, reps: 6, weightKg: 20, completed: true },
      ],
      notes: 'New PR on set 3 (+20kg x 7 reps)!'
    },
    {
      exerciseId: 'ex_deadlift',
      exerciseName: 'Barbell Deadlift (Conventional)',
      targetSets: 3,
      targetReps: '5',
      sets: [
        { id: 's5', setNumber: 1, reps: 5, weightKg: 140, completed: true },
        { id: 's6', setNumber: 2, reps: 5, weightKg: 150, completed: true },
        { id: 's7', setNumber: 3, reps: 4, weightKg: 160, completed: true },
      ]
    }
  ]
};

export const initialPRs: PersonalRecord[] = [
  {
    id: 'pr_1',
    exerciseId: 'ex_deadlift',
    exerciseName: 'Barbell Deadlift',
    metric: '1RM Estimated',
    value: 185,
    previousValue: 175,
    unit: 'kg',
    achievedAt: '2026-09-24T18:30:00Z',
  },
  {
    id: 'pr_2',
    exerciseId: 'ex_pullup',
    exerciseName: 'Weighted Pull-Up',
    metric: 'Max Added Ballast',
    value: 20,
    previousValue: 15,
    unit: 'kg',
    achievedAt: '2026-09-28T17:15:00Z',
  },
  {
    id: 'pr_3',
    exerciseId: 'ex_squat',
    exerciseName: 'Barbell Back Squat',
    metric: '5RM Working Weight',
    value: 140,
    previousValue: 135,
    unit: 'kg',
    achievedAt: '2026-09-20T19:00:00Z',
  }
];

export const initialMeals: MealEntry[] = [
  {
    id: 'meal_1',
    date: new Date().toISOString().split('T')[0],
    mealType: 'Breakfast',
    title: 'Overnight Oats Power Fuel',
    calories: 520,
    proteinG: 38,
    carbsG: 68,
    fatG: 12,
    items: ['100g Rolled Oats', '1 Scoop ELEVE Isolate', '150ml Almond Milk', '30g Blueberries', '10g Chia Seeds'],
    loggedAt: '08:15 AM'
  },
  {
    id: 'meal_2',
    date: new Date().toISOString().split('T')[0],
    mealType: 'Lunch',
    title: 'Protein Bowl',
    calories: 380, // 380 kcal as specified
    proteinG: 42, // 42g protein as specified
    carbsG: 34,
    fatG: 10,
    items: ['180g Grilled Chicken Breast', '120g Steamed Quinoa', 'Roasted Broccoli & Edamame', 'Tahini Lemon Drizzle'],
    loggedAt: '01:10 PM'
  },
  {
    id: 'meal_3',
    date: new Date().toISOString().split('T')[0],
    mealType: 'Pre-Workout',
    title: 'Rice Cake & Honey Nitro Fuel',
    calories: 240,
    proteinG: 6,
    carbsG: 50,
    fatG: 2,
    items: ['3 Brown Rice Cakes', '15g Raw Acacia Honey', 'Pink Himalayan Salt'],
    loggedAt: '04:45 PM'
  },
  {
    id: 'meal_4',
    date: new Date().toISOString().split('T')[0],
    mealType: 'Dinner',
    title: 'Atlantic Salmon & Sweet Potato',
    calories: 700,
    proteinG: 59,
    carbsG: 43,
    fatG: 24,
    items: ['220g Pan-Seared Salmon Fillet', '200g Baked Sweet Potato', 'Steamed Asparagus spears with extra virgin olive oil'],
    loggedAt: '08:20 PM'
  }
];

export const initialRecipes: Recipe[] = [
  {
    id: 'rec_protein_bowl',
    title: 'Protein Bowl',
    category: 'High Protein / Lean',
    prepTimeMin: 15,
    calories: 380,
    proteinG: 42,
    carbsG: 34,
    fatG: 10,
    ingredients: [
      { name: 'Grilled Herb Chicken Breast', amount: '180g' },
      { name: 'Tri-Color Quinoa', amount: '120g cooked' },
      { name: 'Steamed Broccoli Florets', amount: '80g' },
      { name: 'Shelled Edamame', amount: '50g' },
      { name: 'Tahini Lemon Dressing', amount: '1 tbsp' }
    ],
    instructions: [
      'Grill diced chicken breast over medium-high heat with garlic and oregano until internal temperature hits 165°F.',
      'Steam quinoa in low-sodium vegetable stock.',
      'Arrange warm quinoa at base of bowl, layering grilled chicken, warm edamame, and broccoli.',
      'Whisk tahini with fresh lemon juice and warm water; drizzle across bowl.'
    ],
    tags: ['High Protein', 'Post-Workout', 'Low Fat', 'Meal Prep'],
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
    isSaved: true,
  },
  {
    id: 'rec_salmon_plate',
    title: 'Wild Salmon & Roasted Roots',
    category: 'Recovery / Omega-3',
    prepTimeMin: 22,
    calories: 590,
    proteinG: 46,
    carbsG: 38,
    fatG: 26,
    ingredients: [
      { name: 'Wild Alaskan Sockeye Salmon', amount: '200g' },
      { name: 'Roasted Sweet Potato Cubes', amount: '180g' },
      { name: 'Baby Spinach & Arugula', amount: '60g' },
      { name: 'Cold Pressed Avocado Oil', amount: '1 tsp' }
    ],
    instructions: [
      'Preheat oven to 400°F (205°C). Toss sweet potatoes in sea salt and avocado oil, roast for 20 minutes.',
      'Sear salmon skin-side down in cast iron skillet for 4 minutes until crisp, flip for 2 minutes.',
      'Serve alongside fresh greens and roast sweet potato.'
    ],
    tags: ['Omega 3', 'Anti-Inflammatory', 'Recovery', 'Clean Carbs'],
    imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&auto=format&fit=crop&q=80',
    isSaved: true,
  },
  {
    id: 'rec_anabolic_pancakes',
    title: 'Fluffy Anabolic Protein Pancakes',
    category: 'Breakfast / Fuel',
    prepTimeMin: 12,
    calories: 440,
    proteinG: 45,
    carbsG: 48,
    fatG: 8,
    ingredients: [
      { name: 'ELEVE Isolate Whey (Vanilla)', amount: '1 scoop (30g)' },
      { name: 'Oat Flour', amount: '50g' },
      { name: 'Liquid Egg Whites', amount: '150ml' },
      { name: 'Baking Powder', amount: '1/2 tsp' },
      { name: 'Zero-Sugar Maple Syrup', amount: '2 tbsp' }
    ],
    instructions: [
      'Blend oat flour, whey, egg whites, and baking powder until smooth batter forms.',
      'Heat non-stick griddle over medium-low heat.',
      'Pour silver-dollar disks, cooking until bubbles form on surface, then flip for 90 seconds.',
      'Stack high and top with fresh berries and maple glaze.'
    ],
    tags: ['High Protein', 'Breakfast', 'Sweet Tooth', 'Quick'],
    imageUrl: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=600&auto=format&fit=crop&q=80',
    isSaved: false,
  }
];

export const initialChallenges: Challenge[] = [
  {
    id: 'chal_consistency_30',
    title: '30 Day Consistency Protocol',
    category: 'Habit & Discipline',
    description: 'Complete 24 authenticated training or active recovery sessions in 30 days. Forge immovable discipline.',
    durationDays: 30,
    daysRemaining: 16,
    goalType: 'consistency',
    targetValue: 24,
    currentProgress: 14,
    participantsCount: 3420,
    xpReward: 1500,
    badgeName: 'Titan of Consistency',
    isJoined: true,
    isCompleted: false,
    endDate: '2026-10-16',
  },
  {
    id: 'chal_steps_100k',
    title: '100K Steps Aerobic Surge',
    category: 'Cardiovascular',
    description: 'Log 100,000 steps across 7 rolling days to skyrocket metabolic NEAT and active mitochondrial density.',
    durationDays: 7,
    daysRemaining: 4,
    goalType: 'steps',
    targetValue: 100000,
    currentProgress: 68400,
    participantsCount: 1890,
    xpReward: 800,
    badgeName: 'Centurion Pacer',
    isJoined: true,
    isCompleted: false,
    endDate: '2026-10-04',
  },
  {
    id: 'chal_pushup_500',
    title: 'Push-Up Mastery: 500 Reps',
    category: 'Calisthenics',
    description: 'Accumulate 500 strict chest-to-deck push-ups across 10 days.',
    durationDays: 10,
    daysRemaining: 8,
    goalType: 'volume',
    targetValue: 500,
    currentProgress: 210,
    participantsCount: 2410,
    xpReward: 600,
    badgeName: 'Iron Chest',
    isJoined: true,
    isCompleted: false,
    endDate: '2026-10-08',
  },
  {
    id: 'chal_hyrox_prep',
    title: 'HYROX Prep Championship',
    category: 'Hybrid Competition',
    description: 'Log 8 comprehensive HYROX station simulations, 50km recorded runs, and 4,000m total sled resistance.',
    durationDays: 21,
    daysRemaining: 12,
    goalType: 'workouts',
    targetValue: 8,
    currentProgress: 5,
    participantsCount: 950,
    xpReward: 2000,
    badgeName: 'HYROX Finisher',
    isJoined: false,
    isCompleted: false,
    endDate: '2026-10-12',
  },
  {
    id: 'chal_mobility_month',
    title: 'Mobility Month',
    category: 'Joint Longevity',
    description: '15 minutes of structured hip and thoracic mobility daily for 30 consecutive days.',
    durationDays: 30,
    daysRemaining: 22,
    goalType: 'consistency',
    targetValue: 30,
    currentProgress: 8,
    participantsCount: 1430,
    xpReward: 1000,
    badgeName: 'Supple Leopard',
    isJoined: false,
    isCompleted: false,
    endDate: '2026-10-22',
  },
  {
    id: 'chal_strength_builder',
    title: 'Strength Builder: 50 Ton Volume',
    category: 'Powerlifting',
    description: 'Accumulate 50,000 kg of total barbell/dumbbell resistance volume over 14 days.',
    durationDays: 14,
    daysRemaining: 9,
    goalType: 'volume',
    targetValue: 50000,
    currentProgress: 28400,
    participantsCount: 1120,
    xpReward: 1200,
    badgeName: 'Barbell Beast',
    isJoined: false,
    isCompleted: false,
    endDate: '2026-10-09',
  }
];

export const initialAchievements: Achievement[] = [
  {
    id: 'ach_first_workout',
    code: 'FIRST_WORKOUT',
    title: 'Ignition Pulse',
    description: 'Completed your very first logged workout session on ELEVE.',
    category: 'Milestone',
    icon: 'Zap',
    xp: 100,
    unlockedAt: '2026-01-15T09:30:00Z',
    progressPercent: 100,
    isUnlocked: true,
  },
  {
    id: 'ach_7_streak',
    code: '7_DAY_STREAK',
    title: '7 Day Unbroken Momentum',
    description: 'Maintained training and nutritional logging for 7 consecutive days.',
    category: 'Consistency',
    icon: 'Flame',
    xp: 250,
    unlockedAt: '2026-01-22T21:00:00Z',
    progressPercent: 100,
    isUnlocked: true,
  },
  {
    id: 'ach_30_streak',
    code: '30_DAY_STREAK',
    title: '30 Day Relentless Machine',
    description: 'Logged training or recovery consistency across 30 days without failure.',
    category: 'Consistency',
    icon: 'ShieldCheck',
    xp: 750,
    progressPercent: 46, // 14 / 30 days
    isUnlocked: false,
  },
  {
    id: 'ach_first_pr',
    code: 'FIRST_PR',
    title: 'Barrier Shattered',
    description: 'Set your first Personal Record in any tracked compound lift or exercise.',
    category: 'Strength',
    icon: 'Trophy',
    xp: 300,
    unlockedAt: '2026-09-20T19:00:00Z',
    progressPercent: 100,
    isUnlocked: true,
  },
  {
    id: 'ach_100_workouts',
    code: '100_WORKOUTS',
    title: 'Centurion Athlete',
    description: 'Log 100 completed training sessions on ELEVE.',
    category: 'Milestone',
    icon: 'Award',
    xp: 1000,
    progressPercent: 78, // 78 / 100
    isUnlocked: false,
  },
  {
    id: 'ach_chal_completed',
    code: 'CHALLENGE_COMPLETED',
    title: 'Victor of the Arena',
    description: 'Conquer and finish any public challenge.',
    category: 'Endurance',
    icon: 'Crown',
    xp: 500,
    unlockedAt: '2026-08-30T16:00:00Z',
    progressPercent: 100,
    isUnlocked: true,
  }
];

export const initialLeaderboard: LeaderboardEntry[] = [
  {
    id: 'lead_1',
    rank: 1,
    name: 'Kai V.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    score: 9840,
    category: 'Global All-Star',
    streak: 42,
    consistency: 98.4,
  },
  {
    id: 'lead_2',
    rank: 2,
    name: 'Soren Lind',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    score: 9410,
    category: 'HYROX Elite',
    streak: 38,
    consistency: 96.2,
  },
  {
    id: 'lead_3',
    rank: 3,
    name: 'Alex Mercer (You)',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    score: 8950,
    category: 'Strength + Endurance',
    streak: 14,
    consistency: 91.0,
    isCurrentUser: true,
  },
  {
    id: 'lead_4',
    rank: 4,
    name: 'Maya Chen',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    score: 8720,
    category: 'Calisthenics Pro',
    streak: 21,
    consistency: 89.5,
  },
  {
    id: 'lead_5',
    rank: 5,
    name: 'Darius Thorne',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
    score: 8460,
    category: 'Powerlifting Heavy',
    streak: 19,
    consistency: 88.0,
  }
];

export const initialDiaryEntries: DiaryEntry[] = [
  {
    id: 'diary_1',
    date: new Date().toISOString().split('T')[0],
    mood: 'Strong',
    energyLevel: 8,
    recoveryPerception: 8,
    workoutNotes: 'Pull session felt silky smooth. Hit +20kg on weighted pull-ups. Left scapula felt completely stable with zero impingement.',
    nutritionNotes: 'Hit 145g protein so far. Dinner planned with 59g from fresh sockeye salmon. Hydration steady at 1.2L, need to drink another 800ml before 9pm.',
    reflections: 'Sleep last night was 5.6h due to late project wrap-up, but nervous system felt receptive. Prioritizing 8h tonight with Magnesium Bisglycinate stack.',
    tags: ['PR Day', 'Back Focus', 'Sleep Optimization'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'diary_2',
    date: '2026-09-28',
    mood: 'Peak',
    energyLevel: 9,
    recoveryPerception: 9,
    workoutNotes: 'Zone 2 aerobic flush: 45 min steady-state rowing and turf mobility.',
    nutritionNotes: 'Clean 2,750 kcal refuel day. 195g protein, high carbs.',
    reflections: 'Mental clarity is at an all-time high. The weekly periodization schedule is paying dividends in joint comfort.',
    tags: ['Zone 2', 'Active Recovery'],
    createdAt: '2026-09-28T20:00:00Z',
    updatedAt: '2026-09-28T20:00:00Z',
  }
];

export const initialCommunityPosts: CommunityPost[] = [
  {
    id: 'post_1',
    userId: 'usr_alex_001',
    authorName: 'Alex Mercer',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    authorRole: 'Pro Member',
    content: 'Week 5 / 8 of Hypertrophy Block locked in. Shattered my weighted pull-up PR with +20kg for 7 clean reps. Progressive overload is a mathematical discipline.',
    workoutSummary: {
      name: 'Pull Hypertrophy & Back Density',
      discipline: 'Strength',
      durationMin: 60,
      volumeKg: 1240,
      prCount: 1,
    },
    achievementBadge: 'Barrier Shattered',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
    likesCount: 38,
    commentsCount: 6,
    isLiked: false,
    createdAt: '2 hours ago',
    comments: [
      {
        id: 'c1',
        postId: 'post_1',
        userId: 'usr_elena',
        authorName: 'Elena Vance (Coach)',
        authorAvatar: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&auto=format&fit=crop&q=80',
        content: 'Noticeable speed out of the bottom dead-hang stretch. Scapular timing looks spot on. Great work!',
        createdAt: '1 hour ago'
      },
      {
        id: 'c2',
        postId: 'post_1',
        userId: 'usr_soren',
        authorName: 'Soren Lind',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
        content: 'Huge lift brother! That +20kg pull-up is no joke.',
        createdAt: '30 mins ago'
      }
    ]
  },
  {
    id: 'post_2',
    userId: 'usr_marcus',
    authorName: 'Marcus Thorne',
    authorAvatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&auto=format&fit=crop&q=80',
    authorRole: 'HYROX Master Coach',
    content: 'Pacing breakdown for the sled push: your initial drive must be continuous. The moment you hesitate or halt, kinetic coefficient becomes static friction and demands twice the wattage. Commit and drive!',
    likesCount: 92,
    commentsCount: 14,
    isLiked: true,
    createdAt: '5 hours ago',
  }
];

export const initialCoaches: Coach[] = [
  {
    id: 'coach_1',
    name: 'Elena Vance',
    title: 'Head of Biomechanics & Hypertrophy',
    specialization: 'Strength & Hypertrophy',
    experienceYears: 11,
    rating: 4.98,
    reviewsCount: 142,
    hourlyRate: 120,
    bio: 'Former Olympic weightlifting coach specializing in bar trajectory optimization, joint longevity, and progressive overload periodization.',
    credentials: ['CSCS Certified', 'USAW Level 2', 'M.S. Exercise Physiology'],
    avatarUrl: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&auto=format&fit=crop&q=80',
    availableSlots: ['Tomorrow at 10:00 AM', 'Tomorrow at 02:30 PM', 'Friday at 09:00 AM', 'Saturday at 11:00 AM']
  },
  {
    id: 'coach_2',
    name: 'Marcus Thorne',
    title: 'Elite HYROX & Hybrid Performance Lead',
    specialization: 'HYROX & Combat Conditioning',
    experienceYears: 9,
    rating: 4.94,
    reviewsCount: 98,
    hourlyRate: 110,
    bio: 'Top 1% European HYROX Pro athlete with podium finishes across three continents. Master of metabolic thresholds and pacing strategy.',
    credentials: ['HYROX Master Trainer', 'CrossFit Level 3', 'Oxygen Advantage Coach'],
    avatarUrl: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&auto=format&fit=crop&q=80',
    availableSlots: ['Today at 05:00 PM', 'Thursday at 11:30 AM', 'Friday at 03:00 PM']
  },
  {
    id: 'coach_3',
    name: 'Aria Solis',
    title: 'Director of Functional Mobility & Recovery',
    specialization: 'Mobility, Yoga & Fascial Health',
    experienceYears: 8,
    rating: 4.96,
    reviewsCount: 87,
    hourlyRate: 95,
    bio: 'Dedicated to unlocking dormant athletic range of motion, nervous system down-regulation, and bulletproofing joints against injury.',
    credentials: ['FRC Mobility Specialist', 'E-RYT 500', 'Functional Movement Screen (FMS)'],
    avatarUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&auto=format&fit=crop&q=80',
    availableSlots: ['Tomorrow at 08:00 AM', 'Thursday at 04:00 PM', 'Saturday at 10:00 AM']
  }
];

export const initialProducts: ProductItem[] = [
  {
    id: 'prod_isolate',
    name: 'ELEVE Isolate Matrix 100',
    category: 'Protein',
    subtitle: 'Cold-Processed Microfiltered Native Whey Isolate',
    rating: 4.95,
    reviewsCount: 312,
    price: 58.00,
    description: 'Ultra-pure, cold-processed native whey isolate yielding 27g protein per scoop with zero added sugars, fast gastrointestinal transit, and 6.2g naturally occurring BCAAs.',
    ingredients: ['Cold-Processed Whey Protein Isolate', 'DigeZyme Multi-Enzyme Complex', 'Natural Vanilla Bean', 'Stevia Leaf Extract', 'Sunflower Lecithin'],
    considerations: [
      'Consume within 45 minutes post-workout for maximal muscle protein synthesis.',
      'Mixes instantly with cold water or almond milk without clumping.'
    ],
    safetyNotes: 'Contains milk derivatives. Consult a healthcare professional before use if lactose sensitive. This product is not intended to diagnose, treat, or cure any disease.',
    imageUrl: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'prod_creatine',
    name: 'ELEVE Creapure Ultrafine',
    category: 'Creatine',
    subtitle: '100% German Creapure Micronized Creatine Monohydrate',
    rating: 4.99,
    reviewsCount: 480,
    price: 36.00,
    description: 'Gold-standard micronized creatine monohydrate synthesized in Germany. Clinically tested to boost ATP resynthesis, peak power output, and intracellular hydration.',
    ingredients: ['Creapure Micronized Creatine Monohydrate (99.99% purity)'],
    considerations: [
      'Take 5g consistently every single day, whether training or resting.',
      'No loading phase strictly required; intracellular saturation achieved in 21 days.'
    ],
    safetyNotes: 'Maintain adequate daily hydration (minimum 2.5-3.0 liters of water daily). Consult your physician if you have pre-existing renal conditions.',
    imageUrl: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'prod_sleep',
    name: 'ELEVE Deep Sleep Neuro-Recovery',
    category: 'Recovery',
    subtitle: 'Magnesium Bisglycinate, L-Theanine & Apigenin Stack',
    rating: 4.92,
    reviewsCount: 195,
    price: 44.00,
    description: 'Non-melatonin restorative nocturnal formulation engineered to maximize deep slow-wave sleep and athletic neural rejuvenation.',
    ingredients: ['Magnesium Bisglycinate Chelate (350mg)', 'L-Theanine (200mg)', 'Apigenin from Chamomile (50mg)', 'Tart Cherry Extract (500mg)'],
    considerations: [
      'Take 30-45 minutes before sleep with a small glass of water.',
      'Dim artificial ambient lighting for synergistic GABA receptor activation.'
    ],
    safetyNotes: 'Do not operate heavy machinery after ingestion. Do not combine with sedatives or alcohol. Individual responses may vary.',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80'
  }
];

export const initialReviews: ProductReview[] = [
  {
    id: 'rev_1',
    targetType: 'Product',
    targetId: 'prod_isolate',
    targetName: 'ELEVE Isolate Matrix 100',
    authorName: 'Marcus T.',
    rating: 5,
    title: 'Absolute purity, zero stomach bloat',
    body: 'Hands down the cleanest whey isolate I have ever digested. Dissolves within 5 seconds with zero foam.',
    createdAt: '3 days ago'
  },
  {
    id: 'rev_2',
    targetType: 'Coach',
    targetId: 'coach_1',
    targetName: 'Elena Vance',
    authorName: 'Alex Mercer',
    rating: 5,
    title: 'Transformative hip hinge analysis',
    body: 'Elena caught my slight hip shift on rep 3 of deadlifts in our first 15 minutes. Added 10kg to my pull pain-free.',
    createdAt: '1 week ago'
  }
];

export const initialConnectedDevices: ConnectedDevice[] = [
  {
    provider: 'Apple Health',
    deviceName: 'Apple Watch Ultra 2',
    icon: 'Apple',
    isConnected: true,
    lastSync: '12 mins ago',
    syncStatus: 'Ready',
  },
  {
    provider: 'Garmin',
    deviceName: 'Garmin Forerunner 965',
    icon: 'Activity',
    isConnected: false,
    syncStatus: 'Ready',
  },
  {
    provider: 'Google Fit / Health Connect',
    deviceName: 'Pixel Watch / Health Connect',
    icon: 'Radio',
    isConnected: false,
    syncStatus: 'Ready',
  },
  {
    provider: 'Whoop',
    deviceName: 'Whoop 4.0 Band',
    icon: 'Disc',
    isConnected: true,
    lastSync: '5 mins ago',
    syncStatus: 'Ready',
  }
];
