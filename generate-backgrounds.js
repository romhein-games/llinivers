// generate-background.js
// npm install sharp fs-extra

import sharp from "sharp";
import fs from "fs-extra";

const inputDir = "./images";
const outputDir = "./output";

await fs.ensureDir(outputDir);

// ✅ Config des tailles à générer
const sizes = {
  portrait: [480, 720, 1080, 1536],
  landscapeMobile: [640, 896, 1280],
  landscapeDesktop: [1440, 1920, 2560, 3840],
};

// ✅ Fonction de génération
async function generateImages(file, name, widths) {
  for (const width of widths) {
    const outBase = `${outputDir}/${name}-${width}`;

    // Génération WebP
    await sharp(`${inputDir}/${file}`)
      .resize({ width })
      .toFormat("webp", { quality: 80 })
      .toFile(`${outBase}.webp`);

    // Génération JPG fallback
    await sharp(`${inputDir}/${file}`)
      .resize({ width })
      .jpeg({ quality: 75 })
      .toFile(`${outBase}.jpg`);

    console.log(`✅ Généré : ${outBase}.webp + .jpg`);
  }
}

// ✅ Lancement
async function main() {
  console.log("🚀 Génération des backgrounds...");

  // Portrait
  await generateImages("portrait.png", "portrait", sizes.portrait);

  // Landscape mobile
  await generateImages("landscape.png", "landscape", sizes.landscapeMobile);

  // Landscape desktop
  await generateImages("landscape.png", "landscape", sizes.landscapeDesktop);

  console.log("🎉 Terminé !");
}

main().catch(err => console.error(err));
