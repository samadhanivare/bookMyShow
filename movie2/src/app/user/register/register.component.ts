import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-user-register ',
    templateUrl: './register.component.html',
    styleUrls:['./register.component.css']
})

export class UserRegisterComponent implements OnInit 
{
    username = ''
    email = ''
    password = ''

    service:UserService
    constructor(private userService: UserService) 
    {
        this.service = userService
    }

    ngOnInit() { }

    onregisterUser() 
    {
        console.log(this.username,this.email,this.password);
        if(this.username.length == 0)
        {
            alert('Enter valid User Name')
        }
        else if(this.email.length == 0)
        {
            alert('Enter valid Email')
        }
        else if(this.password.length == 0)
        {
            alert('Enter valid Password')
        }
        else
        {
            this.userService
            .registerUser(this.username,this.email,this.password)
                .subscribe((response)=>
                    {
                        console.log(response)
                        if(response['status'] == 'success')
                        {
                            alert('User Added Successfully')
                        } 
                        else 
                        {
                            alert('Error while Registration')
                        }
                    })
        }    
    }
}