import { Component, computed, inject } from '@angular/core';
import { cluedoStore } from '../../+state/store';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import {
  LucideAngularModule, RefreshCcwDot,
  RotateCcw,
  SearchAlertIcon,
  UserPlus,
} from 'lucide-angular';
import { MatDialog } from '@angular/material/dialog';
import { MatTab, MatTabGroup, MatTabLabel } from '@angular/material/tabs';
import { ItemsTable } from '../../components/items-table/items-table';
import { AddPlayer } from '../../components/add-player/add-player';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'clu-dream-notebook',
  imports: [
    TranslocoPipe,
    LucideAngularModule,
    MatTabGroup,
    MatTab,
    MatTabLabel,
    ItemsTable,
    MatIconButton,
  ],
  templateUrl: './notebook.html',
  styleUrls: ['./notebook.scss', './notebook.css'],
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


  protected readonly version = process.env.APP_VERSION;

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
  protected readonly ResetWithoutPlayers= RefreshCcwDot;

  protected reset() {
    if (confirm(this.transloco.translate('actions.reset.message'))) {
      this.store.resetGame();
    }
  }

  protected resetWithoutPlayers() {
    if (confirm(this.transloco.translate('actions.resetWithoutPlayers.message'))) {
      this.store.resetWithoutPlayers();
    }
  }
}
