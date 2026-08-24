import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const articleDirectory = join(process.cwd(), "src", "data", "questionArticles");
const articleFiles = readdirSync(articleDirectory)
  .filter((file) => file.endsWith(".ts") && file !== "index.ts")
  .sort();
const seenSlugs = new Set();
const failures = [];

const extract = (source, pattern, label, file) => {
  const match = source.match(pattern);
  if (!match) {
    failures.push(`${file}: missing ${label}`);
    return "";
  }
  return match[1];
};

const countWords = (html) => {
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z0-9#]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.match(/[A-Za-z0-9]+(?:['-][A-Za-z0-9]+)*/g)?.length ?? 0;
};

for (const file of articleFiles) {
  const source = readFileSync(join(articleDirectory, file), "utf8");
  const slug = extract(source, /slug:\s*"([^"]+)"/, "slug", file);
  const title = extract(source, /title:\s*"([^"]+)"/, "title", file);
  const description = extract(source, /description:\s*"([^"]+)"/, "description", file);
  const html = extract(source, /html:\s*`([\s\S]*?)`,\s*\n};/, "HTML body", file);
  const words = countWords(html);

  if (seenSlugs.has(slug)) failures.push(`${file}: duplicate slug ${slug}`);
  seenSlugs.add(slug);
  if (words < 1500 || words > 2000) failures.push(`${file}: ${words} words (expected 1500-2000)`);
  if (title.length > 65) failures.push(`${file}: title is ${title.length} characters`);
  if (description.length < 100 || description.length > 160) {
    failures.push(`${file}: description is ${description.length} characters (expected 100-160)`);
  }
  if (!html.includes("<h2>The short answer</h2>")) failures.push(`${file}: missing short-answer section`);

  console.log(`${file}: ${words} words | ${title.length} title chars | ${description.length} description chars`);
}

if (articleFiles.length !== 12) failures.push(`expected 12 article files, found ${articleFiles.length}`);

if (failures.length) {
  console.error("\nValidation failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`\nValidated ${articleFiles.length} question articles.`);
