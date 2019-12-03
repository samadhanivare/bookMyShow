import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  username = ''
  
  constructor(private router: Router) {
    this.username = localStorage['username']
    
  }



  onLogout() {
    localStorage.removeItem('login_status')
    this.router.navigate(['/'])
  }

}
