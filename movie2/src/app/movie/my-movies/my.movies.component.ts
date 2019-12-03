import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './my.movies.component.html',
  styleUrls: ['./my.movies.component.css']
})

export class MyMoviesComponent implements OnInit {
  selectedGenre = -1
  movies = []

  constructor(
    private router: Router,
    private movieService: MovieService) {

    this.getAllMovies()
  }

  getAllMovies() {
    this.movieService
      .getMyMovies()
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.movies = response['data']
        } else {
          console.log(response['error'])
        }
      })
  }

  ngOnInit() { }

  onMovieSelect(id: number) {
    this.router.navigate(['/movies-details'], { queryParams: { id: id } })
  }
}
