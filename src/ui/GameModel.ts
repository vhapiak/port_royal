import { GameEngine } from "../game/GameEngine";
import { Player } from "../gameState/Player";
import { PlayerAction } from "../playerActions/PlayerAction";
import { ResultCode } from "../game/ResultCode";
import { GameEventVisitor } from "../gameEvents/GameEventVisitor";
import { AnimatedDispatcher } from "./animations/AnimatedEventsDispatcher";

export class GameModel {

    gameEngine: GameEngine;
    currentPlayer: Player;
    eventDispatcher: AnimatedDispatcher;

    constructor(gameEngine: GameEngine, currentPlayer: Player) {
        this.gameEngine = gameEngine;
        this.currentPlayer = currentPlayer;
        this.eventDispatcher = new AnimatedDispatcher();
    }

    validateAction(action: PlayerAction): ResultCode {
        return this.gameEngine.validateAction(this.currentPlayer, action);
    }

    executeAction(action: PlayerAction): void {
        if (this.eventDispatcher.isEmpty()) {
            const results = this.gameEngine.executeAction(this.currentPlayer, action);
            if (results.code !== ResultCode.Ok) {
                return console.error('Invalid action: ', results.code);
            }
            this.currentPlayer = this.gameEngine.state.activePlayer; // only for hot sit game
            this.eventDispatcher.addEvents(results.events);
            this.eventDispatcher.startDispatching();
        }
    }

    subscribe(visitor: GameEventVisitor): void {
        this.eventDispatcher.dispatcher.subscribe(visitor);
    }

    unsubscribe(visitor: GameEventVisitor): void {
        this.eventDispatcher.dispatcher.unsubscribe(visitor);
    }

}