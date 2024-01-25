import {Component, NgZone, OnInit} from '@angular/core';
import {HttpService} from "../../service/http.service";
import {Book} from "../../models/book";
import {AuthenticationService} from "../../service/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrl: './list-book.component.css'
})
export class ListBookComponent implements OnInit {

  // private activatedRoute: ActivatedRoute // for retrieve params on path that sent by get method
  // private username: string | null
  private httpService: HttpService
  private authenticationService: AuthenticationService
  private ngZone: NgZone
  private router: Router
  private readonly jwt: string | null
  private _books: Book[] | undefined

  constructor(httpService: HttpService, authenticationService: AuthenticationService, router: Router, ngZone: NgZone) {
    // this.username = this.authenticationService.isUserLoggedInAndGetUser()
    this.httpService = httpService;
    this.authenticationService = authenticationService
    this.router = router
    this.ngZone = ngZone
    this.jwt = this.authenticationService.isUserLoggedInAndGetToken() // retrieve token from user can be logged in
    let user = authenticationService.isUserLoggedInAndGetUser()
    console.log('user ' + user + ' has token ' + this.jwt)
  }

  ngOnInit(): void {
    /*this.activatedRoute.queryParams
        .subscribe((params) => {
            // console.log(params) // {jwt: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbGV4IiwiZXhwIjoxN…GBI5sC1q3h1zi0AlPAY9xJJ00W8I-Ladxc91iDjfsDLP9KFeg'}
            this.jwt = params['jwt']
            // console.log(this.jwt)
            this.httpService.getEmployees(this.jwt).subscribe(response => {
              this._books = response
            })
          }
    );*/
    this.httpService.getProgramingBooks(this.jwt).subscribe(
      (response) => {
        // console.log(response)
        this._books = response
      },
      /*
         this way uses to catch the error from response
         when my response send error OR status 401
      */
      (error) => {
        // console.log(error)
        this.ngZone.run(() => {
          this.router.navigateByUrl('') // go to path
        })
      })
  }


  get books(): Book[] | undefined {
    return this._books;
  }

}
