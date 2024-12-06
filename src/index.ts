import { calculateTotalDistance } from "./first-task";
import { countSafeReports } from "./second/solution";
import { processMalformedData } from "./third/solution";
import { data as secondData } from "./second/data";
import { totalXmas } from "./fourth/solution";
import { example, result as fifthResult } from "./fifth/solution";

// First task
const leftList = [3, 4, 2, 1, 3, 3];
const rightList = [4, 3, 5, 3, 9, 3];

const result = calculateTotalDistance(leftList, rightList);
console.log(`The total distance between the lists is: ${result}`);

// Answer 2
console.log(`Answer 2 | The number of safe reports is: ${countSafeReports(secondData)}`);

// Answer 3
const filePath = "./src/third/data.txt";
console.log(`Answer 3 | The result of multiplication is: ${processMalformedData(filePath)}`);

// Answer 4
console.log(`Answer 4 | The total XMAS found is: ${totalXmas}`);

// Answer 5
console.log(`The sum of middle pages is: ${example}`);
console.log(`The sum of middle pages is: ${fifthResult}`);
