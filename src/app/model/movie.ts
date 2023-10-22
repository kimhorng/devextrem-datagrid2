export interface IMovie {
  title: string;
  poster_path: string;
  release_date: string;
  vote_count: number;
  vote_average: number;
  popularity: number;
  id: number;
  overview: string;
  original_language: string;
}
export interface IMovieResponse {
  page: number;
  total_page: number;
  total_results: number;
  results: Array<IMovie>;
}
