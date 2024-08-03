import { Routes } from '@angular/router';
import { TrailsComponent } from './trails/trails.component';
import { TrailComponent } from './trail/trail.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AddTrailComponent } from './add-trail/add-trail.component';
import { EditTrailComponent } from './edit-trail/edit-trail.component';

export const routes: Routes = [
    {
        path: "", component: TrailsComponent
    },
    {
        path: "trails", component: TrailsComponent
    },
    {
        path: "trail", component: TrailComponent
    },
    {
        path: "trail/:trailId", component: TrailComponent
    },
    {
        path: "add-trail/:trailId", component: AddTrailComponent
    },
    {
        path: "edit-trail/:trailId", component: EditTrailComponent
    },
    {
        path: "**", component: ErrorPageComponent
    }

];
