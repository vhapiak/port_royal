/// <reference types="phaser" />

import { GameModel } from "../../GameModel";
import { PlayerView } from "./PlayerView";
import { Config } from "../ViewConfig";
import { PlayerSelectedListener } from "./PlayerSelectedListener";

export class PlayersView {

    constructor(scene: Phaser.Scene, gameModel: GameModel, listener: PlayerSelectedListener) {
        const players = gameModel.gameEngine.state.players;
        const config = Config.topPanel.players;
        for (let i = 0; i< players.length; ++i) {
            new PlayerView(
                config.first.x + i * config.offset,
                config.first.y,
                i,
                scene,
                gameModel,
                listener
            );
        }
    }
}