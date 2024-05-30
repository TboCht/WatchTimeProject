import { GroupedDataByProfile, analyzedUserData } from "../types/types";
import { calculateTotalDurations } from "./durationsCalc";

export const analyzeData = async (data: GroupedDataByProfile[]) => {
  // Create an initial map of analyzedUserData objects
  const userDataMap: { [key: string]: analyzedUserData } = {};

  // Initialize userDataMap
  data.forEach((profile) => {
    userDataMap[profile.profileName] = {
      userName: profile.profileName,
      totalWatchTime: { days: 0, hours: 0, minutes: 0, seconds: 0 },
      // Initialize other metrics here
    };
  });

  // ====================================================================== Calculations

  //  durations
  const totalDurations = await calculateTotalDurations(data);
  // Update userDataMap with calculated total durations
  totalDurations.forEach((duration) => {
    if (userDataMap[duration.userName]) {
      userDataMap[duration.userName].totalWatchTime = duration.totalWatchTime;
      // Update other metrics here
    }
  });

  // Convert userDataMap back to an array
  const userData = Object.values(userDataMap);

  return userData;
};
