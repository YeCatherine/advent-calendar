import { calculateTotalDistance } from "./first-task";
import { countSafeReports, countSafeReportsWithDampener } from "./second/solution";
import { processMalformedData } from "./third/solution";
import { data as secondData } from "./second/data";
import { totalXmas } from "./fourth/solution";
import { result as fifthResult } from "./fifth/solution";
import { result as sixthResult } from "./sixth/solution";
import { count } from "./sixth/two/solution";

// First task
const leftList = [3, 4, 2, 1, 3, 3];
const rightList = [4, 3, 5, 3, 9, 3];

const result = calculateTotalDistance(leftList, rightList);
console.log(`The total distance between the lists is: ${result}`);

// Answer 2
console.log(`Answer 2 | The number of safe reports is: ${countSafeReports(secondData)}`);
console.log("Answer 2.2 | number of safe reports:", countSafeReportsWithDampener(secondData));


// Answer 3
const filePath = "./src/third/data.txt";
console.log(`Answer 3 | The result of multiplication is: ${processMalformedData(filePath)}`);

// Answer 4
console.log(`Answer 4 | The total XMAS found is: ${totalXmas}`);

// Answer 5
console.log(`Answer 5 | The sum of middle pages is: ${fifthResult}`);

// Answer 6
console.log(`Answer 6.1 | The number of distinct positions visited is: ${sixthResult}`);

// Answer 6.2
console.log(`Answer 6.2 | The number of distinct positions is: ${count}` );

