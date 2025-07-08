import axios from "axios";
import { apiBasePath } from "../constants/paths";
import type { Movie } from "../types/movie";

const api = axios.create({
  baseURL: apiBasePath,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
});

export async function fetchMovies(query: string): Promise<Movie[]> {
  const response = await api.get<{ results: Movie[] }>("movie", {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page: 1,
    },
  });

  return response.data.results;
}
