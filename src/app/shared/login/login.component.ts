import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { MessageService } from 'src/app/services/index.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private loginService:LoginService,
    private messageService:MessageService
    ) { }

  ngOnInit() {
  }

  login()
  {
    this.loginService.login().subscribe(
    data => {
      console.log(data);
    },
    error => {
      this.messageService.error('Login fails');
      // this.messageService.success('login fails 2');
      // this.messageService.info('login fails 3');
      // this.messageService.warn('login fails 4');
    });
  }

}
