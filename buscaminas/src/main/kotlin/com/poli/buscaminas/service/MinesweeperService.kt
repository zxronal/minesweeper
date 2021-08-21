package com.poli.buscaminas.service

import com.poli.buscaminas.dto.CellDto
import com.poli.buscaminas.dto.MinesweeperDto
import com.poli.buscaminas.util.MinesweeperConstans
import org.springframework.stereotype.Service
import kotlin.random.Random

@Service
class MinesweeperService {

    fun processMinesweeperAction(minesweeperDto: MinesweeperDto): MinesweeperDto {
        return when (minesweeperDto.action) {
            MinesweeperConstans.CREATE_GAME_ACTION -> {
                createBoardAction(minesweeperDto)
            }
            MinesweeperConstans.LEFT_CLICK_ACTION -> {
                leftClickAction(minesweeperDto)
            }
            MinesweeperConstans.RIGHT_CLICK_ACTION -> {
                rightClickAction(minesweeperDto)
            }
            else -> minesweeperDto
        }
    }

    private fun createBoardAction(minesweeperDto: MinesweeperDto): MinesweeperDto {
        this.createCells(minesweeperDto)
        this.createMines(minesweeperDto)
        this.countMines(minesweeperDto)
        return minesweeperDto
    }

    private fun createCells(minesweeperDto: MinesweeperDto) {
        val cellsMatriz = mutableListOf<MutableList<CellDto>>()
        for (i in 0 until minesweeperDto.numberOfRows) {
            val cellColumns = mutableListOf<CellDto>();
            for (j in 0 until minesweeperDto.numberOfColumns) {
                val cell = CellDto()
                cellColumns.add(cell)
            }
            cellsMatriz.add(cellColumns)
        }
        minesweeperDto.cells = cellsMatriz
        minesweeperDto.endGame = false
    }

    private fun createMines(minesweeperDto: MinesweeperDto) {
        minesweeperDto.numberOfRemainingFlags = minesweeperDto.numberOfMines
        for (j in 0 until minesweeperDto.numberOfMines) {
            var r = 0
            var c = 0
            do {
                r = Random.nextInt(0, minesweeperDto.numberOfRows)
                c = Random.nextInt(0, minesweeperDto.numberOfColumns)
            } while (minesweeperDto.cells[r][c].mine)
            minesweeperDto.cells[r][c].mine = true
        }
    }

    private fun countMines(minesweeperDto: MinesweeperDto) {
        for (f in 0 until minesweeperDto.numberOfRows) {
            for (c in 0 until minesweeperDto.numberOfColumns) {
                if (!minesweeperDto.cells[f][c].mine) {
                    var countMines = 0
                    for (i in -1..1) {
                        for (j in -1..1) {
                            if (i == 0 && j== 0) {
                                continue
                            }
                            try {
                                if (minesweeperDto.cells[f + i][c + j].mine) {
                                    countMines += 1
                                }

                            } catch (e: Exception) {
                            }
                        }
                    }
                    minesweeperDto.cells[f][c].nearMines = countMines
                }
            }
        }
    }

    private fun leftClickAction(minesweeperDto: MinesweeperDto): MinesweeperDto {
        if (minesweeperDto.cells[minesweeperDto.lastRowSelected!!][minesweeperDto.lastColumnSelected!!].mine) {
            this.loseGame(minesweeperDto)
        } else {
            this.revealCell(minesweeperDto)
        }
        this.validateWinner(minesweeperDto)
        return minesweeperDto
    }

    private fun loseGame(minesweeperDto: MinesweeperDto) {
        minesweeperDto.cells.forEach {
            it.forEach { cellDto ->
                if (cellDto.mine) {
                    if (cellDto.cellState.equals(MinesweeperConstans.CELL_STATE_MARKED_FLAG)) {
                        cellDto.cellState = MinesweeperConstans.CELL_STATE_MINE_X
                    } else {
                        cellDto.cellState = MinesweeperConstans.CELL_STATE_MINE_UNCOVERT
                    }
                }
            }
        }
        minesweeperDto.cells[minesweeperDto.lastRowSelected!!][minesweeperDto.lastColumnSelected!!].cellState = MinesweeperConstans.CELL_STATE_MINE_UNCOVERT_LOSE
        minesweeperDto.endGame = true
    }

    private fun revealCell(minesweeperDto: MinesweeperDto) {
        val currentCell = minesweeperDto.cells[minesweeperDto.lastRowSelected!!][minesweeperDto.lastColumnSelected!!]
        currentCell.cellState = MinesweeperConstans.CELL_STATE_UNCOVERT
        minesweeperDto.cells[minesweeperDto.lastRowSelected!!][minesweeperDto.lastColumnSelected!!] = currentCell
        if (currentCell.nearMines == 0 && !currentCell.mine) {
            openArea(minesweeperDto.cells, minesweeperDto.lastRowSelected!!, minesweeperDto.lastColumnSelected!!)
        }
    }

    private fun openArea(cells: MutableList<MutableList<CellDto>>, row: Int, column: Int) {
        for (i in -1..1) {
            for (j in -1..1) {
                if (i == 0 && j==0) {
                    continue
                }
                try {
                    val cell = cells[row + i][column + j]
                    if (
                        cell.cellState.equals(MinesweeperConstans.CELL_STATE_COVERT) ||
                        cell.cellState.equals(MinesweeperConstans.CELL_STATE_MARKED_INTERROGANT)
                    ) {
                        cell.cellState = MinesweeperConstans.CELL_STATE_UNCOVERT
                        cells[row + i][column + j] = cell
                        if (cell.nearMines == 0 && !cell.mine) {
                            openArea(cells, row + i, column + j)
                        }
                    }
                } catch (e: Exception) {

                }
            }
        }

    }

    private fun rightClickAction(minesweeperDto: MinesweeperDto): MinesweeperDto {
        val selectedCell = minesweeperDto.cells[minesweeperDto.lastRowSelected!!][minesweeperDto.lastColumnSelected!!]
        val nextState = when (selectedCell.cellState) {
            MinesweeperConstans.CELL_STATE_COVERT -> {
                if (minesweeperDto.numberOfRemainingFlags > 0) {
                    minesweeperDto.numberOfRemainingFlags -= 1
                    MinesweeperConstans.CELL_STATE_MARKED_FLAG
                } else {
                    MinesweeperConstans.CELL_STATE_COVERT
                }
            }
            MinesweeperConstans.CELL_STATE_MARKED_FLAG -> {
                minesweeperDto.numberOfRemainingFlags += 1
                MinesweeperConstans.CELL_STATE_MARKED_INTERROGANT
            }
            MinesweeperConstans.CELL_STATE_MARKED_INTERROGANT -> {
                MinesweeperConstans.CELL_STATE_COVERT
            }
            else -> {
                MinesweeperConstans.CELL_STATE_COVERT
            }
        }
        selectedCell?.cellState = nextState
        minesweeperDto.cells[minesweeperDto.lastRowSelected!!][minesweeperDto.lastColumnSelected!!] = selectedCell!!
        this.validateWinner(minesweeperDto)
        return minesweeperDto
    }

    private fun validateWinner(minesweeperDto: MinesweeperDto) {
        var covertMines = 0
        var uncovertCells = 0

        minesweeperDto.cells.parallelStream().forEach {
            it.forEach { cellDto ->
                if (cellDto.mine && cellDto.cellState.equals(MinesweeperConstans.CELL_STATE_MARKED_FLAG)) {
                    synchronized(this) {
                        covertMines += 1
                    }
                } else if (cellDto.cellState.equals(MinesweeperConstans.CELL_STATE_UNCOVERT)) {
                    synchronized(this) {
                        uncovertCells += 1
                    }
                }
            }
        }

        val totalCells = minesweeperDto.numberOfRows * minesweeperDto.numberOfColumns
        if (totalCells == (covertMines + uncovertCells)) {
            minesweeperDto.winner = true
            minesweeperDto.endGame = true
        }
    }
}