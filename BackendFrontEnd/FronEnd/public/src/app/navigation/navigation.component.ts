import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {

  // constructor(private _router: Router) { }
  // goToHomePage() {
  //   this._router.navigate(["home"]);
  // }
  // goToGamePage() {
  //   this._router.navigate(["games"]);
  // }

  login() {
    console.log()
  }
}
