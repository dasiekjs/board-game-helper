import {Component, inject, signal} from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {LucideAngularModule} from "lucide-angular";
import {TranslocoPipe} from "@jsverse/transloco";

@Component({
  selector: 'clu-add-player',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatLabel,
    MatInput,
    FormsModule,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    LucideAngularModule,
    TranslocoPipe
  ],
  templateUrl: './add-player.html',
  styleUrl: './add-player.scss',
})
export class AddPlayer {
  private dialogRef = inject(MatDialogRef<AddPlayer>);

  protected playerName = signal<string>('');

  protected onNoClick() {
    this.dialogRef.close();
  }

  protected addNewPlayer() {
    this.dialogRef.close(this.playerName());
  }
}
