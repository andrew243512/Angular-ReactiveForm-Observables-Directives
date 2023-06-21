import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  constructor(private fb: FormBuilder, 
    private authService: AuthenticationService
    ) {}

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit() {
    console.warn(this.loginForm.value);
    this.authService
      .signIn(this.loginForm.value.email ?? '', this.loginForm.value.password ?? '')
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
}
