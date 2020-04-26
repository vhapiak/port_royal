/// <reference types="phaser" />

import { GameModel } from "../GameModel";
import { DrawCardAction } from "../../playerActions/DrawCardAction";
import { ResultCode } from "../../game/ResultCode";
import { GameEventVisitor } from "../../gameEvents/GameEventVisitor";
import { GamePhaseChangedEvent } from "../../gameEvents/GamePhaseChangedEvent";
import { Card } from "../../cards/Card";
import { ActivePlayerChangedEvent } from "../../gameEvents/ActivePlayerChangedEvent";
import { PersonHiredEvent } from "../../gameEvents/PersonHiredEvent";
import { CoinsGivenEvent } from "../../gameEvents/CoinsGivenEvent";
import { HireCardAction } from "../../playerActions/HireCardAction";
import { GamePhase } from "../../gameState/GamePhase";

export class HarborCardView extends GameEventVisitor {

    card: Card;
    gameModel: GameModel;
    cardImage: Phaser.GameObjects.Image;

    constructor(x: number, y: number, card: Card, scene: Phaser.Scene, gameModel: GameModel) {
        super();

        this.card = card;
        this.gameModel = gameModel;

        this.cardImage = scene.add.image(x, y, card.imagePath);

        this.cardImage.setInteractive().on('pointerup', HarborCardView.prototype.onClick, this);

        gameModel.subscribe(this);
        this.updateState();
    }

    visitGamePhaseChangedEvent(event: GamePhaseChangedEvent) {
        this.updateState();
    }

    visitActivePlayerChangedEvent(event: ActivePlayerChangedEvent) {
        this.updateState();
    }

    visitPersonHiredEvent(event: PersonHiredEvent) {
        this.updateState();
    }

    visitCoinsGivenEvent(event: CoinsGivenEvent) {
        this.updateState();
    }

    destroy(): void {
        this.gameModel.unsubscribe(this);
        this.cardImage.destroy(true);
    }

    private onClick(): void {
        if (this.isActive()) {
            // @todo wait response
            this.gameModel.executeAction(new HireCardAction(this.card));
        }
    }

    private updateState(): void {
        if (this.gameModel.gameEngine.state.phase === GamePhase.Hiring) {
            if (this.isActive()) {
                this.cardImage.setAlpha(1.0);
            } else {
                this.cardImage.setAlpha(0.5);
            }
        } else {
            this.cardImage.setAlpha(1.0);
        }
    }

    private isActive(): boolean {
        let resultCode = this.gameModel.validateAction(new HireCardAction(this.card));
        return resultCode === ResultCode.Ok;
    }
}