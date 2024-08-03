import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerationForm!: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerationForm = this._formBuilder.group({
      name: "",
      username: "",
      password: "",
      passwordRepeat: ""
    })
  }

  register() {
    console.log(this.registerationForm.value);

  }
}
