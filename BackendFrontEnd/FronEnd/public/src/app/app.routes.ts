import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GamesComponent } from './games/games.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { GameComponent } from './game/game.component';
import { AddGameComponent } from './add-game/add-game.component';
import { PublishersComponent } from './publishers/publishers.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './child/child.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { TemplateWith2WaysFormComponent } from './template-with2-ways-form/template-with2-ways-form.component';
import { TemplateWithRefFormComponent } from './template-with-ref-form/template-with-ref-form.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    {
        path: "", redirectTo: "reactive", pathMatch: "full"
    },
    {
        path: "home", component: HomeComponent
    },
    {
        path: "games", component: GamesComponent
    },
    {
        path: "game", component: GameComponent
    },
    {
        path: "game/:gameId", component: GameComponent
    },
    {
        path: "add-game", component: AddGameComponent
    },
    {
        path: "publishers/:gameId", component: PublishersComponent
    },
    {
        path: "reviews/:gameId", component: ReviewsComponent
    },
    {
        path: "add-review/:gameId", component: AddReviewComponent
    },
    {
        path: "parent", component: ParentComponent
    },
    {
        path: "child", component: ChildComponent
    },
    // {
    //     path: "reactive", component: ReactiveFormComponent
    // },
    // {
    //     path: "template2", component: TemplateWith2WaysFormComponent
    // },
    // {
    //     path: "template1", component: TemplateWithRefFormComponent
    // },
    {
        path: "register", component: RegisterComponent
    },
    {
        path: "login", component: LoginComponent
    },
    {
        path: "**", component: ErrorPageComponent
    }
];
