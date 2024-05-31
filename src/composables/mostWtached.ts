import { FileParsedData } from "../types/types";
import { parseDuration } from "./durationsCalc";
import { isTVShow, splitTitle } from "./parseTitleBis";

export interface MovieType {
  id: number;
  title: string;
  total_watchTime: number;
}

export interface TvShowType {
  id: number;
  title: string;
  seasons: SeasonType[];
}

export interface SeasonType {
  id: number;
  name: string;
  episodes: EpisodeType[];
}

export interface EpisodeType {
  id: number;
  name: string;
  watchTime: number;
}

let idCounter = 1;

const getOrCreateId = (map: Map<string, number>, key: string): number => {
  if (!map.has(key)) {
    map.set(key, idCounter++);
  }
  return map.get(key)!;
};

const addEpisode = (
  show: TvShowType,
  seasonName: string,
  episodeName: string,
  watchTime: number,
  seasonIdMap: Map<string, number>,
  episodeIdMap: Map<string, number>
) => {
  const seasonId = getOrCreateId(seasonIdMap, `${show.title}-${seasonName}`);
  let season = show.seasons.find((s) => s.id === seasonId);
  if (!season) {
    season = { id: seasonId, name: seasonName, episodes: [] };
    show.seasons.push(season);
  }

  const episodeId = getOrCreateId(
    episodeIdMap,
    `${show.title}-${seasonName}-${episodeName}`
  );
  const episode = { id: episodeId, name: episodeName, watchTime };
  season.episodes.push(episode);
};

export const setShowId = async (
  data: FileParsedData[]
): Promise<{ movies: MovieType[]; tvShows: TvShowType[] }> => {
  const titleIdMap = new Map<string, number>();
  const movieMap = new Map<string, MovieType>();
  const tvShowMap = new Map<string, TvShowType>();
  const seasonIdMap = new Map<string, number>();
  const episodeIdMap = new Map<string, number>();

  for (const item of data) {
    const watchTime = parseDuration(item.Duration);
    const title = item.Title.trim();

    if (isTVShow(title)) {
      const [showTitle, seasonName, episodeName] = await splitTitle(title);

      const showId = getOrCreateId(titleIdMap, showTitle);
      let show = tvShowMap.get(showTitle);
      if (!show) {
        show = { id: showId, title: showTitle, seasons: [] };
        tvShowMap.set(showTitle, show);
      }

      addEpisode(
        show,
        seasonName,
        episodeName,
        watchTime,
        seasonIdMap,
        episodeIdMap
      );
    } else {
      const movieId = getOrCreateId(titleIdMap, title);
      let movie = movieMap.get(title);
      if (!movie) {
        movie = { id: movieId, title, total_watchTime: 0 };
        movieMap.set(title, movie);
      }
      movie.total_watchTime += watchTime;
    }
  }

  return {
    movies: Array.from(movieMap.values()),
    tvShows: Array.from(tvShowMap.values()),
  };
};
