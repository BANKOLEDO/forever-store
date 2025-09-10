import sharp from "sharp";
import fs from "fs";
import path from "path";

// Input folder: change if needed
const foldersToConvert = [
  "src/assets/",
  "src/assets/admin_assets"
];

// Loop through each folder
foldersToConvert.forEach((folder) => {
  const inputDir = path.join(process.cwd(), folder);
  const outputDir = path.join(inputDir, "webp");

  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  fs.readdirSync(inputDir)
    .filter((file) => file.endsWith(".png"))
    .forEach((file) => {
      const inputPath = path.join(inputDir, file);
      const outputPath = path.join(outputDir, file.replace(".png", ".webp"));

      sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath)
        .then(() => console.log(`${folder}/${file} -> webp done`))
        .catch((err) =>
          console.error(`Error converting ${folder}/${file}:`, err)
        );
    });
});
