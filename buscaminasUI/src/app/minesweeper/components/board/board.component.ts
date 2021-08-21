import {Component, OnDestroy, OnInit} from '@angular/core';
import {BoardConstants} from '../../util/board-constants';
import {WebSocketService} from '../../services/web-socket.service';
import {MatDialog} from '@angular/material';
import {SetupMinesweeperDialogComponent} from '../setup-minesweeper-dialog/setup-minesweeper-dialog.component';
import {EndGameDialogComponent} from "../end-game-dialog/end-game-dialog.component";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, OnDestroy {
  mineSweeperData: any;
  numberOfColumns = 0;
  numberOfRows = 0;
  numberOfMines = 0;
  numberOfRemainingFlags = 0;
  timePlaying = 0;
  intervalId;
  endGame = false;
  cells: any[][] = [];

  constructor(private webSocketService: WebSocketService, private matDialog: MatDialog) {
    this.connectToWebSocket();
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
    this.webSocketService.disconnectWs();
  }

  showSetupDialog() {
    const dialogRef = this.matDialog.open(SetupMinesweeperDialogComponent, {
      width: '252px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createAGame(result);
      }
    });
  }

  connectToWebSocket() {
    this.webSocketService.boardComponent = this;
    this.webSocketService.connectWs();
  }

  handleWebSocketMessage(message: any) {
    this.mineSweeperData = message;
    this.setMinesweeperData();
  }

  setMinesweeperData() {
    this.cells = this.mineSweeperData.cells;
    this.numberOfRemainingFlags = this.mineSweeperData.numberOfRemainingFlags;
    this.endGame = this.mineSweeperData.endGame;
    if (this.endGame) {
      const dialogRef = this.matDialog.open(EndGameDialogComponent, {
        width: '252px',
        data: {winner: this.mineSweeperData.winner}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.showSetupDialog();
        }
      });
      this.stopClockTime();
    }
  }

  createAGame(data) {
    const initMinesweeper = {
      action: BoardConstants.CREATE_GAME_ACTION,
      numberOfColumns: data.numberOfColumns,
      numberOfRows: data.numberOfRows,
      numberOfMines: data.numberOfMines,
    };
    this.mineSweeperData = null;
    this.numberOfColumns = 0;
    this.numberOfRows = 0;
    this.numberOfMines = 0;
    this.numberOfRemainingFlags = 0;
    this.endGame = false;
    this.webSocketService.sendMessage(initMinesweeper);
    this.reloadClock();
  }

  leftClickRevealCell(cell, i , j) {
    if (
      BoardConstants.CELL_STATE_UNCOVERT === cell.cellState ||
      BoardConstants.CELL_STATE_MARKED_FLAG === cell.cellState ||
      this.endGame
    ) {
      return;
    }
    const mineSweeper = {
      ... this.mineSweeperData,
      lastRowSelected: i,
      lastColumnSelected: j,
      action: BoardConstants.LEFT_CLICK_ACTION,
    };
    this.webSocketService.sendMessage(mineSweeper);
  }

  rightClickPutFlag(event, cell, i, j) {
    event.preventDefault();
    if (
      BoardConstants.CELL_STATE_UNCOVERT === cell.cellState ||
      this.endGame
    ) {
      return;
    }
    const mineSweeper = {
      ... this.mineSweeperData,
      lastRowSelected: i,
      lastColumnSelected: j,
      action: BoardConstants.RIGHT_CLICK_ACTION,
    };
    this.webSocketService.sendMessage(mineSweeper);
  }

  defineCellClass(cell) {
    let cellClass = '';
    switch (cell.cellState) {
      case BoardConstants.CELL_STATE_COVERT:
        cellClass = 'covert-cell';
        break;
      case BoardConstants.CELL_STATE_UNCOVERT:
        cellClass = 'uncovert-cell';
        break;
      case BoardConstants.CELL_STATE_MARKED_FLAG:
        cellClass = 'marked-flag-cell';
        break;
      case BoardConstants.CELL_STATE_MARKED_INTERROGANT:
        cellClass = 'marked-interrogant-cell';
        break;
      case BoardConstants.CELL_STATE_MINE_UNCOVERT:
        cellClass = 'mine-cell-uncovert';
        break;
      case BoardConstants.CELL_STATE_MINE_UNCOVERT_LOSE:
        cellClass = 'mine-cell-uncovert-lose';
        break;
      case BoardConstants.CELL_STATE_MINE_X:
        cellClass = 'mine-cell-x';
        break;
      default:
        break;
    }
    return cellClass;
  }

  defineNumberColor(cell) {
    if (cell.nearMines === null)  {
      return {};
    }
    let numberColor = '';
    switch ( cell.nearMines ) {
      case 1:
        numberColor = '#0f12d5';
        break;
      case 2:
        numberColor = '#0c8609';
        break;
      case 3:
        numberColor = '#ff0810';
        break;
      case 4:
        numberColor = '#1b1e75';
        break;
      case 5:
        numberColor = '#8e1519';
        break;
      case 6:
        numberColor = '#158486';
        break;
      case 7:
        numberColor = '#000000';
        break;
      case 8:
        numberColor = '#818181';
        break;
      default:
        break;
    }
    return {color: numberColor};
  }

  reloadClock() {
    this.timePlaying = 0;
    clearInterval(this.intervalId);
    this.intervalId = setInterval(() => { this.timePlaying += 1; }, 1000);
  }

  stopClockTime() {
    clearInterval(this.intervalId);
  }

  showNumber(cell) {
    return (cell.cellState === BoardConstants.CELL_STATE_UNCOVERT && cell.nearMines > 0);
  }

}
