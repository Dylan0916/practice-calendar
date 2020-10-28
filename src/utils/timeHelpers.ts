export function getTime(targetDate: Date) {
  const milliseconds = targetDate.getTime();
  const diff = 1000 * 60 * 60 * 24 * targetDate.getDay();
  const sixDay = 1000 * 60 * 60 * 24 * 6;
  const startTime = new Date(milliseconds - diff);
  const endTime = new Date(startTime.getTime() + sixDay);

  return { startTime, endTime };
}
