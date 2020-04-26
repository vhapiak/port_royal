import { Player } from "../gameState/Player";
import { PlayerActionVisitor } from "../playerActions/PlayerActionVisitor";
import { DrawCardAction } from "../playerActions/DrawCardAction";
import { ResultCode } from "./ResultCode";
// import { GameStateManager } from "./actionProcessors/GameStateManager";
// import { ShipStrengthChecker } from "./actionProcessors/ShipStrengthChecker";
// import { DiscardShipAction } from "../playerActions/DiscardShipAction";
// import { PutShipIntoHarborAction } from "../playerActions/PutShipIntoHarborAction";
// import { SameShipsInHarborChecker } from "./actionProcessors/SameShipsInHarborChecker";
// import { StopDiscoveringAction } from "../playerActions/StopDiscoveringAction";
// import { CaptainCard } from "../cards/persons/CaptainCard";
// import { CaptainBonusCalculator } from "./actionProcessors/CaptainBonusCalculator";
// import { RogueCard } from "../cards/persons/RogueCard";
// import { RogueBonusCalculator } from "./actionProcessors/RogueBonusCalculator";
// import { StopHiringAction } from "../playerActions/StopHiringAction";
// import { HireCardAction } from "../playerActions/HireCardAction";
// import { HireCardActionExecutor } from "./actionProcessors/HireCardActionExecutor";
// import { DifferentShipsCalculator } from "./actionProcessors/DifferentShipsCalculator";
// import { HireBonusCalculator } from "./actionProcessors/HireBonusCalculator";
import { GameActionsExecutor } from "./actionExecutors/GameActionsExecutor";
import { GameState } from "../gameState/GameState";
import { GamePhase } from "../gameState/GamePhase";
import { drawCard } from "./logic/drawCard";
import { putDrawnCardIntoHarbor } from "./logic/putCardIntoHarbor";
import { PutShipIntoHarborAction } from "../playerActions/PutShipIntoHarborAction";
import { DiscardShipAction } from "../playerActions/DiscardShipAction";
import { discardDrawnCard } from "./logic/discardDrawnCard";
import { StopDiscoveringAction } from "../playerActions/StopDiscoveringAction";
import { startHiring } from "./logic/startHiring";
import { StopHiringAction } from "../playerActions/StopHiringAction";
import { stopHiring } from "./logic/stopHiring";

export class PlayerActionsExecutor extends PlayerActionVisitor<ResultCode> {

    private executor: GameActionsExecutor;
    private gameState: GameState;
    private sourcePlayer: Player;

    constructor(executor: GameActionsExecutor, gameState: GameState, sourcePlayer: Player) {
        super(ResultCode.UnknownError);

        this.executor = executor;
        this.gameState = gameState;
        this.sourcePlayer = sourcePlayer;
    }

    visitDrawCardAction(action: DrawCardAction): ResultCode {
        if (this.gameState.phase !== GamePhase.Discovering) {
            return ResultCode.WrongPhase;
        }
        if (this.gameState.activePlayer !== this.sourcePlayer) {
            return ResultCode.NotActivePlayer;
        }

        return drawCard(this.executor, this.gameState);
    }

    visitStopDiscoveringAction(action: StopDiscoveringAction): ResultCode {
        if (this.gameState.phase !== GamePhase.Discovering) {
            return ResultCode.WrongPhase;
        }
        if (this.gameState.activePlayer !== this.sourcePlayer) {
            return ResultCode.NotActivePlayer;
        }

        return startHiring(this.executor, this.gameState);
    }

    visitDiscardShipAction(action: DiscardShipAction): ResultCode {
        if (this.gameState.phase !== GamePhase.DiscardingShip) {
            return ResultCode.WrongPhase;
        }
        if (this.gameState.activePlayer !== this.sourcePlayer) {
            return ResultCode.NotActivePlayer;
        }

        return discardDrawnCard(this.executor, this.gameState);
    }

    visitPutShipIntoHarborAction(action: PutShipIntoHarborAction): ResultCode {
        if (this.gameState.phase !== GamePhase.DiscardingShip) {
            return ResultCode.WrongPhase;
        }
        if (this.gameState.activePlayer !== this.sourcePlayer) {
            return ResultCode.NotActivePlayer;
        }

        return putDrawnCardIntoHarbor(this.executor, this.gameState);
    }

    visitStopHiringAction(action: StopHiringAction): ResultCode {
        if (this.gameState.phase !== GamePhase.Hiring) {
            return ResultCode.WrongPhase;
        }
        if (this.gameState.activePlayer !== this.sourcePlayer) {
            return ResultCode.NotActivePlayer;
        }

        return stopHiring(this.executor, this.gameState);
    }

    // visitHireCardAction(action: HireCardAction): ResultCode {
    //     return this.executeHireCardAction(action);
    // }

    // private executeDrawCardAction(action: DrawCardAction): ResultCode {
    //     let manager = this.gameStateManager;

    //     let drawnCard = manager.drawCard();
    //     // @todo check that card isn't null

    //     let shipStrengthChecker = new ShipStrengthChecker(this.sourcePlayer);
    //     drawnCard.apply(shipStrengthChecker);
    //     if (shipStrengthChecker.isCardDiscardable) {
    //         manager.waitDiscardDecision();
    //     } else {
    //         this.putDrawnCardIntoHarbor();
    //     }
    //     return ResultCode.Ok;
    // }

    // private executeDiscardShipAction(): ResultCode {
    //     let manager = this.gameStateManager;
    //     manager.discardDrawnCard();
    //     manager.continueDiscovering();
    //     return ResultCode.Ok;
    // }

    // private executePutShipIntoHarborAction(): ResultCode {
    //     this.putDrawnCardIntoHarbor();
    //     return ResultCode.Ok;
    // }

    // private executeStopDiscoveringAction(): ResultCode {
    //     this.startHiring();
    //     return ResultCode.Ok;
    // }

    // private executeStopHiringAction(): ResultCode {
    //     const manager = this.gameStateManager;
    //     const gameState = manager.gameState;
    //     const nextPlayer = this.nextPlayer(gameState.activePlayer);
    //     if (nextPlayer == gameState.turnPlayer) {
    //         this.newTurn();
    //     } else {
    //         manager.changeActivePlayer(nextPlayer);
    //         this.startActivePlayerHiring();
    //     }
    //     return ResultCode.Ok;
    // }

    // private executeHireCardAction(action: HireCardAction): ResultCode {
    //     const gameState = this.gameStateManager.gameState;
    //     const activePlayer = gameState.activePlayer;
    //     const turnPlayer = gameState.turnPlayer;

    //     const possibleHires = turnPlayer == activePlayer ? gameState.possibleHires : 1;
    //     const hiresBonus = new HireBonusCalculator(activePlayer.persons);

    //     if (gameState.numberOfHires >= possibleHires + hiresBonus.bonus) {
    //         return ResultCode.ExceedNumberOfHires;
    //     }

    //     let executor = new HireCardActionExecutor(this.gameStateManager);
    //     action.card.apply(executor);

    //     if (executor.result !== ResultCode.Ok) {
    //         return executor.result;
    //     }

    //     if (turnPlayer !== activePlayer) {
    //         if (activePlayer.coins.length === 0) {
    //             return ResultCode.NotEnoughCoins;
    //         }
    //         const hireFee = 1;
    //         this.gameStateManager.payCoins(activePlayer, turnPlayer, hireFee);
    //     }
    //     this.gameStateManager.increaseNumberOfHires();
    //     // @todo pass turn if player has no actions

    //     return ResultCode.Ok;
    // }

    // private putDrawnCardIntoHarbor() {
    //     let manager = this.gameStateManager;
    //     manager.putDrawnCardIntoHarbor();

    //     let sameShipsChecker = new SameShipsInHarborChecker(manager.gameState.harbor.cards);
    //     if (sameShipsChecker.hasSameShips) {
    //         manager.discardHarbor();
    //         this.startHiring();
    //     } else {
    //         manager.continueDiscovering();
    //     }
    // }

    // private startHiring(): void {
    //     let manager = this.gameStateManager;
    //     const differentShipsCalculator = new DifferentShipsCalculator(manager.gameState.harbor.cards);
    //     const possibleHires = this.calcPossibleHires(differentShipsCalculator.number);
    //     manager.startHiring(possibleHires);
    //     this.startActivePlayerHiring();
    // }

    // private startActivePlayerHiring(): void {
    //     this.calcStartHiringPlayerBonuses();
    //     this.gameStateManager.resetNumberOfHires();
    //     // @todo pass turn if player has no actions
    // }

    // private calcStartHiringPlayerBonuses(): void {
    //     let manager = this.gameStateManager;
    //     const size = manager.gameState.harbor.size();
    //     const activePlayer = manager.gameState.activePlayer;
    //     if (size >= CaptainCard.THRESHOLD) {
    //         const captainBonusCalculator = new CaptainBonusCalculator(activePlayer.persons);
    //         manager.addCoins(activePlayer, captainBonusCalculator.income);
    //     } else if (size <= RogueCard.THRESHOLD) {
    //         const rogueBonusCalculator = new RogueBonusCalculator(activePlayer.persons);
    //         manager.addCoins(activePlayer, rogueBonusCalculator.income);
    //     }
    // }

    // private newTurn() {
    //     // @todo detect game end
    //     let manager = this.gameStateManager;
    //     const gameState = manager.gameState;
    //     const nextPlayer = this.nextPlayer(gameState.turnPlayer);
    //     manager.changeTurnPlayer(nextPlayer);
    //     manager.startDiscovering();
    // }

    // private nextPlayer(player: Player): Player {
    //     const gameState = this.gameStateManager.gameState;
    //     const currentPlayerIdx = gameState.players.indexOf(player);
    //     // @todo assert currentPlayerIdx !== -1
    //     const nextIdx = (currentPlayerIdx + 1) % gameState.players.length;
    //     return gameState.players[nextIdx];
    // }

    // private calcPossibleHires(differentShips: number): number {
    //     if (differentShips >= 5) {
    //         return 3;
    //     }
    //     if (differentShips == 4) {
    //         return 2;
    //     }
    //     return 1;
    // }


}