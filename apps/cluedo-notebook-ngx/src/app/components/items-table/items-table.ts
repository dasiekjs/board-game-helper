import {Component, computed, inject, input} from '@angular/core';

import {CircleQuestionMarkIcon, DotIcon, LucideAngularModule, XIcon} from "lucide-angular";
import {TranslocoPipe} from "@jsverse/transloco";
import {cluedoStore} from "../../+state/store";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatDivider} from "@angular/material/list";
import {AssignmentStatus} from "../../+state/state.model";

@Component({
  selector: 'clu-items-table',
  imports: [
    LucideAngularModule,
    TranslocoPipe,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    MatDivider
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
  protected dotIcon = DotIcon;

  protected isSelected(player: string | number, element: string) {
    return ((this.cluedoStore.assignments() ?? {})[element] ?? {})[''+player];
  }

  protected selectField(player: string | number, element: string, status: AssignmentStatus) {
    this.cluedoStore.selectField(player, element, status);
  }
}
