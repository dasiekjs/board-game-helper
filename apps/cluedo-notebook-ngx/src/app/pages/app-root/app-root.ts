import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'clu-root',
  imports: [
    RouterOutlet
  ],
  template: '<router-outlet/>',
})
export class AppRoot {}
