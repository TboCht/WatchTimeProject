import {
  GroupedDataByProfile,
  analyzedUserData,
  watchTime,
} from "../types/types";

// Function to parse duration string to seconds
export const parseDuration = (duration: string): number => {
  if (!duration) {
    return 0;
  }

  const parts = duration.split(":").map(Number);
  if (parts.length !== 3) {
    console.warn(`Invalid duration format: ${duration}`);
    return 0;
  }

  const seconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
  return seconds;
};

export const formatDurationToWatchTime = (timeInSeconds: number): watchTime => {
  const days = Math.floor(timeInSeconds / (3600 * 24));
  const hours = Math.floor((timeInSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  return {
    days,
    hours,
    minutes,
    seconds,
  };
};

// Function to calculate total durations
export const calculateTotalDurations = async (
  groupedData: GroupedDataByProfile[]
): Promise<analyzedUserData[]> => {
  return groupedData.map((profileGroup) => {
    const totalSeconds = profileGroup.data.reduce((total, item) => {
      return total + parseDuration(item.Duration);
    }, 0);

    return {
      userName: profileGroup.profileName,
      totalWatchTime: formatDurationToWatchTime(totalSeconds),
    };
  });
};
