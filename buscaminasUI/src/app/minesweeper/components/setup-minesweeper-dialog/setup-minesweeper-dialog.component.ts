import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {BoardConstants} from '../../util/board-constants';

@Component({
  selector: 'app-setup-minesweeper-dialog',
  templateUrl: './setup-minesweeper-dialog.component.html',
  styleUrls: ['./setup-minesweeper-dialog.component.css']
})
export class SetupMinesweeperDialogComponent implements OnInit {

  data = {
    numberOfColumns: BoardConstants.MIN_COLUMNS,
    numberOfRows: BoardConstants.MIN_ROWS,
    numberOfMines: Math.round(BoardConstants.MIN_COLUMNS * BoardConstants.MIN_ROWS * BoardConstants.MIN_MINE_PORCENT),
  };

  constructor(public dialogRef: MatDialogRef<SetupMinesweeperDialogComponent>) {
    this.data = {
      numberOfColumns: BoardConstants.MIN_COLUMNS,
      numberOfRows: BoardConstants.MIN_ROWS,
      numberOfMines: this.minMines,
    };
  }

  ngOnInit() {
  }

  onNoClick() {
    this.dialogRef.close(null);
  }

  setupGame() {
    if (
      this.data.numberOfColumns === 0 ||
      this.data.numberOfRows === 0 ||
      this.data.numberOfMines === 0
    ) {
      return;
    }
    this.dialogRef.close(this.data);
  }

  get minColumns() {
    return BoardConstants.MIN_COLUMNS;
  }

  get maxColumns() {
    return BoardConstants.MAX_COLUMNS;
  }

  get minRows() {
    return BoardConstants.MIN_ROWS;
  }

  get maxRows() {
    return BoardConstants.MAX_ROWS;
  }

  get minMines() {
    return Math.round(this.data.numberOfColumns * this.data.numberOfRows * BoardConstants.MIN_MINE_PORCENT);
  }

  get maxMines() {
    return Math.round(this.data.numberOfColumns * this.data.numberOfRows * BoardConstants.MAX_MINE_PORCENT);
  }

  changeMinOrMaxNumberOfMine() {
    if (this.data.numberOfMines < this.minMines) {
      this.data.numberOfMines = this.minMines;
      return;
    }

    if (this.data.numberOfMines > this.maxMines) {
      this.data.numberOfMines = this.maxMines;
    }
  }

}
