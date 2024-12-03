/**
 * Count the number of safe reports.
 * @param reports - A list of reports where each report is a list of numbers.
 */
export function countSafeReports (reports: number[][]): number {
  const isSafe = (report: number[]): boolean => {
    if (report.length < 2) return false;

    let increasing = true;
    let decreasing = true;

    for (let i = 1; i < report.length; i++) {
      const diff = report[i] - report[i - 1];

      // If difference is not in range [1, 3], the report is unsafe
      if (Math.abs(diff) < 1 || Math.abs(diff) > 3) return false;

      // Track trends
      if (diff > 0) decreasing = false; // Not decreasing
      if (diff < 0) increasing = false; // Not increasing
    }

    // Safe if strictly increasing or strictly decreasing
    return increasing || decreasing;
  };

  // Count the number of safe reports
  return reports.reduce((count, report) => count + (isSafe(report) ? 1 : 0), 0);
}

// Example usage
const exampleReports = [
  [7, 6, 4, 2, 1], // Safe
  [1, 2, 7, 8, 9], // Unsafe
  [9, 7, 6, 2, 1], // Unsafe
  [1, 3, 2, 4, 5], // Unsafe
  [8, 6, 4, 4, 1], // Unsafe
  [1, 3, 6, 7, 9]  // Safe
];

console.log("Expected: 2, Actual:", countSafeReports(exampleReports));