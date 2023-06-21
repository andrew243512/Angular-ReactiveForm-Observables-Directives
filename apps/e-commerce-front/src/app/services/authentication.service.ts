import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    public afAuth: AngularFireAuth, // Inject Firebase auth service
  ) {}

  /*
   * Sign up with email/password
   * @param email
   * @param password
   * @returns
   **/
  signUpClient(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        window.alert('You have been successfully registered!');
        console.log(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  /**
   * Sign in with email/password
   * @param email
   * @param password
   * @returns
   */
  signIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log('OK', result);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
}
