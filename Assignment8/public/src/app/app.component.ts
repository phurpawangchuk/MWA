import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TrailsComponent } from './trails/trails.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AddTrailComponent } from './add-trail/add-trail.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    TrailsComponent,
    NavigationComponent,
    FooterComponent,
    ErrorPageComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mpApp';
}
