import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TrailDataService } from '../services/trail-data.service';
import { ActivatedRoute } from '@angular/router';
import { SubTrail } from '../model/Trail';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-trail',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-trail.component.html',
  styleUrl: './edit-trail.component.css'
})
export class EditTrailComponent implements OnInit {

  trail!: any;
  mainId!: string;
  subDocumentId!: string;

  name: string = "";
  distance: number = 0;
  difficulty: string = "";


  constructor(private _trailService: TrailDataService, private _activeRouter: ActivatedRoute) {
  }

  ngOnInit(): void {
    let paramId = this._activeRouter.snapshot.params['trailId'];
    let ids = paramId.split('-');
    this.subDocumentId = ids[0];
    this.mainId = ids[1];

    this._trailService.getSubDocumentTrail(this.mainId, this.subDocumentId)
      .subscribe(data => {
        this.trail = data;
      })
  }

  onSubmit(form: NgForm) {
    this._trailService.editTrail(this.mainId, this.subDocumentId, form.value).subscribe(response => {
      console.log(response);
    })
  }

}
