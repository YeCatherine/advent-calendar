import * as fs from "fs";

// Direction vectors for [up, right, down, left]
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

// Find the initial position and direction of the guard
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
  throw new Error("Guard not found on the map");
};

// Simulate the guard's patrol
const simulatePatrol = (map: string[][]): number => {
  const visited = new Set<string>();
  const { position, direction } = findGuard(map);
  let [row, col] = position;
  let dir = direction;

  visited.add(`${row},${col}`);

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
      break;
    }

    // Check if the next position is an obstacle
    if (map[nextRow][nextCol] === "#") {
      // Turn right
      dir = (dir + 1) % 4;
    } else {
      // Move forward
      row = nextRow;
      col = nextCol;
      visited.add(`${row},${col}`);
    }
  }

  return visited.size;
};

const map = parseMap("./src/sixth/data.txt");
export const result = simulatePatrol(map);
