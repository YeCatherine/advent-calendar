import * as fs from "fs";

function readFile (name: string): string {
  return fs.readFileSync(name, "utf-8");
}

/**
 * Format the content of the file.
 * @param content
 */
function formatContent (content: string): string[][] {
  // Split the content into lines
  const lines = content.split(/\r?\n/);
  const newlines: string[][] = [];
  for (const line of lines) {
    newlines.push(line.split(""));
  }

  return newlines;
}

/**
 * Scan for XMAS in all directions.
 * @param formattedContent
 * @param x
 * @param y
 */
function scanForXmas (formattedContent: string[][], x: number, y: number): number {
  const directions = [
    { dx: 1, dy: 1 },   // Down and right
    { dx: 0, dy: 1 },   // Down
    { dx: -1, dy: 1 },  // Down and left
    { dx: -1, dy: 0 },  // Left
    { dx: -1, dy: -1 }, // Up and left
    { dx: 0, dy: -1 },  // Up
    { dx: 1, dy: -1 },  // Up and right
    { dx: 1, dy: 0 },   // Right
  ];

  let count = 0;
  for (const { dx, dy } of directions) {
    if (scanInDirection(formattedContent, x, y, dx, dy)) {
      count += 1;
    }
  }

  return count;
}

/**
 * Scan in a specific direction.
 */
function scanInDirection (
  formattedContent: string[][],
  startX: number,
  startY: number,
  dx: number,
  dy: number
): boolean {
  const rows = formattedContent.length;
  const cols = formattedContent[0].length;
  const word = ["X", "M", "A", "S"];

  // Check if the word fits in the grid
  for (let i = 0; i < word.length; i++) {
    const nx = startX + dx * i;
    const ny = startY + dy * i;

    // Check out of bounds
    if (nx < 0 || nx >= rows || ny < 0 || ny >= cols) {
      return false;
    }

    // Check if the character matches
    if (formattedContent[nx][ny] !== word[i]) {
      return false;
    }
  }

  return true;
}

// Main execution
const content = readFile("./src/fourth/data.txt");
const formattedContent = formatContent(content);

export const totalXmas = formattedContent.reduce((totalCount, row, x) =>
  totalCount + row.reduce((count, cell, y) =>
    count + (cell === "X" ? scanForXmas(formattedContent, x, y) : 0), 0), 0);
