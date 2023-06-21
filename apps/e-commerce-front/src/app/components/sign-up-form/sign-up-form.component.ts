import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IUserRecord } from '@e-commerce/shared';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
})
export class SignUpFormComponent {
  constructor(private fb: FormBuilder, private auth: AuthenticationService) {}

  signUpForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirm_password: ['', Validators.required],
    phone: [
      '',
      [Validators.required, Validators.minLength(10), Validators.maxLength(14), Validators.pattern('^[0-9]*$')],
    ],
  });

  onSubmit() {
    this.auth
      .signUpClient({
        name: this.signUpForm.value.name,
        email: this.signUpForm.value.email,
        password: this.signUpForm.value.password,
        phone: this.signUpForm.value.phone,
      } as IUserRecord)
      .then((result) => {
        console.log('OK', result);
        return result;
      })
      .catch((error: { message: any }) => {
        window.alert(error.message);
      });
  }
}
