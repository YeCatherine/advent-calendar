/**
 * Helper function to check if a report is safe.
 */
const isSafe = (report: number[]): boolean => {
  if (report.length < 2) return false;

  let increasing = true;
  let decreasing = true;

  for (let i = 1; i < report.length; i++) {
    const diff = report[i] - report[i - 1];

    if (Math.abs(diff) < 1 || Math.abs(diff) > 3) return false;

    if (diff > 0) decreasing = false;
    if (diff < 0) increasing = false;
  }

  return increasing || decreasing;
};

/**
 * 2.1
 * Count the number of safe reports without using a Problem Dampener.
 */
export function countSafeReports (reports: number[][]): number {
  return reports.reduce((count, report) => count + (isSafe(report) ? 1 : 0), 0);
}

/**
 * 2.2
 * Count the number of safe reports, including those made safe by removing one level.
 */
export function countSafeReportsWithDampener (reports: number[][]): number {
  const isSafeWithDampener = (report: number[]): boolean => {
    if (isSafe(report)) return true;

    return report.some((_, i) => isSafe([...report.slice(0, i), ...report.slice(i + 1)]));
  };

  return reports.reduce((count, report) => count + (isSafeWithDampener(report) ? 1 : 0), 0);
}
