/// <reference types="phaser" />

import { Config } from "./ViewConfig";
import { GameModel } from "../GameModel";
import { GameEventVisitor } from "../../gameEvents/GameEventVisitor";
import { GamePhaseChangedEvent } from "../../gameEvents/GamePhaseChangedEvent";
import { GamePhase } from "../../gameState/GamePhase";

export class DrawnCardView extends GameEventVisitor {

    gameModel: GameModel;
    drawnCard: Phaser.GameObjects.Image;

    constructor(scene: Phaser.Scene, gameModel: GameModel) {
        super();
        
        this.gameModel = gameModel;

        this.drawnCard = scene.add.image(
            Config.mainLayer.verticalLayer.x,
            Config.mainLayer.verticalLayer.deckRow.y,
            'shirt');

        gameModel.subscribe(this);
        this.updateState();
    }

    visitGamePhaseChangedEvent(event: GamePhaseChangedEvent) {
        this.updateState();
    }

    private updateState(): void {
        let state = this.gameModel.gameEngine.state;
        if (state.phase === GamePhase.DiscardingShip) {
            this.drawnCard.setTexture(state.drawnCard.imagePath);
            this.drawnCard.setVisible(true);
        } else {
            this.drawnCard.setVisible(false);
        }
    }
}