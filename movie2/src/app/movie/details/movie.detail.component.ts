import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie.detail.component.html',
  styleUrls: ['./movie.detail.component.css']
})

export class MovieDetailsComponent implements OnInit {
  movie: any

  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute) {

    const movie_id = activatedRoute.snapshot.queryParams['movie_id']
    if (movie_id) {
      this.movieService
        .getMovieDetails(movie_id)
        .subscribe(response => {
          if (response['status'] == 'success') {
            this.movie = response['data']
          }
        })
    }
  }

  ngOnInit() { }
}
