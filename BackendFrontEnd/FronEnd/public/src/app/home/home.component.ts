import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { min } from 'rxjs';
import { GamesDataService } from '../services/games-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  check1: number = 0;
  check2: number = 0;
  title: string = "Mean Game";

  // constructor(private _fb: FormBuilder, private _gameService: GamesDataService) {
  //   this.form = this._fb.group({
  //     title: ['Ttitle', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
  //     rating: ['', Validators.required],
  //     review: ['SOme Review'],
  //     postDate: [new Date()]
  //   });
  // }
  // onSubmit() {
  //   // console.log(this.student.firstname+" "+this.student.lastname);
  //   if (this.form.valid) {
  //     console.log(this.form.value)
  //     this._gameService.addReviews("5fbed15c07a5894b456a4347", this.form.value)
  //       .subscribe((result) => {
  //         console.log(result)
  //         alert(result.message);
  //       })
  //   }
  // }

  onChange() {
    console.log("AAAA " + this.check1)
  }
}
