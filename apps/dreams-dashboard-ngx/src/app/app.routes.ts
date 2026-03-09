import { Route } from '@angular/router';
import {SelectPlayers} from "./pages/select-players/select-players";
import {GameDashboard} from "./pages/game-dashboard/game-dashboard";

export const appRoutes: Route[] = [
  {
    path: 'init-game',
    component: SelectPlayers,
  },
  {
    path: 'dashboard',
    component: GameDashboard,
  },
  {
    path: '',
    redirectTo: '/init-game',
    pathMatch: 'full'
  }
];
