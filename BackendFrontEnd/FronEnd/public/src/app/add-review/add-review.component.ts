import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GamesDataService } from '../services/games-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-review',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-review.component.html',
  styleUrl: './add-review.component.css'
})
export class AddReviewComponent {

  // student = {
  //   firstname: '',
  //   lastname: ''
  // }

  form: FormGroup;

  title: string = "Mean Game";

  constructor(private _fb: FormBuilder, private _gameService: GamesDataService, private _activeRoute: ActivatedRoute) {
    this.form = this._fb.group({
      title: ['Ttitle', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      rating: ['', Validators.required],
      review: ['SOme Review'],
      postDate: [new Date()]
    });
  }
  onSubmit() {
    // console.log(this.student.firstname+" "+this.student.lastname);
    console.log(this.form.valid);

    let gameId = this._activeRoute.snapshot.params['gameId'];
    console.log(gameId);

    if (this.form.valid) {
      console.log(this.form.value)
      this._gameService.addReviews(gameId, this.form.value)
        .subscribe((result) => {
          console.log(result)
          alert(result.message);
        })
    }
  }
}
