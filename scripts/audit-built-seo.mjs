import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const distRoot = path.resolve("dist");
const failures = [];

const walk = async (directory) => {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(entryPath)));
    else files.push(entryPath);
  }
  return files;
};

const countMatches = (source, pattern) => source.match(pattern)?.length ?? 0;
const htmlFiles = (await walk(distRoot)).filter((file) => file.endsWith(".html"));

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const relative = path.relative(distRoot, file).replaceAll("\\", "/");

  if (relative === "game/index.html") {
    if (!/<meta\s+name=["']robots["']\s+content=["']noindex,nofollow["']/i.test(html)) {
      failures.push(`${relative}: raw game document must be noindex,nofollow`);
    }
    continue;
  }

  if (countMatches(html, /<title>/gi) !== 1) failures.push(`${relative}: expected exactly one title`);
  if (countMatches(html, /<meta\s+name=["']description["']/gi) !== 1) failures.push(`${relative}: expected exactly one meta description`);
  if (countMatches(html, /<link\s+rel=["']canonical["']/gi) !== 1) failures.push(`${relative}: expected exactly one canonical link`);

  const canonical = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i)?.[1];
  if (!canonical?.startsWith("https://magicsort.online/")) failures.push(`${relative}: canonical must use the non-www HTTPS origin`);
  if (canonical && canonical !== "https://magicsort.online/" && !canonical.endsWith("/")) failures.push(`${relative}: canonical must end with a slash`);

  for (const [, json] of html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      JSON.parse(json);
    } catch {
      failures.push(`${relative}: contains invalid JSON-LD`);
    }
  }
}

const sitemap = await readFile(path.join(distRoot, "sitemap.xml"), "utf8");
if (sitemap.includes("/game/")) failures.push("sitemap.xml: raw game files must not be listed");
if (sitemap.includes("www.magicsort.online")) failures.push("sitemap.xml: found a www URL");

const articlePages = htmlFiles.filter((file) => path.relative(distRoot, file).replaceAll("\\", "/").startsWith("blog/") && path.basename(path.dirname(file)) !== "blog");
if (articlePages.length !== 30) failures.push(`expected 30 built article pages, found ${articlePages.length}`);

if (failures.length) {
  console.error("Built SEO audit failed:\n" + failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log(`Audited ${htmlFiles.length} HTML files, ${articlePages.length} articles, and the XML sitemap.`);
