import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
// import { error } from 'console';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  formLogin: FormGroup

  constructor(
    private userServices: UserService,
    private router: Router
  ) {
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })

   }

  ngOnInit() {}

  onSubmit(){
    this.userServices.login(this.formLogin.value)
    .then(response => {
      console.log(response);
      this.router.navigate(['/tabs']);

    })
    .catch(error => console.log(error));
  }

  onClick(){
    this.userServices.loginWithGoogle()
    .then(response => {
      console.log(response);
      this.router.navigate(['/tabs']);
    })
    .catch(error => console.log(error))
  }

  toRegister(){
    this.router.navigate(['/register']);

  }
}
