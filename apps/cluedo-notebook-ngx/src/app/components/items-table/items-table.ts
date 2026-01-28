import {Component, computed, inject, input} from '@angular/core';

import {CircleQuestionMarkIcon, LucideAngularModule, XIcon} from "lucide-angular";
import {TranslocoPipe} from "@jsverse/transloco";
import {cluedoStore} from "../../+state/store";

@Component({
  selector: 'clu-items-table',
  imports: [
    LucideAngularModule,
    TranslocoPipe
  ],
  templateUrl: './items-table.html',
  styleUrls: ['./items-table.scss', './items-table.css'],
})
export class ItemsTable {

  elements = input<string[]>([]);
  type = input<string>('suspects');
  gameType = input<string>('classic');

  // definition from store
  private cluedoStore = inject(cluedoStore);

  protected players = computed(() =>this.cluedoStore.players());

  protected xIcon = XIcon;
  protected questionMarkIcon = CircleQuestionMarkIcon;

  protected isSelected(player: string | number, element: string) {
    return ((this.cluedoStore.assignments() ?? {})[element] ?? {})[''+player];
  }

  protected selectField(player: string | number, element: string) {
    this.cluedoStore.selectField(player, element);
  }
}
