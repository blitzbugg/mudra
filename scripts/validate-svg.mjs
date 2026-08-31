#!/usr/bin/env node

/**
 * Validates SVG files for Mudra asset compliance.
 *
 * Checks:
 * - File is valid SVG (has <svg> root element)
 * - Contains a viewBox attribute
 * - No embedded raster images (PNG, JPEG, WebP, GIF)
 * - No <script> tags or event handlers
 * - No external references (xlink:href to URLs, external stylesheets)
 * - No iframes or foreignObject with embedded content
 *
 * Usage:
 *   node scripts/validate-svg.mjs <path-to-svg>
 *   node scripts/validate-svg.mjs assets/region/category/asset.svg
 */


import { readFileSync } from "node:fs";
import { resolve, relative } from "node:path";

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error("Usage: node scripts/validate-svg.mjs <svg-file> [svg-file ...]");
  process.exit(1);
}

let hasErrors = false;

for (const filePath of args) {
  const abs = resolve(filePath);
  const rel = relative(process.cwd(), abs);
  const errors = validateSvg(abs);

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
function validateSvg(filePath) {
  const errors = [];
  let content;

  try {
    content = readFileSync(filePath, "utf-8");
  } catch (err) {
    errors.push(`Cannot read file: ${err.message}`);
    return errors;
  }

  // Check it has an <svg root element
  const svgMatch = content.match(/<svg[\s>]/i);
  if (!svgMatch) {
    errors.push("Not a valid SVG: missing <svg> root element");
    return errors;
  }

  // Check for viewBox
  if (!/viewBox\s*=\s*["'][^"']+["']/i.test(content)) {
    errors.push("Missing viewBox attribute on <svg> element");
  }

  // Check for embedded raster images
  const rasterPatterns = [
    /<image[\s>][^>]*href\s*=\s*["']data:image\/(png|jpeg|jpg|webp|gif)/i,
    /<image[\s>][^>]*xlink:href\s*=\s*["']data:image\/(png|jpeg|jpg|webp|gif)/i,
    /<image[\s>][^>]*href\s*=\s*["']https?:\/\//i,
    /<image[\s>][^>]*xlink:href\s*=\s*["']https?:\/\//i,
    /<image[\s>][^>]*href\s*=\s*["'][^"']*\.(png|jpe?g|webp|gif)/i,
  ];

  for (const pattern of rasterPatterns) {
    if (pattern.test(content)) {
      errors.push("SVG contains embedded or external raster images (<image> with PNG/JPEG/WebP/GIF)");
      break;
    }
  }

  // Check for script tags
  if (/<script[\s>]/i.test(content)) {
    errors.push("SVG contains <script> tags (not allowed)");
  }

  // Check for event handlers on elements
  if (/on(click|load|error|mouseover|mouseout|mousemove|focus|blur|submit|change|input|keydown|keyup)\s*=/i.test(content)) {
    errors.push("SVG contains inline event handlers (not allowed)");
  }

  // Check for iframes
  if (/<iframe[\s>]/i.test(content)) {
    errors.push("SVG contains <iframe> elements (not allowed)");
  }

  // Check for external stylesheet references
  if (/<?xml-stylesheet/i.test(content)) {
    errors.push("SVG references an external stylesheet (not allowed)");
  }

  // Check for external font references
  if (/@font-face/i.test(content)) {
    errors.push("SVG contains @font-face declarations (not allowed)");
  }

  // Check for foreignObject (can hide HTML/embedded content)
  // We flag it as a warning since some legitimate SVGs use it
  if (/<foreignObject[\s>]/i.test(content)) {
    errors.push("SVG contains <foreignObject> — ensure it does not embed HTML or raster content");
  }

  return errors;
}
