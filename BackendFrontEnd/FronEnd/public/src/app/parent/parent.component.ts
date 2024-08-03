import { Component, Output } from '@angular/core';
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ChildComponent],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.css'
})
export class ParentComponent {

  x: number = 5;
  y: number = 5;
  z: number = 0;

  name: string = 'TestName';
  updateZ(message: number) {
    this.z = message;
  }
}
