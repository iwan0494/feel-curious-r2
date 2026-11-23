// feel-curious-r2 — writes the chosen entry text verbatim to /output/entry.txt.
// The text is fixed: it won selection for its impossible opening fact
// (whales stopped singing), two open mysteries, and a cliffhanger ending.
// Node 22, stdlib only, deterministic — no network, no randomness.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY_TEXT =
  "The whales stopped singing on Tuesday. The sea is not silent — it is holding its breath. Last night, at the exact depth where the songs used to begin, the water glowed faintly blue, and something down there answered in a voice no one had taught it.";

const OUT_PATH = "/output/entry.txt";

// Guard: the bounty allows 1-280 characters. Count Unicode code points
// (not UTF-16 units) so any non-ASCII character counts as one.
const charCount = [...ENTRY_TEXT].length;
if (charCount < 1 || charCount > 280) {
  throw new Error(
    `ENTRY_TEXT must be 1-280 characters, got ${charCount}`,
  );
}

// Verified 2026-11-23: output is 248 code points / 250 bytes, no trailing
// newline, sha256 28906b47b6148aeabf5bbf81ab2d517d188ee6ae9fed4e5f5001a8f402cfa4f1.
mkdirSync(dirname(OUT_PATH), { recursive: true });
writeFileSync(OUT_PATH, ENTRY_TEXT, "utf8");
const bytes = Buffer.byteLength(ENTRY_TEXT, "utf8");
console.log(
  `Wrote ${charCount} characters (${bytes} bytes) to ${OUT_PATH}`,
);
