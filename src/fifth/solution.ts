import * as fs from "fs";

type Rule = [number, number];
type Update = number[];

/**
 * Parse the content of the file.
 * @param content
 */
function parseInput(content: string): { rules: Rule[]; updates: Update[] } {
  const [ruleSection, updateSection] = content.trim().split("\n\n");

  const rules = ruleSection
    .split("\n")
    .map((line) => line.split("|").map(Number) as Rule);

  const updates = updateSection
    .split("\n")
    .map((line) => line.split(",").map(Number) as Update);

  return { rules, updates };
}

// Check if an update is in the correct order
function isCorrectOrder(update: Update, rules: Rule[]): boolean {
  // Create an adjacency list and in-degree map for the graph
  const adjacencyList = new Map<number, number[]>();
  const inDegree = new Map<number, number>();

  // Initialize the graph for pages in the update
  for (const page of update) {
    adjacencyList.set(page, []);
    inDegree.set(page, 0);
  }

  // Add edges for applicable rules
  for (const [pageX, pageY] of rules) {
    // Check if the rule is applicable to the update
    if (update.includes(pageX) && update.includes(pageY)) {
      adjacencyList.get(pageX)!.push(pageY);
      inDegree.set(pageY, (inDegree.get(pageY) || 0) + 1);
    }
  }

  // Perform topological sorting using Kahn's Algorithm
  const zeroInDegreeQueue: number[] = [];
  for (const [page, degree] of inDegree.entries()) {
    if (degree === 0) zeroInDegreeQueue.push(page);
  }

  const sortedOrder: number[] = [];

  // Process the queue
  while (zeroInDegreeQueue.length > 0) {
    const current = zeroInDegreeQueue.shift()!;
    sortedOrder.push(current);

    for (const neighbor of adjacencyList.get(current)!) {
      inDegree.set(neighbor, inDegree.get(neighbor)! - 1);
      if (inDegree.get(neighbor) === 0) zeroInDegreeQueue.push(neighbor);
    }
  }

  // Check if the sorted order matches the update order
  return sortedOrder.length === update.length && sortedOrder.every((val, idx) => val === update[idx]);
}

// Calculate the middle page number of an update
function getMiddlePage(update: Update): number {
  const middleIndex = Math.floor(update.length / 2);
  return update[middleIndex];
}

// Main function to calculate the middle page sum
function calculateMiddlePageSum(filePath: string): number {
  // Read the file content
  const content = fs.readFileSync(filePath, "utf-8");
  const { rules, updates } = parseInput(content);

  let totalMiddlePageSum = 0;

  for (const update of updates) {
    if (isCorrectOrder(update, rules)) {
      const middlePage = getMiddlePage(update);
      // console.log(`Valid update: ${update.join(",")}, middle page: ${middlePage}`);
      totalMiddlePageSum += middlePage;
    } else {
      // console.log(`Invalid update: ${update.join(",")}`);
    }
  }

  return totalMiddlePageSum;
}

// Example
const path = "./src/fifth/exampleData.txt";
export const example = calculateMiddlePageSum(path);

// Main
const filePath = "./src/fifth/data.txt";
export const result = calculateMiddlePageSum(filePath);
