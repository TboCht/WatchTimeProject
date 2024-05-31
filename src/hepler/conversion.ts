export const convertSecondsToHoursMinutes = (seconds: number) => {
  const hours = Math.floor(seconds / 3600); // Calculate total hours
  const minutes = Math.floor((seconds % 3600) / 60); // Calculate remaining minutes

  return { hours, minutes };
};
