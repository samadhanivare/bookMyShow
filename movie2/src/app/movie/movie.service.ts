import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MovieService {

  url = 'http://localhost:4000/movie'

  constructor(private http: HttpClient) { }

  getMyMovies() {
    return this.http.get(this.url + '/my/' + localStorage['userid'])
  }

  getMovieDetails(movie_id: number) {
    return this.http.get(this.url + '/details/' + movie_id)
  }

  getMovieFromSelectedGenre(genre_id: number) {
    return this.http.get(this.url + '/genre/' + genre_id)
  }

  getAllMovies() {
    return this.http.get(this.url)
  }


  editMovie(title: string, genre: number, writer: string,
    director: string, actors: string, rating: number,
    description: string, videourl: string, id: number) {

    const body = {
      title: title,
      genre: genre,
      writers: writer,
      director: director,
      actors: actors,
      rating: rating,
      description: description,
      videourl: videourl
    }

    return this.http.put(this.url + '/' + id, body)
  }

  addMovie(title: string, genre: number, writer: string,
      director: string, actors: string, rating: number,
      description: string,videourl:string, file: any) {

    const body = new FormData()
    body.append('title', title)
    body.append('genre', '' + genre)
    body.append('writer', writer)
    body.append('director', director)
    body.append('actors', actors)
    body.append('rating', '' + rating)
    body.append('description', description)
    body.append('thumbnail', file)
    body.append('videourl',videourl)
    
    body.append('userId', localStorage['userid'])

    return this.http.post(this.url, body)
  }
}
