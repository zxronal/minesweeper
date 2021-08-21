package com.poli.buscaminas.dto

class MinesweeperDto {
    lateinit var action: String
    var numberOfColumns: Int = 0
    var numberOfRows: Int = 0
    var numberOfMines: Int = 0
    var numberOfRemainingFlags: Int = 0
    var cells = mutableListOf<MutableList<CellDto>>()
    var lastRowSelected: Int? = null
    var lastColumnSelected: Int? = null
    var endGame = false
    var winner = false
}