#!/usr/bin/env node

/**
 * Orchestrator script that validates all Mudra assets.
 *
 * What it does:
 * 1. Finds all .svg and metadata.json files under assets/
 * 2. Runs validate-svg.mjs on each SVG
 * 3. Runs validate-metadata.mjs on each metadata.json
 * 4. Validates directory structure (kebab-case naming at each level)
 * 5. Reports pass/fail summary
 *
 * Usage:
 *   node scripts/validate-assets.mjs
 *   node scripts/validate-assets.mjs assets/india/kerala/music/chenda/chenda.svg
 */

import { existsSync, readdirSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ─── Helpers ────────────────────────────────────────────────────────────────

/**
 * Recursively find files matching a predicate.
 * @param {string} dir
 * @param {(filePath: string) => boolean} predicate
 * @returns {string[]}
 */
function findFiles(dir, predicate) {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".git") continue;
      results.push(...findFiles(fullPath, predicate));
    } else if (predicate(fullPath)) {
      results.push(fullPath);
    }
  }
  return results;
}

// ─── Configuration ──────────────────────────────────────────────────────────

const svgScript = resolve(__dirname, "validate-svg.mjs");
const metaScript = resolve(__dirname, "validate-metadata.mjs");
const assetsDir = resolve(__dirname, "..", "assets");

const args = process.argv.slice(2);

// ─── Collect files ──────────────────────────────────────────────────────────

const svgFiles = [];
const metaFiles = [];

if (args.length > 0) {
  // Validate specific files passed as arguments
  for (const f of args) {
    const abs = resolve(f);
    if (abs.endsWith(".svg")) svgFiles.push(abs);
    else if (abs.endsWith("metadata.json")) metaFiles.push(abs);
  }
} else {
  // Find all assets automatically
  if (existsSync(assetsDir)) {
    svgFiles.push(...findFiles(assetsDir, (f) => f.endsWith(".svg")));
    metaFiles.push(...findFiles(assetsDir, (f) => f.endsWith("metadata.json")));
  }
}

// ─── Nothing to validate ───────────────────────────────────────────────────

if (svgFiles.length === 0 && metaFiles.length === 0) {
  console.log("No asset files found under assets/. Nothing to validate.");
  process.exit(0);
}

// ─── Run validators ─────────────────────────────────────────────────────────

let failed = false;

if (svgFiles.length > 0) {
  console.log(`\nValidating ${svgFiles.length} SVG file(s)...\n`);
  try {
    execFileSync(process.execPath, [svgScript, ...svgFiles], {
      stdio: "inherit",
    });
  } catch {
    failed = true;
  }
}

if (metaFiles.length > 0) {
  console.log(`\nValidating ${metaFiles.length} metadata file(s)...\n`);
  try {
    execFileSync(process.execPath, [metaScript, ...metaFiles], {
      stdio: "inherit",
    });
  } catch {
    failed = true;
  }
}

// ─── Validate directory structure ───────────────────────────────────────────

if (args.length === 0) {
  console.log("\n--- Directory Structure ---\n");
  const kebabCase = /^[a-z0-9]+(-[a-z0-9]+)*$/;

  try {
    for (const country of readdirSync(assetsDir, { withFileTypes: true })) {
      if (!country.isDirectory()) continue;
      if (!kebabCase.test(country.name)) {
        console.error(`[FAIL] assets/${country.name}: not valid kebab-case`);
        failed = true;
        continue;
      }

      for (const region of readdirSync(join(assetsDir, country.name), {
        withFileTypes: true,
      })) {
        if (!region.isDirectory()) continue;
        if (!kebabCase.test(region.name)) {
          console.error(
            `[FAIL] assets/${country.name}/${region.name}: not valid kebab-case`
          );
          failed = true;
          continue;
        }

        for (const cat of readdirSync(
          join(assetsDir, country.name, region.name),
          { withFileTypes: true }
        )) {
          if (!cat.isDirectory()) continue;

          for (const asset of readdirSync(
            join(assetsDir, country.name, region.name, cat.name),
            { withFileTypes: true }
          )) {
            if (!asset.isDirectory()) continue;
            const assetPath = `assets/${country.name}/${region.name}/${cat.name}/${asset.name}`;
            if (!kebabCase.test(asset.name)) {
              console.error(`[FAIL] ${assetPath}: not valid kebab-case`);
              failed = true;
            } else {
              console.log(`[OK]   ${assetPath}`);
            }
          }
        }
      }
    }
  } catch {
    /* assets dir might not exist yet */
  }
}

// ─── Summary ────────────────────────────────────────────────────────────────

console.log("\n" + "-".repeat(50));

if (failed) {
  console.error("Validation completed with errors.");
  process.exit(1);
} else {
  console.log("All assets passed validation.");
}
