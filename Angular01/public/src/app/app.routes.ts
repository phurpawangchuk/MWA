import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { HomeComponent } from './home/home.component';
import { GamesComponent } from './games/games.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'games',
        component: GamesComponent
    },
    {
        path: 'games/:gameId',
        component: GameDetailComponent
    },
    {
        path: '**',
        redirectTo: '/'
    }
];
