import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TrailDataService } from '../services/trail-data.service';
import { CommonModule } from '@angular/common';
import { SubTrail } from '../model/Trail';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-trail',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './trail.component.html',
  styleUrl: './trail.component.css'
})
export class TrailComponent implements OnInit {

  constructor(
    private _trailService: TrailDataService,
    private _router: Router,
    private _activeRoute: ActivatedRoute) { }

  trailId!: string;
  trail!: SubTrail[];
  responseMsg: string = '';

  ngOnInit(): void {
    this.trailId = this._activeRoute.snapshot.params['trailId'];
    this._trailService.getOneTrail(this.trailId).subscribe(data => {
      console.log(data)
      this.trail = data;
    })

  }

  editTrail(id: string) {
    this._router.navigate(['/edit-trail/' + id + '-' + this.trailId]);
  }

  delete(subId: string) {
    this._trailService.deleteTrail(this.trailId, subId).subscribe(data => {
      console.log(data);
      // alert(data);
      this.responseMsg = "Successfully deleted";
      // this._router.navigate(['/trail/' + this.trailId]);
    })
  }

  deleteSelected() {
    const selectedIds = this.getSelectedIds();
    selectedIds.forEach(id => {
      this._trailService.deleteTrail(this.trailId, id).subscribe(data => {
        this.responseMsg = "Successfully deleted";
        this._router.navigate(['/trail/' + this.trailId]);
        this.trail = this.trail.filter(trail => trail._id !== id);
      })
    })
    // alert("Selected record are deleted");
  }

  getSelectedIds(): string[] {
    return this.trail.filter(t => t.selected).map(t => t._id);
  }

  add() {
    this._router.navigate(['/add-trail/' + this.trailId]);
    console.log()
  }
}
