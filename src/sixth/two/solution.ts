import * as fs from "fs";

// Direction up, right, down, left
const DIRECTIONS = [
  [-1, 0], // Up
  [0, 1],  // Right
  [1, 0],  // Down
  [0, -1], // Left
];

// Read and parse the input map from the file
const parseMap = (filename: string): string[][] => {
  const data = fs.readFileSync(filename, "utf-8");
  return data.split("\n").map(line => line.split(""));
};

/**
 * Find the initial position and direction of the guard
 * @param map
 */
const findGuard = (map: string[][]): { position: [number, number]; direction: number } => {
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      const cell = map[row][col];
      if (["^", ">", "v", "<"].includes(cell)) {
        const direction = ["^", ">", "v", "<"].indexOf(cell);
        return { position: [row, col], direction };
      }
    }
  }
  throw new Error('Guard not found on the map');
};

/**
 * Simulate the guard's patrol
 * @param map
 * @param obstruction
 */
const simulateWithObstruction = (map: string[][], obstruction: [number, number]): boolean => {
  const visited = new Set<string>();
  const { position, direction } = findGuard(map);
  let [row, col] = position;
  let dir = direction;

  map[obstruction[0]][obstruction[1]] = "#"; // Temporarily add obstruction

  visited.add(`${row},${col},${dir}`); // Track position and direction

  while (true) {
    const [dr, dc] = DIRECTIONS[dir];
    const nextRow = row + dr;
    const nextCol = col + dc;

    // Check if the guard is about to leave the map
    if (
      nextRow < 0 ||
      nextRow >= map.length ||
      nextCol < 0 ||
      nextCol >= map[0].length
    ) {
      map[obstruction[0]][obstruction[1]] = "."; // Reset obstruction
      return false;
    }

    // Check if the next position is an obstacle
    if (map[nextRow][nextCol] === "#") {
      dir = (dir + 1) % 4; // Turn right
    } else {
      // Move forward
      row = nextRow;
      col = nextCol;

      const state = `${row},${col},${dir}`;
      if (visited.has(state)) {
        map[obstruction[0]][obstruction[1]] = "."; // Reset obstruction
        return true; // Loop detected
      }
      visited.add(state);
    }
  }
};

// Find all valid positions for obstruction
const findObstructionPositions = (map: string[][]): { validPositions: [number, number][], count: number } => {
  const validPositions: [number, number][] = [];

  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      // Check if the position is empty
      if (map[row][col] === ".") {
        const clonedMap = map.map(r => [...r]);
        // Check if the position is valid
        if (simulateWithObstruction(clonedMap, [row, col])) {
          validPositions.push([row, col]);
        }
      }
    }
  }

  return { validPositions, count: validPositions.length };
};

const map = parseMap("./src/sixth/data.txt");
export const { validPositions, count } = findObstructionPositions(map);
// console.log("Valid positions:", validPositions);
