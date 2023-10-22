import { Injectable } from '@angular/core';
import { environment } from 'src/environment/envronment';
import { HttpClient } from '@angular/common/http';
import { IMovie, IMovieResponse } from 'src/app/model/movie';
import { Observable, ObservableInput, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private _apiMovieUrl = environment.apiUrl;
  private _apiKey = environment.apiKey;
  constructor(private _http: HttpClient) {}
  // getMovies(param?: string): Observable<IMovie> {
  //   return this._http
  //     .get<IMovie>(`${this._apiMovieUrl}/${param}?${this._apiKey}`)
  //     .pipe(catchError(this.handleError('getMovies', [])));
  // }

  /** GET heroes from the server */
  getMovies(param?: string): Observable<IMovieResponse> {
    return this._http.get<IMovieResponse>(
      `${this._apiMovieUrl}/${param}?${this._apiKey}`
    );
    // .pipe(catchError(this.handleError<IMovieResponse>('getHeroes')));
  }

  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //     // TODO: send the error to remote logging infrastructure
  //     console.error(error); // log to console instead

  //     // TODO: better job of transforming error for user consumption
  //     console.log(`${operation} failed: ${error.message}`);

  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);
  //   };
  // }
}
