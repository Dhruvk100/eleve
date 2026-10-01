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

replaceInFile('src/context/AuthContext.tsx', [
    [/export const useAuth = \(\): AuthContextValue => \{/g, '// eslint-disable-next-line react-refresh/only-export-components\nexport const useAuth = (): AuthContextValue => {']
]);

replaceInFile('src/context/EleveContext.tsx', [
    [/export const useEleve = \(\): EleveContextValue => \{/g, '// eslint-disable-next-line react-refresh/only-export-components\nexport const useEleve = (): EleveContextValue => {']
]);

console.log("Cleanup script completed!");
