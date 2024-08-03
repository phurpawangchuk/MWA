import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.css'
})
export class ReactiveFormComponent implements OnInit {

  registerationForm!: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // this.registerationForm = new FormGroup({
    //   name: new FormControl(),
    //   username: new FormControl(),
    //   password: new FormControl(),
    //   repeatPassword: new FormControl(),
    // });

    this.registerationForm = this._formBuilder.group({
      name: ["aaa"],
      username: ["username"],
      password: [],
      passwordRepeat: []
    })
  }

  register(form: FormGroup) {
    // console.log(this.registerationForm.value);
    console.log(this.registerationForm.value);

  }
}
