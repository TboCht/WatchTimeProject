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

export interface analyzedUserData {
  userName: string;
  totalWatchTime: watchTime;
}

export interface watchTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
