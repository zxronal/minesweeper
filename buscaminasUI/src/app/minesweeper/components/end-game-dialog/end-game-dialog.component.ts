import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-end-game-dialog',
  templateUrl: './end-game-dialog.component.html',
  styleUrls: ['./end-game-dialog.component.css']
})
export class EndGameDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<EndGameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  onNoClick() {
    this.dialogRef.close(null);
  }

  playAgain() {
    this.dialogRef.close(true);
  }

}
