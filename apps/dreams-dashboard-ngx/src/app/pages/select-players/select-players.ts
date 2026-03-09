import { Component } from '@angular/core';
import {LucideAngularModule, Sparkles} from "lucide-angular";
import {PlayersSelection} from "../../components/players-selection/players-selection";

@Component({
  selector: 'app-select-players',
  imports: [
    LucideAngularModule,
    PlayersSelection
  ],
  templateUrl: './select-players.html',
  styleUrl: './select-players.css',
})
export class SelectPlayers {
  protected readonly Sparkles = Sparkles;

  protected onPlayerAdded(event: string) {
    console.log('player added');
  }
}
