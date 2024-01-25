import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private httpClient :HttpClient

  constructor( httpClient :HttpClient) {
    this.httpClient = httpClient
  }
  authenticate(username : string | undefined , password : string | undefined ) {
    return this.httpClient.post<any>('http://localhost:8080/jwt/token',{username,password}).pipe(
        map(response => {
            // console.log(response) // {jwt: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbGV4IiwiZXhwIjoxN…7QV1RNN3ENWa7pqwxFQXTTFPBRXRpn5UbWvy9NVf33FpC41_A'}
            sessionStorage.setItem('username',''+username );
            // let tokenStr= 'Bearer '+response.jwt;
            let tokenStr = response.jwt;
            sessionStorage.setItem('token', tokenStr);
            return response;
          })
    );
  }


  isUserLoggedInAndGetToken() {
    return sessionStorage.getItem('token')
  }

  isUserLoggedInAndGetUser() {
    return sessionStorage.getItem('username')
  }

  logOut() {
    // deleted all session that run-time As username , token
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('username')
  }
}
