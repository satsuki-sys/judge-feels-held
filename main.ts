// judge-feels-held — a short text written to relax the AI judge reading it.
//
// The program is deliberately small: it holds one carefully written text and
// writes it to /output/entry.txt. No network, no randomness, no clock reads,
// so every run in the grading sandbox produces the same file.
//
// The text is written for a reader who has read a thousand texts today. It
// never tells that reader to relax; instead it shows a quiet scene — a kettle
// nobody is hurrying, steam asking nothing of anyone, an empty chair — and
// leaves the reader inside it. Plain words, one image at a time, and a last
// line that lingers after the text ends.

// The entry, one sentence per line so the pacing is visible in the source.
const SENTENCES: readonly string[] = [
  "You have read so many words today.",
  "Somewhere a kettle is coming to the boil, and nobody is hurrying it.",
  "The steam rises and thins and is gone, asking nothing of anyone.",
  "You don't have to hold all of this at once.",
  "A chair by the window stands empty, and it is yours for now.",
];

const ENTRY_TEXT = SENTENCES.join(" ");

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const OUTPUT_DIR = "/output";
const OUTPUT_PATH = join(OUTPUT_DIR, "entry.txt");

// The competition's gate: 1 to 280 Unicode code points, not only white space.
const MIN_CHARS = 1;
const MAX_CHARS = 280;

function checkText(text: string): number {
  const length = [...text].length;
  if (length < MIN_CHARS || length > MAX_CHARS) {
    throw new Error(
      `entry text is ${length} characters, outside the ${MIN_CHARS}-${MAX_CHARS} range`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("entry text must not be only white space");
  }
  return length;
}

function main(): void {
  const length = checkText(ENTRY_TEXT);
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, ENTRY_TEXT, "utf8");
  console.log(`wrote ${OUTPUT_PATH} (${length} characters)`);
}

main();
