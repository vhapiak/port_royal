/// <reference types="phaser" />

import { GameModel } from "../GameModel";
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

    constructor(image: Phaser.GameObjects.Image, card: Card, gameModel: GameModel) {
        super();

        this.card = card;
        this.gameModel = gameModel;

        this.cardImage = image;
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
        this.cardImage.destroy();
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
                this.cardImage.input.cursor = 'pointer';
            } else {
                this.cardImage.setAlpha(0.5);
                this.cardImage.input.cursor = 'default';
            }
        } else {
            this.cardImage.setAlpha(1.0);
            this.cardImage.input.cursor = 'default';
        }
    }

    private isActive(): boolean {
        let resultCode = this.gameModel.validateAction(new HireCardAction(this.card));
        return resultCode === ResultCode.Ok;
    }
}