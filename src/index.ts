import { calculateTotalDistance } from "./first-task";
import { countSafeReports } from "./second/solution";
import { data as secondData } from "./second/data";

// First task
const leftList = [3, 4, 2, 1, 3, 3];
const rightList = [4, 3, 5, 3, 9, 3];

const result = calculateTotalDistance(leftList, rightList);
console.log(`The total distance between the lists is: ${result}`);

// Answer 2
console.log(`Answer 2 | The number of safe reports is: ${countSafeReports(secondData)}`);
