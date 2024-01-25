import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpService} from "../../service/http.service";
import {Book} from "../../models/book";
import {AuthenticationService} from "../../service/authentication.service";

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css'
})
export class EditBookComponent implements OnInit {

  private httpService: HttpService
  private activatedRoute: ActivatedRoute // for retrieve params on path that sent by get method
  private authenticationService: AuthenticationService
  private _book: Book | undefined
  private readonly jwt: string | null

  constructor(httpService: HttpService, activatedRoute: ActivatedRoute, authenticationService: AuthenticationService) {
    this.httpService = httpService
    this.activatedRoute = activatedRoute
    this.authenticationService = authenticationService
    this.jwt = authenticationService.isUserLoggedInAndGetToken()
    let user = authenticationService.isUserLoggedInAndGetUser()
    console.log('user '+user+' has token '+this.jwt)
  }

  ngOnInit(): void {
    this.httpService.getProgramingBook(this.jwt, this.activatedRoute.snapshot.paramMap.get("bid")).subscribe(
      (response: Book) => {
        this._book = new Book(response.bid,response.title,response.price)
        /*
        Can do
        this._book.bid = response.bid
        this._book.title = response.title
        this._book.price = response.price
        */
        /*
        Can do
        this._book.setBid(response.bid)
        this._book.setTitle(response.title)
        this._book.setPrice(response.price)*/
      })
  }


  get book(): Book | undefined{
    return this._book;
  }
}
