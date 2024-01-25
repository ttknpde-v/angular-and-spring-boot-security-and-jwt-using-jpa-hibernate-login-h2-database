import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Book} from "../models/book";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private httpClient: HttpClient

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient
  }
  public getProgramingBooks(jwt : string | null) : Observable<Book[]> { // Role USER can access only.
    const headers = new HttpHeaders({ Authorization: 'Bearer ' +jwt} );
    return this.httpClient.get<Book[]>('http://localhost:8080/ttknpdev/book-store/programing/reads',{headers});
  }
  public getProgramingBook(jwt : string | null,bid : string | null) : Observable<Book> { // Role USER can access only.
    const headers = new HttpHeaders({ Authorization: 'Bearer ' +jwt} );
    return this.httpClient.get<Book>('http://localhost:8080/ttknpdev/book-store/programing/read/'+bid,{headers});
  }

}
