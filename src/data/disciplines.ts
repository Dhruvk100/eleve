import { TrainingDiscipline } from '../types';

export interface DisciplineInfo {
  id: TrainingDiscipline;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  intensity: 'Medium' | 'High' | 'Very High' | 'Restorative';
  activeAthletes: number;
  imageUrl: string;
}

export const disciplinesData: DisciplineInfo[] = [
  {
    id: 'Strength',
    title: 'Strength & Power',
    tagline: 'Hypertrophy, Barbell Biomechanics & Neurological Force',
    description: 'Master compound movements, optimize bar path, and engineer muscular density through progressive mechanical tension.',
    iconName: 'Dumbbell',
    intensity: 'High',
    activeAthletes: 18450,
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'Calisthenics',
    title: 'Bodyweight & Calisthenics',
    tagline: 'Relative Strength, Leverage & Gymnastic Control',
    description: 'Develop absolute dominance over your own bodyweight with strict levers, muscle-ups, handstands, and tendon durability.',
    iconName: 'Flame',
    intensity: 'High',
    activeAthletes: 12100,
    imageUrl: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'HYROX',
    title: 'HYROX & Hybrid Pacing',
    tagline: 'Metabolic Conditioning, Sled Propulsion & Erg Pacing',
    description: 'The global standard for functional fitness racing. Combine aerobic threshold running with high-output functional stations.',
    iconName: 'Zap',
    intensity: 'Very High',
    activeAthletes: 9800,
    imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'Combat Sports',
    title: 'Combat Sports Conditioning',
    tagline: 'Rotational Torque, Explosive Hips & Anaerobic Capacity',
    description: 'Forged for boxers, martial artists, and combat athletes requiring unbreakable rotational stiffness and rapid recovery between rounds.',
    iconName: 'Swords',
    intensity: 'Very High',
    activeAthletes: 6400,
    imageUrl: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'Yoga',
    title: 'Athletic Yoga & Flow',
    tagline: 'Breath-Sync, Balance & Structural Alignment',
    description: 'Dynamic vinyasa flows and isometric holds designed to lengthen compressed myofascial chains and cultivate mental stillness under tension.',
    iconName: 'Sparkles',
    intensity: 'Medium',
    activeAthletes: 8700,
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'Mobility',
    title: 'Mobility & Joint Longevity',
    tagline: 'Capsular Health, Active End-Range & FRC',
    description: 'Bulletproof knees, hips, and shoulders against repetitive stress injuries with targeted CARs (Controlled Articular Rotations) and PAILs/RAILs.',
    iconName: 'Shield',
    intensity: 'Restorative',
    activeAthletes: 14200,
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'Zumba',
    title: 'Rhythmic Cardio & Zumba',
    tagline: 'High-Energy Rhythmic Conditioning & Agility',
    description: 'High-tempo cardiovascular dance interval conditioning that elevates caloric expenditure and footwork dexterity in an exhilarating flow state.',
    iconName: 'Music',
    intensity: 'Medium',
    activeAthletes: 5300,
    imageUrl: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'Home Workouts',
    title: 'Home & Minimal Equipment',
    tagline: 'No Excuses, High Efficiency Anywhere',
    description: 'High-density resistance band, dumbbell, and bodyweight routines engineered to produce gym-level stimulus in the comfort of your living space.',
    iconName: 'Home',
    intensity: 'Medium',
    activeAthletes: 11900,
    imageUrl: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&auto=format&fit=crop&q=80',
  }
];
