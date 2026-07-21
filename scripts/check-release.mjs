import { readFile } from "node:fs/promises";

const manifest = JSON.parse(await readFile("public/.well-known/manse-game.json", "utf8"));
const hosting = JSON.parse(await readFile(".openai/hosting.json", "utf8"));
const failures = [];

for (const [field, value] of [
  ["gameUrl", manifest.gameUrl],
  ["sourceUrl", manifest.sourceUrl],
  ["thumbnail.url", manifest.thumbnail?.url],
  ["contentProvenance.provenanceUrl", manifest.contentProvenance?.provenanceUrl],
]) {
  if (typeof value !== "string") failures.push(`${field} is missing.`);
  else if (new URL(value).hostname.endsWith(".example.invalid") || value.includes("replace-me")) {
    failures.push(`${field} still contains a draft URL.`);
  }
}
if (typeof hosting.project_id !== "string" || hosting.project_id.length === 0) {
  failures.push(".openai/hosting.json is not connected to a Sites project.");
}
if (failures.length > 0) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log("Release metadata is connected and contains no draft URLs.");
}
