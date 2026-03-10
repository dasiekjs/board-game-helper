import {Component, ElementRef, model, output, signal, viewChild} from '@angular/core';
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {LucideAngularModule, Plus} from "lucide-angular";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-players-selection',
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    LucideAngularModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './players-selection.html',
  styleUrl: './players-selection.scss',
})
export class PlayersSelection {
  protected readonly Plus = Plus;
  protected readonly playerName = new FormControl('');
  private readonly playerInput = viewChild<ElementRef<HTMLInputElement>>('inputElement');

  readonly playerAdded = output<string>();

  protected addPlayer() {
    if (this.playerName.value) {
      this.playerAdded.emit(this.playerName.value);
      this.playerName.reset();
      if (this.playerInput()?.nativeElement) {
        this.playerInput()?.nativeElement?.focus();
      }
    }
  }
}
