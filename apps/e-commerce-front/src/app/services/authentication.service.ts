import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { IUserRecord } from '@e-commerce/shared/dist/interfaces';
import { Apollo, gql } from 'apollo-angular';

const Sign_Up = gql
`mutation ($name: String, $email: String, $password: String, $phone: String){
  signUp(name: $name, email: $email, password: $password, phone: $phone) {
    name
    email
    phone
  }
 }`  

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    private apollo: Apollo
  ) {}

/**
 *  Sign up with email/password
 * @param userRecord 
 * @returns 
 */
  signUpClient(userRecord: IUserRecord): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apollo.mutate({
        mutation: Sign_Up,
        variables: {
          inputType: {
            name: userRecord.name,
            email: userRecord.email,
            password: userRecord.password,
            phone: userRecord.phone,
          },
        },
      }).subscribe(({ data }) => {
        resolve(data); // Resolve the Promise with the data
      }, (error) => {
        reject(error); // Reject the Promise with the error
      });
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
        return result;
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
}
