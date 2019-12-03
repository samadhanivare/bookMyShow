import { GenreService } from './../../genre/genre.service';
//import { MovieService } from './../movie.service';
import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie.list.component.html',
  styleUrls: ['./movie.list.component.css']
})

export class MovieListComponent implements OnInit {
  selectedGenre = -1
  movies = []
  genres = [{movie_id:-1,title:"All"}]

  constructor( 
    private genreService: GenreService,
    private router: Router,
    private movieService: MovieService) {
      this.genreService
      .getGenres()
      .subscribe(response =>{
        if(response['status'] == 'success'){
          const tempGenres = response['data']


          for(let index = 0; index < tempGenres.length; index++){
            this.genres.push(tempGenres[index])
          }
        }
      })
  }

  getAllMovies(){
    this.movieService
      .getAllMovies()
      .subscribe(response => {
        if (response['status'] == 'success') {
          this.movies = response['data']
        } else {
          console.log(response['error'])
        }
      })
  }

  onChangeGenre(){
    //console.log(this.selectedGenre)
    if(this.selectedGenre == -1){
      this.getAllMovies()
    }else{
      this.movieService
    .getMovieFromSelectedGenre(this.selectedGenre)
    .subscribe(response => {
      if (response['status'] == 'success') {
        this.movies = response['data']
      } else {
        console.log(response['error'])
      }
    })
      
  }
    
  }

  ngOnInit() { }

  onMovieSelect(movie_id:number){
    this.router.navigate(['/movies-details'],{ queryParams:{movie_id:movie_id}})

  }
}
