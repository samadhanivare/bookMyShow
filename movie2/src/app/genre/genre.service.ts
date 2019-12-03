import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GenreService {

  url = 'http://localhost:4000/genre'

  constructor(private http: HttpClient) { }

  getGenres() {
    return this.http.get(this.url)
  }
}