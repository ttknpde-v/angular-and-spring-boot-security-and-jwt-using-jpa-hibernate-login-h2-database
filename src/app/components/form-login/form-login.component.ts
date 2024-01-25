import {Component, NgZone} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.css'
})
export class FormLoginComponent {

  private router: Router
  private ngZone: NgZone
  private authenticationService: AuthenticationService
  private user : User

  constructor(router: Router, authenticationService: AuthenticationService, ngZone: NgZone) {
    this.router = router
    this.ngZone = ngZone
    this.authenticationService = authenticationService
    this.user = new User('','','')
  }

  set username(value : string ) {
    this.user.username = value
  }

  set password(value : string) {
    this.user.password = value
  }

  checkLogin() {
    (
      this.authenticationService.authenticate(this.user.username, this.user.password)
        .subscribe(
          () => { // (response)
            /* response {jwt: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbGV4IiwiZXhwIjoxN…iQcqsvrmMIR8xFy4Ol9GEGVMmY6MOL8m9xDlQguWav0nUmaVw'} */
            this.ngZone.run(() => {
              // this.router.navigate(['book/list'],{queryParams : response, skipLocationChange:true } ) // go to path and send value on url (for hide parameter using skipLocationChange : true)
              this.router.navigateByUrl('book/list') // go to path
            })
          },
          (error) => {
            console.log(error.toString())
            throw error
          })
    );
  }

}
