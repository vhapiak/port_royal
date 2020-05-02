/// <reference types="phaser" />

import { Config } from "./ViewConfig";
import { GameModel } from "../GameModel";
import { GameEventVisitor } from "../../gameEvents/GameEventVisitor";
import { GamePhaseChangedEvent } from "../../gameEvents/GamePhaseChangedEvent";
import { GamePhase } from "../../gameState/GamePhase";
import { CardsProvider } from "../CardsProvider";

export class DrawnCardView extends GameEventVisitor {

    gameModel: GameModel;
    drawnCard: Phaser.GameObjects.Image;
    cardsProvider: CardsProvider;

    constructor(scene: Phaser.Scene, gameModel: GameModel, cardsProvider: CardsProvider) {
        super();
        
        this.gameModel = gameModel;
        this.cardsProvider = cardsProvider;

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
            const texture = this.cardsProvider.getCardTexture(state.drawnCard.id);
            this.drawnCard.setTexture(texture.atlas, texture.frame);
            this.drawnCard.setVisible(true);
        } else {
            this.drawnCard.setVisible(false);
        }
    }
}