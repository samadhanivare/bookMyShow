import { MovieEditComponent } from './movie/edit/edit.movie.component';
import { MyMoviesComponent } from './movie/my-movies/my.movies.component';
import { MovieDetailsComponent } from './movie/details/movie.detail.component';
import { GenreService } from './genre/genre.service';
import { HomeComponent } from './home/home.component';
import { MovieService } from './movie/movie.service';
import { MovieAddComponent } from './movie/add/movie.add.component';
import { MovieListComponent } from './movie/list/movie.list.component';
import { FormsModule } from '@angular/forms';
import { UserService } from './user/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserLoginComponent } from './user/login/login.component';

import { HttpClientModule } from '@angular/common/http';
import { UserRegisterComponent } from './user/register/register.component';
import { RouterModule, Route } from '@angular/router'
import { RatingComponent } from './rating/rating.component';

const routes: Route[] = [
  //{ path: '', redirectTo: '/user-login', pathMatch: 'full' },
  { path: '', component:HomeComponent},
  { path: '', component: UserLoginComponent },

  { path: 'user-login', component: UserLoginComponent },
  { path: 'user-register', component: UserRegisterComponent },

  { path: 'movies-list',component:MovieListComponent },
  { path: 'movies-details', component: MovieDetailsComponent},
  
  { path: 'movies-my', component: MyMoviesComponent, canActivate: [UserService]},
  { path: 'movies-add',component:MovieAddComponent, canActivate: [UserService]},
  { path: 'movies-edit/:movie_id', component: MovieEditComponent, canActivate:[UserService]},
  
  //{ path: '**', component: NotFoundErrorComponent }

  
]

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserRegisterComponent,

    MovieListComponent,
    MovieAddComponent,
    MovieDetailsComponent,
    MovieEditComponent,
    MyMoviesComponent,
    
    HomeComponent,

    RatingComponent
    
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
   UserService,
   MovieService,
   GenreService
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
