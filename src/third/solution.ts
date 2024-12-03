import * as fs from "fs";

/**
 * Extract valid `mul(X,Y)` instructions from corrupted data and calculate their sum.
 * @param filePath - Path to the file containing the corrupted data.
 * @returns The sum of all valid multiplication results.
 */
export function processMalformedData (filePath: string): number {
  // Read the data as a plain text string
  const data = fs.readFileSync(filePath, "utf8");

  // Regular expression to match valid `mul(X,Y)` instructions
  const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;

  // Initialize the total sum
  let sum = 0;
  let match: RegExpExecArray | null;

  // Process all matches
  while ((match = regex.exec(data)) !== null) {
    // Extract and parse the numbers
    const x = parseInt(match[1], 10);
    const y = parseInt(match[2], 10);

    // Add the multiplication result to the total sum
    sum += x * y;
  }

  return sum;
}

// Check with the example data
const filePath = "./src/third/exampleData.txt";
console.log("Expect 161, got -- ", processMalformedData(filePath));
