import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
//import * as toastr from 'toastr'
import { GenreService } from '../../genre/genre.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-add',
  templateUrl: './movie.add.component.html',
  styleUrls: ['./movie.add.component.css']
})

export class MovieAddComponent implements OnInit {

  service: MovieService

  genres = []

  title = ''
  genre : number
  writer = ''
  director = ''
  actors = ''
  rating = 0
  description = '' 
  thumbnail: any
  videourl = ''

  constructor(
    private router: Router,
    private genreService: GenreService,
    private movieService: MovieService) {

    this.genreService
      .getGenres()
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.genres = response['data']
          this.genre = this.genres[0].id
        } else {
          console.log(response['error'])
        }
      })
  }

  ngOnInit() { }

  onSelectFile(event) {
    this.thumbnail = event.target.files[0]
  }

  onAdd() {
    this.movieService
      .addMovie(this.title, this.genre, this.writer, this.director, this.actors, this.rating, this.description,this.videourl, this.thumbnail)
      .subscribe(response => {
        if(response['status'] == 'success') 
        {
            console.log('added movie successfully')
          //toastr.success('added movie successfully')
          this.router.navigate(['/movies-list'])
        } else {
          console.log(response['error'])
        }
      })
  }
}
