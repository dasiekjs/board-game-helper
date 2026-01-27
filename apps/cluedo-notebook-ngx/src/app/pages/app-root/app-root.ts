import {Component, ViewEncapsulation} from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'clu-root',
  imports: [
    RouterOutlet
  ],
  template: '<router-outlet/>',
  styleUrl: './app-root.scss',
})
export class AppRoot {}
