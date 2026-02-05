import {Component, computed, inject} from '@angular/core';
import { cluedoStore } from "../../+state/store";
import {TranslocoPipe} from "@jsverse/transloco";
import {CircleQuestionMarkIcon, DotIcon, LucideAngularModule, XIcon} from "lucide-angular";

@Component({
  selector: 'clu-preview-data',
  imports: [
    TranslocoPipe,
    LucideAngularModule
  ],
  templateUrl: './preview-data.html',
  styleUrl: './preview-data.css',
})
export class PreviewData {
  private readonly cluedoStore = inject(cluedoStore);

  private summary = () => this.cluedoStore.summary();

  protected players = computed(() => this.summary().players);
  protected gameType = computed(() => this.cluedoStore.gameDefinition() ?? 'classic');

  protected suspects = computed(() => this.summary().groups.suspectsGroup);
  protected rooms = computed(() => this.summary().groups.roomsGroup);
  protected items = computed(() => this.summary().groups.itemsGroup);
  protected readonly questionMarkIcon = CircleQuestionMarkIcon;
  protected readonly dotIcon = DotIcon;
  protected readonly xIcon = XIcon;
}
