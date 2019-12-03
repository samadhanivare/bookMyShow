import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//import * as toastr from 'toastr'

@Component({
    selector: 'app-user-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'] 
})

export class UserLoginComponent implements OnInit 
{
    email = ''
    password = ''
    componentToLaunch = 'movies-add'
    rememberme = false

    
    constructor(
        private activatedRoute:ActivatedRoute,
        private router:Router,
        private userService: UserService) {

            console.log(activatedRoute.snapshot.params)
            this.componentToLaunch = activatedRoute.snapshot.queryParams['screen']
        }

    ngOnInit() { }

    onLogin() 
    {
        console.log(this.email, this.password);
        if (this.email.length ==  0)
        {
            alert('Enter valid email')
        }
        else if (this.password.length ==  0)
        {
            alert('Enter valid password')
        }
        else
        {
            this.userService
                .login(this.email,this.password)
                    .subscribe((response)=>
                    {
                        
                        if(response['status'] == 'success')
                        {
                            if(this.rememberme){
                                alert('Login Successfully')
                            localStorage['login_status'] = '1'
                            }

                            localStorage['username'] = response['data']['username']

                            if(this.componentToLaunch && this.componentToLaunch.length > 0){
                                this.router.navigate(['/' + this.componentToLaunch])
                            }else{
                                this.router.navigate(['/movies-add'])
                            }
                        } 
                        else
                        {
                            alert('Error while Login')
                        }
                    })
        }
    }
}

