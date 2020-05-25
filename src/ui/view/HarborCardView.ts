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
import { AnimatedCard } from "../animations/AnimatedCard";

export class HarborCardView extends GameEventVisitor {

    card: AnimatedCard;
    gameModel: GameModel;

    constructor(card: AnimatedCard, gameModel: GameModel) {
        super();

        this.card = card;
        this.gameModel = gameModel;

        card.image.setInteractive().on('pointerup', HarborCardView.prototype.onClick, this);

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
        // this.gameModel.unsubscribe(this);
        // this.cardImage.destroy();
    }

    private onClick(): void {
        if (this.isActive()) {
            // @todo wait response
            this.gameModel.executeAction(new HireCardAction(this.card.card));
        }
    }

    private updateState(): void {
        if (this.gameModel.gameEngine.state.phase === GamePhase.Hiring) {
            if (this.isActive()) {
                this.card.image.setAlpha(1.0);
                this.card.image.input.cursor = 'pointer';
            } else {
                this.card.image.setAlpha(0.5);
                this.card.image.input.cursor = 'default';
            }
        } else {
            this.card.image.setAlpha(1.0);
            this.card.image.input.cursor = 'default';
        }
    }

    private isActive(): boolean {
        let resultCode = this.gameModel.validateAction(new HireCardAction(this.card.card));
        return resultCode === ResultCode.Ok;
    }
}