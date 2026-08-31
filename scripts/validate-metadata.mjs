#!/usr/bin/env node

/**
 * Validates metadata.json files for Mudra assets against the JSON schema.
 *
 * Checks:
 * - File exists and is valid JSON
 * - All required fields are present (name, slug, region, category, description, tags, creator, source, license)
 * - Field types and constraints match the schema
 * - Slug matches kebab-case pattern
 * - Category is one of the allowed values
 * - License is CC-BY-4.0
 * - Adapted sources include url and license
 *
 * Usage:
 *   node scripts/validate-metadata.mjs <path-to-metadata.json>
 */

import { readFileSync } from "node:fs";
import { resolve, relative, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCHEMA_PATH = join(__dirname, "..", "docs", "schemas", "metadata.schema.json");

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error("Usage: node scripts/validate-metadata.mjs <metadata.json> [metadata.json ...]");
  process.exit(1);
}

// Load the schema
let schema;
try {
  schema = JSON.parse(readFileSync(SCHEMA_PATH, "utf-8"));
} catch (err) {
  console.error(`Failed to load schema: ${err.message}`);
  process.exit(1);
}

let hasErrors = false;

for (const filePath of args) {
  const abs = resolve(filePath);
  const rel = relative(process.cwd(), abs);
  const errors = validateMetadata(abs);

  if (errors.length > 0) {
    hasErrors = true;
    console.error(`\n❌ ${rel}`);
    for (const err of errors) {
      console.error(`   - ${err}`);
    }
  } else {
    console.log(`✅ ${rel}`);
  }
}

if (hasErrors) {
  process.exit(1);
}

/**
 * @param {string} filePath
 * @returns {string[]}
 */
function validateMetadata(filePath) {
  const errors = [];
  let data;

  try {
    data = JSON.parse(readFileSync(filePath, "utf-8"));
  } catch (err) {
    errors.push(`Invalid JSON: ${err.message}`);
    return errors;
  }

  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    errors.push("Metadata must be a JSON object");
    return errors;
  }

  // Check required fields
  const required = ["name", "slug", "region", "category", "description", "tags", "creator", "source", "license"];
  for (const field of required) {
    if (!(field in data)) {
      errors.push(`Missing required field: "${field}"`);
    }
  }

  if (errors.length > 0) return errors;

  // Validate name
  if (typeof data.name !== "string" || data.name.length === 0) {
    errors.push('"name" must be a non-empty string');
  } else if (data.name.length > 100) {
    errors.push('"name" must be 100 characters or fewer');
  }

  // Validate slug
  if (typeof data.slug !== "string") {
    errors.push('"slug" must be a string');
  } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug)) {
    errors.push('"slug" must be lowercase kebab-case (e.g., "my-asset")');
  }

  // Validate region
  if (!Array.isArray(data.region) || data.region.length === 0) {
    errors.push('"region" must be a non-empty array');
  } else {
    for (const r of data.region) {
      if (typeof r !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(r)) {
        errors.push(`Invalid region "${r}" — must be lowercase kebab-case`);
      }
    }
    if (new Set(data.region).size !== data.region.length) {
      errors.push('"region" contains duplicate values');
    }
  }

  // Validate category
  const validCategories = [
    "architecture", "art", "clothing", "craft", "festival",
    "food", "instrument", "music", "object", "pattern",
    "performing-art", "symbol", "tradition", "transport",
  ];
  if (typeof data.category !== "string") {
    errors.push('"category" must be a string');
  } else if (!validCategories.includes(data.category)) {
    errors.push(`"category" must be one of: ${validCategories.join(", ")}`);
  }

  // Validate description
  if (typeof data.description !== "string") {
    errors.push('"description" must be a string');
  } else if (data.description.length < 10) {
    errors.push('"description" must be at least 10 characters');
  } else if (data.description.length > 1000) {
    errors.push('"description" must be 1000 characters or fewer');
  }

  // Validate tags
  if (!Array.isArray(data.tags) || data.tags.length === 0) {
    errors.push('"tags" must be a non-empty array');
  } else if (data.tags.length > 20) {
    errors.push('"tags" must have 20 items or fewer');
  } else {
    for (const tag of data.tags) {
      if (typeof tag !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(tag)) {
        errors.push(`Invalid tag "${tag}" — must be lowercase kebab-case`);
      }
    }
    if (new Set(data.tags).size !== data.tags.length) {
      errors.push('"tags" contains duplicate values');
    }
  }

  // Validate creator
  if (typeof data.creator !== "object" || data.creator === null || Array.isArray(data.creator)) {
    errors.push('"creator" must be an object');
  } else {
    if (typeof data.creator.name !== "string" || data.creator.name.length === 0) {
      errors.push('"creator.name" is required and must be a non-empty string');
    } else if (data.creator.name.length > 100) {
      errors.push('"creator.name" must be 100 characters or fewer');
    }
    if (data.creator.github !== undefined) {
      if (typeof data.creator.github !== "string" || !/^[A-Za-z0-9-]+$/.test(data.creator.github)) {
        errors.push('"creator.github" must be a valid GitHub username (alphanumeric and hyphens only)');
      }
    }
  }

  // Validate source
  if (typeof data.source !== "object" || data.source === null || Array.isArray(data.source)) {
    errors.push('"source" must be an object');
  } else {
    const validSourceTypes = ["original", "adapted"];
    if (!validSourceTypes.includes(data.source.type)) {
      errors.push('"source.type" must be "original" or "adapted"');
    } else if (data.source.type === "adapted") {
      if (!data.source.url) {
        errors.push('"source.url" is required when source.type is "adapted"');
      } else if (typeof data.source.url !== "string" || !isValidUrl(data.source.url)) {
        errors.push('"source.url" must be a valid URL');
      }
      if (!data.source.license || typeof data.source.license !== "string") {
        errors.push('"source.license" is required when source.type is "adapted"');
      }
    }
  }

  // Validate license
  if (typeof data.license !== "string") {
    errors.push('"license" must be a string');
  } else if (data.license !== "CC-BY-4.0") {
    errors.push('"license" must be "CC-BY-4.0"');
  }

  // Validate optional fields
  if (data.localNames !== undefined) {
    if (typeof data.localNames !== "object" || data.localNames === null || Array.isArray(data.localNames)) {
      errors.push('"localNames" must be an object');
    } else {
      for (const [key, val] of Object.entries(data.localNames)) {
        if (typeof val !== "string" || val.length === 0) {
          errors.push(`"localNames.${key}" must be a non-empty string`);
        } else if (val.length > 200) {
          errors.push(`"localNames.${key}" must be 200 characters or fewer`);
        }
      }
    }
  }

  if (data.sources !== undefined) {
    if (!Array.isArray(data.sources)) {
      errors.push('"sources" must be an array');
    } else {
      for (let i = 0; i < data.sources.length; i++) {
        const src = data.sources[i];
        if (typeof src !== "object" || src === null) {
          errors.push(`"sources[${i}]" must be an object`);
          continue;
        }
        if (typeof src.title !== "string" || src.title.length === 0) {
          errors.push(`"sources[${i}].title" is required`);
        }
        if (typeof src.url !== "string" || !isValidUrl(src.url)) {
          errors.push(`"sources[${i}].url" must be a valid URL`);
        }
      }
    }
  }

  if (data.notes !== undefined && typeof data.notes === "string" && data.notes.length > 1000) {
    errors.push('"notes" must be 1000 characters or fewer');
  }

  // Reject unexpected properties
  const allowed = new Set([
    "name", "slug", "region", "category", "description",
    "localNames", "tags", "creator", "source", "license",
    "sources", "notes",
  ]);

  for (const key of Object.keys(data)) {
    if (!allowed.has(key)) {
      errors.push(`Unexpected property: "${key}"`);
    }
  }

  return errors;
}

/**
 * @param {string} str
 * @returns {boolean}
 */
function isValidUrl(str) {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}
