import fs from 'fs';
import path from 'path';
import git from 'isomorphic-git';

const dir = 'C:/Users/Asus/.gemini/antigravity/scratch/eleve';

function getFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    if (file === 'node_modules' || file === '.git' || file === 'dist' || file === '.DS_Store') continue;
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getFiles(fullPath, arrayOfFiles);
    } else {
      const relPath = path.relative(dir, fullPath).replace(/\\/g, '/');
      arrayOfFiles.push(relPath);
    }
  }
  return arrayOfFiles;
}

async function main() {
  try {
    console.log('Initializing git repository...');
    await git.init({ fs, dir });

    const files = getFiles(dir);
    console.log(`Staging ${files.length} files...`);

    for (const filepath of files) {
      await git.add({ fs, dir, filepath });
    }

    const sha = await git.commit({
      fs,
      dir,
      author: {
        name: 'Dhruv Kaushal',
        email: 'dhruvkaushal369@gmail.com',
      },
      message: 'Initial commit: ELEVE Fitness Platform complete codebase',
    });

    console.log('Successfully committed! Commit SHA:', sha);
  } catch (err) {
    console.error('Error during git operation:', err);
  }
}

main();
