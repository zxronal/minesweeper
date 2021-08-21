import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BoardComponent } from './minesweeper/components/board/board.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SetupMinesweeperDialogComponent } from './minesweeper/components/setup-minesweeper-dialog/setup-minesweeper-dialog.component';
import {MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import { EndGameDialogComponent } from './minesweeper/components/end-game-dialog/end-game-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    SetupMinesweeperDialogComponent,
    EndGameDialogComponent
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    SetupMinesweeperDialogComponent,
    EndGameDialogComponent
  ],
  entryComponents: [
    SetupMinesweeperDialogComponent,
    EndGameDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
