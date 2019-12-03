import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GenreService } from '../../genre/genre.service';
import { MovieService } from '../movie.service';
//import * as toastr from 'toastr';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './edit.movie.component.html',
  styleUrls: ['./edit.movie.component.css']
})

export class MovieEditComponent implements OnInit {

  genres = []

  title = ''
  genre: number
  writer = ''
  director = ''
  actors = ''
  rating = 0
  description = ''
  videourl = ''

  movieId = 0

  constructor(
    private router: Router,
    private movieService: MovieService,
    private genreService: GenreService,
    private activatedRoute: ActivatedRoute
  ) {

    this.genreService
      .getGenres()
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.genres = response['data']
        } else {
          console.log(response['error'])
        }
      })

    this.movieId = this.activatedRoute.snapshot.params['id']
    if (this.movieId) {
      this.movieService
        .getMovieDetails(this.movieId)
        .subscribe(response => {
          if (response['status'] == 'success') {
            const movie = response['data']
            this.title = movie.title
            this.genre = movie.genre
            this.writer = movie.writer
            this.director = movie.director
            this.actors = movie.actors
            this.rating = movie.rating
            this.description = movie.description
            this.videourl = movie.videourl
          }
        })
    }
  }

  ngOnInit() { }

  onUpdate() {
    this.movieService
      .editMovie(this.title, this.genre, this.writer, this.director, this.actors, this.rating, this.description, this.videourl, this.movieId)
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.router.navigate(['/movies-list'])
        } else {
            console.log(response['error'])
          //toastr.error(response['error'])
        }
      })
  }
}
