import { calculateTotalDistance } from './first-task';

const leftList = [3, 4, 2, 1, 3, 3];
const rightList = [4, 3, 5, 3, 9, 3];

const result = calculateTotalDistance(leftList, rightList);
console.log(`The total distance between the lists is: ${result}`);
