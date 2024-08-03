import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrailDataService } from '../services/trail-data.service';
import { FormsModule, NgForm } from '@angular/forms';
import { SubTrail } from '../model/Trail';

@Component({
  selector: 'app-add-trail',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-trail.component.html',
  styleUrl: './add-trail.component.css'
})

export class AddTrailComponent implements OnInit {

  constructor(private _activeRouter: ActivatedRoute, private _trailService: TrailDataService) { }

  trail: SubTrail = {
    _id: '',
    name: '',
    distance: 2,
    difficulty: ''
  };

  id!: string;
  responseMsg: string = '';

  ngOnInit(): void {
    this.id = this._activeRouter.snapshot.params['trailId'];
  }

  addTrail(form: NgForm) {
    console.log(form.value);
    this._trailService.addTrail(this.id, form.value).subscribe(data => {
      console.log(data);
      this.responseMsg = data.message;
    })
    form.reset();
  }

}
