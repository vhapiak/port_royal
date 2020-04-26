import { GameEngine } from "../game/GameEngine";
import { Player } from "../gameState/Player";
import { PlayerAction } from "../playerActions/PlayerAction";
import { ResultCode } from "../game/ResultCode";
import { GameEventsDispatcher } from "../gameEvents/GameEventsDispatcher";
import { GameEventVisitor } from "../gameEvents/GameEventVisitor";

export class GameModel {

    gameEngine: GameEngine;
    currentPlayer: Player;
    eventDispatcher: GameEventsDispatcher;

    constructor(gameEngine: GameEngine, currentPlayer: Player) {
        this.gameEngine = gameEngine;
        this.currentPlayer = currentPlayer;
        this.eventDispatcher = new GameEventsDispatcher();
    }

    validateAction(action: PlayerAction): ResultCode {
        return this.gameEngine.validateAction(this.currentPlayer, action);
    }

    executeAction(action: PlayerAction): void {
        const results = this.gameEngine.executeAction(this.currentPlayer, action);
        if (results.code !== ResultCode.Ok) {
            return console.error('Invalid action: ', results.code);
        }
        this.currentPlayer = this.gameEngine.state.activePlayer; // only for hot sit game
        results.events.forEach(event => {
            this.eventDispatcher.dispatch(event);
        });
    }

    subscribe(visitor: GameEventVisitor): void {
        this.eventDispatcher.subscribe(visitor);
    }

}