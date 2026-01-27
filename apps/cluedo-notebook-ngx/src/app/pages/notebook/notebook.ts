import {Component, computed, inject} from '@angular/core';
import {JsonPipe} from "@angular/common";
import {cluedoStore} from "../../+state/store";
import {TranslocoPipe, TranslocoService} from "@jsverse/transloco";
import {ListIcon, LucideAngularModule, RotateCcw, SearchAlertIcon, UserPlus, UserSearchIcon} from "lucide-angular";
import {MatDialog} from "@angular/material/dialog";
import {MatTab, MatTabGroup, MatTabLabel} from "@angular/material/tabs";
import {ItemsTable} from "../../components/items-table/items-table";
import {AddPlayer} from "../../components/add-player/add-player";
import {MatIconButton} from "@angular/material/button";

@Component({
  selector: 'bgh-dream-notebook',
  imports: [
    TranslocoPipe,
    LucideAngularModule,
    MatTabGroup,
    MatTab,
    MatTabLabel,
    ItemsTable,
    MatIconButton
  ],
  templateUrl: './notebook.html',
  styleUrls: [
    './notebook.scss',
    './notebook.css'
  ]
})
export class Notebook {

  private store = inject(cluedoStore);
  private dialog = inject(MatDialog);
  private transloco = inject(TranslocoService);

  protected type = this.store.gameDefinition();

  protected suspects = this.store.suspects();
  protected items = this.store.items();
  protected rooms = this.store.rooms();

  protected canAddMorePlayer = computed(() => this.store.canAddMorePlayer());

  protected readonly SearchAlertIcon = SearchAlertIcon;


  addPlayer() {
    const ref = this.dialog.open(AddPlayer);

    ref.afterClosed().subscribe((playerName) => {
      if (playerName) {
        this.store.addPlayer(playerName);
      }
    });
  }

  protected readonly UserPlus = UserPlus;
  protected readonly Reset = RotateCcw;

  protected reset() {
    if (confirm(this.transloco.translate('actions.reset.message'))) {
      this.store.resetGame();
    }
  }
}
