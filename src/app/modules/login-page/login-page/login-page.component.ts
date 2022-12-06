import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ControllerService,
  UserViewDTO,
} from 'src/app/typescript-angular-client';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  emailPattern: any =
    /\b(?:(?![_.-])(?!.*[_.-]{2})[a-z0-9_.-]+(?<![_.-]))@(?:(?!-)(?!.*--)[a-z0-9-]+(?<!-)\.)*edu\.tr\b/i;
  constructor(
    private router: Router,
    private unimeetService: ControllerService
  ) {}
  users: UserViewDTO[] = [];
  emailValue: string = '';
  passwordValue: string = '';
  userId: number = 0;
  isLoggedIn: boolean = false;
  ngOnInit(): void {
    this.unimeetService.getUsersUsingGET().subscribe((data) => {
      this.users = data;
      console.log(this.users);
    });
  }
  login(): void {
    for (let user of this.users) {
      if(user.email === this.emailValue && user.password === this.passwordValue){
        this.userId = 5;  //change when access id from userViewDto;
        this.isLoggedIn = true
        this.router.navigateByUrl('/mainPage');
        break;
      }else{
        this.isLoggedIn = false
      }
    }
    if(this.isLoggedIn==false){
      notify({
        message: `Email or password is incorrect`,
        height: 45,
        width: 300,
        minWidth: 0,
        type: 'error',
        displayTime: 5000,
        animation: {
          show: {
            type: 'fade', duration: 400, from: 0, to: 1,
          },
          hide: { type: 'fade', duration: 40, to: 0 },
        },
      },
      {position: 'top center', direction:'up-push' });
    }
  }
  signUp() {
    this.router.navigateByUrl('/sign-up');
  }
}


