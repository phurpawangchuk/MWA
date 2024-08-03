import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-with-ref-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './template-with-ref-form.component.html',
  styleUrl: './template-with-ref-form.component.css'
})

export class TemplateWithRefFormComponent implements OnInit {

  @ViewChild("registerationForm")
  registerationForm!: NgForm;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      console.log(this.registerationForm.value);
      this.registerationForm.setValue({
        name: "Jack",
        username: "AA",
        password: "aaas",
        passwordRepeat: "ddd"
      })
    }, 0);
  }

  register(form: NgForm) {
    console.log(this.registerationForm.value);
    // console.log(form.value)
  }

}
