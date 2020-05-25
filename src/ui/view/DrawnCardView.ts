/// <reference types="phaser" />

import { Config } from "./ViewConfig";
import { GameModel } from "../GameModel";
import { GameEventVisitor } from "../../gameEvents/GameEventVisitor";
import { CardsProvider } from "../CardsProvider";
import { CardDrawnEvent } from "../../gameEvents/CardDrawnEvent";
import { GameState } from "../../gameState/GameState";
import { CardPutIntoHarborEvent } from "../../gameEvents/CardPutIntoHarborEvent";
import { DrawnCardDiscardedEvent } from "../../gameEvents/DrawnCardDiscarded";
import { AnimatedCard, FlipSide } from "../animations/AnimatedCard";
import { IAnimatedCardHolder, Result } from "../animations/IAnimatedCardHolder";

const flipDuration = 600;

export class DrawnCardView extends GameEventVisitor implements IAnimatedCardHolder {

    scene: Phaser.Scene;
    gameModel: GameModel;
    gameState: GameState;
    drawnCard: AnimatedCard;
    cardsProvider: CardsProvider;

    constructor(scene: Phaser.Scene, gameModel: GameModel, cardsProvider: CardsProvider) {
        super();

        this.scene = scene;
        this.gameModel = gameModel;
        this.gameState = gameModel.gameEngine.state;
        this.cardsProvider = cardsProvider;
        this.drawnCard = null;

        if (this.gameState.drawnCard !== null) {
            this.drawnCard = new AnimatedCard(scene, this.gameState.drawnCard, cardsProvider);
            this.drawnCard.setPosition(
                Config.mainLayer.verticalLayer.x,
                Config.mainLayer.verticalLayer.deckRow.y);
            this.drawnCard.flip(FlipSide.FaceUp, flipDuration);
        }

        gameModel.subscribe(this);
    }

    visitCardDrawnEvent(event: CardDrawnEvent) {
        if (this.drawnCard) {
            this.drawnCard.destroy();
        }
        this.drawnCard = new AnimatedCard(this.scene, event.card, this.cardsProvider);
        this.drawnCard.setPosition(
            Config.mainLayer.verticalLayer.x,
            Config.mainLayer.verticalLayer.deckRow.y);
        this.drawnCard.flip(FlipSide.FaceUp, flipDuration);
        // this.drawnCard.cancel();
        // this.drawnCard.flip(FlipSide.FaceUp, flipDuration);
    }

    visitCardPutIntoHarborEvent(event: CardPutIntoHarborEvent) {
        // if (this.drawnCard) {
        //     this.drawnCard.image.setVisible(false);
        // }
    }

    visitDrawnCardDiscardedEvent(event: DrawnCardDiscardedEvent) {
        // if (this.drawnCard) {
        //     this.drawnCard.image.setVisible(false);
        // }
    }

    popCard(): Result {
        if (!this.drawnCard) {
            return null;
        }
        const drawnCard = this.drawnCard;
        this.drawnCard = null;
        return {
            card: drawnCard,
            position: {
                x: Config.mainLayer.verticalLayer.x,
                y: Config.mainLayer.verticalLayer.deckRow.y
            }
        }
    }
}