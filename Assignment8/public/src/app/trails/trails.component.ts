import { Component, OnInit } from '@angular/core';
import { TrailDataService } from '../services/trail-data.service';
import { Trails } from '../model/Trail';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-trails',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './trails.component.html',
  styleUrl: './trails.component.css'
})
export class TrailsComponent implements OnInit {

  constructor(private _trailService: TrailDataService) { }

  trails: Trails[] = [];

  ngOnInit(): void {
    this._trailService.getAllTrails().subscribe(trails => {
      this.trails = trails;
    })
  }


}
