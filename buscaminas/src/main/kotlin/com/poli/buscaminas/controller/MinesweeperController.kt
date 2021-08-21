package com.poli.buscaminas.controller

import com.poli.buscaminas.dto.MinesweeperDto
import com.poli.buscaminas.service.MinesweeperService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.stereotype.Controller


@Controller
class MinesweeperController {

    @Autowired
    private lateinit var minesweeperService: MinesweeperService

    @MessageMapping("/minesweeper")
    @SendTo("/topic/minesweeper")
    @Throws(Exception::class)
    fun mineSweeper(minesweeperDto: MinesweeperDto): MinesweeperDto {
        return minesweeperService.processMinesweeperAction(minesweeperDto)
    }
}




