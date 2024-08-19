import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ganttChartDataGenerator = (n: number, durationInDays: number) => {
  const data = [];
  const startDate = new Date();
  const endDate = new Date(
    startDate.getTime() + durationInDays * 24 * 60 * 60 * 1000
  );

  const getRandomDate = (start: Date, end: Date) => {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  };

  const getRandomDuration = (minDays: number, maxDays: number) => {
    return Math.floor(Math.random() * (maxDays - minDays + 1) + minDays);
  };

  // Generate tasks
  for (let i = 0; i < n; i++) {
    const taskDuration = getRandomDuration(
      1,
      Math.max(2, Math.floor(durationInDays / 10))
    ); // Ensure some short tasks
    let start = getRandomDate(
      startDate,
      new Date(endDate.getTime() - taskDuration * 24 * 60 * 60 * 1000)
    );
    let end = new Date(start.getTime() + taskDuration * 24 * 60 * 60 * 1000);

    // Ensure some tasks overlap
    if (i > 0 && Math.random() < 0.4) {
      const prevTask = data[data.length - 1];
      start = getRandomDate(
        new Date(prevTask.start_date),
        new Date(prevTask.end_date)
      );
      end = new Date(start.getTime() + taskDuration * 24 * 60 * 60 * 1000);

      // Adjust end date if it exceeds the project end date
      if (end > endDate) {
        end = endDate;
      }
    }

    data.push({
      id: i + 1,
      item: `Task ${i + 1}`,
      start_date: start.toISOString(),
      end_date: end.toISOString(),
    });
  }

  // sort
  data.sort((a, b) => new Date(a.start_date).valueOf() - new Date(b.start_date).valueOf());

  return data;
};
