import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ParentComponent } from './parent/parent.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { TemplateWith2WaysFormComponent } from './template-with2-ways-form/template-with2-ways-form.component';
import { TemplateWithRefFormComponent } from './template-with-ref-form/template-with-ref-form.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FooterComponent,
    NavigationComponent,
    ParentComponent,
    ReactiveFormComponent,
    TemplateWithRefFormComponent,
    TemplateWith2WaysFormComponent,
    // LoginComponent,
    // RegisterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Welcome to mean Game';
}
