import fs from 'fs';
import path from 'path';

function replaceInFile(filePath, replacements) {
    const fullPath = path.resolve(process.cwd(), filePath);
    let content = fs.readFileSync(fullPath, 'utf8');
    for (const [regex, replacement] of replacements) {
        content = content.replace(regex, replacement);
    }
    fs.writeFileSync(fullPath, content);
}

replaceInFile('src/pages/TodayDashboard.tsx', [
    [/workoutHistory,\s*/g, ''],
    [/achievements,\s*/g, ''],
    [/Zap,\s*/g, '']
]);

replaceInFile('src/pages/NutritionPage.tsx', [
    [/Apple,\s*/g, ''],
    [/Flame,\s*/g, ''],
    [/UtensilsCrossed,\s*/g, ''],
    [/CheckCircle2,\s*/g, ''],
    [/Trash2,\s*/g, ''],
    [/PieChart,\s*/g, '']
]);

replaceInFile('src/pages/OnboardingPage.tsx', [
    [/Dumbbell,\s*/g, ''],
    [/Target,\s*/g, ''],
    [/Calendar,\s*/g, ''],
    [/Clock,\s*/g, ''],
    [/Layers,\s*/g, ''],
    [/Sparkles,\s*/g, '']
]);

replaceInFile('src/pages/ProfilePage.tsx', [
    [/personalRecords,\s*/g, ''],
    [/achievements\s*\} = useEleve/g, '} = useEleve'],
    [/,\s*\} = useEleve/g, '} = useEleve']
]);

replaceInFile('src/pages/CommunityPage.tsx', [
    [/Sparkles,\s*/g, ''],
    [/CheckCircle,\s*/g, '']
]);

replaceInFile('src/pages/ReviewsPage.tsx', [
    [/MessageSquare,\s*/g, ''],
    [/products,\s*/g, ''],
    [/coaches\s*\} = useEleve/g, '} = useEleve'],
    [/,\s*\} = useEleve/g, '} = useEleve']
]);

replaceInFile('src/pages/RecipesPage.tsx', [
    [/UtensilsCrossed,\s*/g, ''],
    [/Flame,\s*/g, ''],
    [/CheckCircle,\s*/g, ''],
    [/const \[newCategory, setNewCategory\]/g, 'const [newCategory, _setNewCategory]'],
    [/const \[newPrepTime, setNewPrepTime\]/g, 'const [newPrepTime, _setNewPrepTime]']
]);

replaceInFile('src/context/EleveContext.tsx', [
    [/const \{ unlockedAt, ...rest \}/g, 'const { unlockedAt: _, ...rest }']
]);

console.log("Cleanup script completed!");
