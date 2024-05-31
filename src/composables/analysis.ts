import { GroupedDataByProfile, AnalyzedUserData } from "../types/types";
import { calculateTotalDurations } from "./durationsCalc";
import { setShowId } from "./mostWtached";

import dayjs from "dayjs";
import minMax from "dayjs/plugin/minMax";
import durationPlugin from "dayjs/plugin/duration";

dayjs.extend(minMax);
dayjs.extend(durationPlugin);

export const analyzeData = async (data: GroupedDataByProfile[]) => {
  // Create an initial map of analyzedUserData objects
  const userDataMap: { [key: string]: AnalyzedUserData } = {};

  // Initialize userDataMap
  data.forEach((profile) => {
    userDataMap[profile.profileName] = {
      userName: profile.profileName,
      totalWatchTime: { days: 0, hours: 0, minutes: 0, seconds: 0 },
      mostWatched: {
        episode: { id: 0, title: "", watchTime: 0 },
        tv_show: { id: 0, title: "", watchTime: 0 },
        movie: { id: 0, title: "", watchTime: 0 },
      },
      user_since: { years: 0, days: 0 },
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

  // Track watch times
  const trackWatchTimes = async (profile: GroupedDataByProfile) => {
    const structureData = await setShowId(profile.data);
    const user = userDataMap[profile.profileName];

    // Calculate total watch time for TV shows and episodes
    structureData.tvShows.forEach((show) => {
      let showWatchTime = 0;

      show.seasons.forEach((season) => {
        season.episodes.forEach((episode) => {
          showWatchTime += episode.watchTime;

          if (episode.watchTime > user.mostWatched.episode.watchTime) {
            user.mostWatched.episode = {
              id: episode.id,
              title: `${show.title} - ${season.name} - ${episode.name}`,
              watchTime: episode.watchTime,
            };
          }
        });
      });

      if (showWatchTime > user.mostWatched.tv_show.watchTime) {
        user.mostWatched.tv_show = {
          id: show.id,
          title: show.title,
          watchTime: showWatchTime,
        };
      }
    });

    // Calculate total watch time for movies
    structureData.movies.forEach((movie) => {
      if (movie.total_watchTime > user.mostWatched.movie.watchTime) {
        user.mostWatched.movie = {
          id: movie.id,
          title: movie.title,
          watchTime: movie.total_watchTime,
        };
      }
    });
    const { years, days } = calculateUserSince(profile);
    userDataMap[profile.profileName].user_since = { years, days };
  };

  // Process each user's data
  for (const user of data) {
    await trackWatchTimes(user);
  }
  // Convert userDataMap back to an array
  const userData = Object.values(userDataMap);

  console.log("userData", userData);

  return userData;
};

// Helper function to calculate the earliest and latest start times
const calculateUserSince = (profile: GroupedDataByProfile) => {
  const parseDate = (dateString: string) => {
    let date = dayjs(dateString, "DD/MM/YYYY HH:mm", true);
    if (!date.isValid()) {
      date = dayjs(dateString, "MM/DD/YYYY HH:mm", true);
    }
    return date;
  };

  // Parse all start times and find the earliest
  const times = profile.data.map((item) => parseDate(item["Start Time"]));
  const earliest = dayjs.min(times);
  const today = dayjs(); // Today's date
  const duration = dayjs.duration(today.diff(earliest));

  const years = Math.floor(duration.asYears());
  const days = Math.floor(duration.asDays() % 365); // Get the remaining days after accounting for full years
  return { years, days };
};
