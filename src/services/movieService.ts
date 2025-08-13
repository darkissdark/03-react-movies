import axios from "axios";
import { apiBasePath } from "../constants/paths";
import type { Movie } from "../types/movie";

const api = axios.create({
  baseURL: apiBasePath,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
});

interface MovieSearchResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

export async function fetchMovies(query: string): Promise<MovieSearchResponse> {
  const response = await api.get<MovieSearchResponse>("movie", {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page: 1,
    },
  });

  return response.data;
}
