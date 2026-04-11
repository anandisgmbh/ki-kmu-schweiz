#!/usr/bin/env node
/**
 * Post-build patch: rewrite the Vercel function runtime from nodejs18.x → nodejs20.x.
 *
 * Why: @astrojs/vercel v7.8.2 only knows Node 14/16/18 as supported and falls back to
 * nodejs18.x for any newer local Node version. Vercel has deprecated nodejs18.x for
 * new deployments, so we have to override the generated .vc-config.json.
 *
 * Runs after `astro build` and rewrites every .vc-config.json under
 * .vercel/output/functions to use nodejs20.x.
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const FUNCTIONS_DIR = '.vercel/output/functions';
const TARGET_RUNTIME = 'nodejs20.x';

let patched = 0;

function walk(dir) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch (err) {
    if (err.code === 'ENOENT') return;
    throw err;
  }

  for (const entry of entries) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      walk(full);
    } else if (entry === '.vc-config.json') {
      const data = JSON.parse(readFileSync(full, 'utf-8'));
      if (data.runtime && data.runtime !== TARGET_RUNTIME) {
        const before = data.runtime;
        data.runtime = TARGET_RUNTIME;
        writeFileSync(full, JSON.stringify(data, null, '\t') + '\n');
        console.log(`[fix-vercel-runtime] ${full}: ${before} → ${TARGET_RUNTIME}`);
        patched++;
      }
    }
  }
}

walk(FUNCTIONS_DIR);

if (patched === 0) {
  console.log('[fix-vercel-runtime] no config files needed patching');
} else {
  console.log(`[fix-vercel-runtime] patched ${patched} config file(s)`);
}
