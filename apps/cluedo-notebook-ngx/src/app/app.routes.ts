import {ActivatedRouteSnapshot, Route} from '@angular/router';
import {inject} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";
import {GameSelector} from "./pages/game-selector/game-selector";
import {AppRoot} from "./pages/app-root/app-root";
import {Notebook} from "./pages/notebook/notebook";
import {cluedoStore} from "./+state/store";
import {getGameDefinitionUrl} from "./utils/get-game-definition-url";
import {GameDefinition} from "./models/game-definition";

export const appRoutes: Route[] = [
  {
    path: '',
    component: AppRoot,
    children: [
      {
        path: '',
        // component: GameSelector,
        redirectTo: '/classic',
        pathMatch: 'full'
      },
      {
        path: ':gameDefinition',
        component: Notebook,
        resolve: {
          gameDefinition: (route: ActivatedRouteSnapshot) => {
            console.log(route.params['gameDefinition']);
            const httpClient = inject(HttpClient);
            const store = inject(cluedoStore);

            return httpClient.get<GameDefinition>(getGameDefinitionUrl(route.params['gameDefinition']))
              .pipe(
                tap((definition) => {
                  store.selectGame(route.params['gameDefinition'], definition);
                })
              )
          }
        }
      }
    ]
  },
];
