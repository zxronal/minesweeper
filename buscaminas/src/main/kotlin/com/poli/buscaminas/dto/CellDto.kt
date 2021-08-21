package com.poli.buscaminas.dto

import com.poli.buscaminas.util.MinesweeperConstans

class CellDto {
    var nearMines: Int = 0
    var mine: Boolean = false
    var cellState: String = MinesweeperConstans.CELL_STATE_COVERT
}