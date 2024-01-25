import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private readonly message = 'AppComponent was initial';
  get getMessage() : string {
    return this.message;
  }
}
