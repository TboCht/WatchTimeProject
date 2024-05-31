export interface FileParsedData {
  Attributes: string;
  Bookmark: string;
  Country: string;
  "Device Type": string;
  Duration: string;
  "Latest Bookmark": string;
  "Profile Name": string;
  "Start Time": string;
  "Supplemental Video Type": string;
  Title: string;
}

export interface GroupedDataByProfile {
  profileName: string;
  data: FileParsedData[];
}

export interface AnalyzedUserData {
  userName: string;
  totalWatchTime: watchTime;
  mostWatched: AnalyzedMostWatched;
  user_since: { years: number; days: number };
}

export interface AnalyzedMostWatched {
  tv_show: { id: number; title: string; watchTime: number };
  episode: { id: number; title: string; watchTime: number };
  movie: { id: number; title: string; watchTime: number };
}

export interface watchTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
