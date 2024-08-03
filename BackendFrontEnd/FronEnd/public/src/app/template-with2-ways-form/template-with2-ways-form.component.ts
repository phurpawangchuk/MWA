import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-with2-ways-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './template-with2-ways-form.component.html',
  styleUrl: './template-with2-ways-form.component.css'
})

export class TemplateWith2WaysFormComponent {

  name: string = "test1122";
  username: string = "test";
  password: string = "test";
  passwordRepeat: string = "";

  user = {
    name: "hahddd",
    username: "aa",
    password: "aa",
    passwordRepeat: "a"
  }

  register(form: NgForm) {
    console.log(form.value);
  }

}
