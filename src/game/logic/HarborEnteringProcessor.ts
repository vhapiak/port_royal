import { CardVisitor } from "../../cards/CardVisitor";
import { GameActionsExecutor } from "../GameActionsExecutor";
import { TaxCard, BonusType } from "../../cards/TaxCard";
import { ExpeditionCard } from "../../cards/ExpeditionCard";
import { GameState } from "../../gameState/GameState";
import { StrengthCalculator } from "./calculators/StrengthCalculator";
import { PointsCalculator } from "./calculators/PointsCalculator";

export class HarborEnteringProcessor extends CardVisitor {

    executor: GameActionsExecutor;
    gameState: GameState;

    constructor(executor: GameActionsExecutor, gameState: GameState) {
        super();

        this.executor = executor;
        this.gameState = gameState;
    }

    visitTaxCard(card: TaxCard): void {
        this.gameState.players.forEach(player => {
            if (player.coins.length >= card.threshold) {
                const tax = Math.floor(player.coins.length / 2);
                this.executor.spendCoins(player, tax);
            }
        });

        if (card.bonusType == BonusType.MaxStrength) {
            this.payBonusForMaxStrength(card);
        } else if (card.bonusType == BonusType.MinPoints) {
            this.payBonusForMinCoins(card);
        }
    }

    visitExpeditionCard(expedition: ExpeditionCard) {
        // @todo implement expedition logic
    }

    private payBonusForMaxStrength(card: TaxCard) {
        let maxStrength = 0;
        this.gameState.players.forEach(player => {
            const calculator = new StrengthCalculator(player.persons);
            maxStrength = Math.max(maxStrength, calculator.strength);
        });

        this.gameState.players.forEach(player => {
            const calculator = new StrengthCalculator(player.persons);
            if (maxStrength === calculator.strength) {
                this.executor.giveCoins(player, card.bonus);
            }
        });
    }

    private payBonusForMinCoins(card: TaxCard) {
        let minPoints = Infinity;
        this.gameState.players.forEach(player => {
            const calculator = new PointsCalculator(player);
            minPoints = Math.min(minPoints, calculator.points);
        });

        this.gameState.players.forEach(player => {
            const calculator = new PointsCalculator(player);
            if (minPoints === calculator.points) {
                this.executor.giveCoins(player, card.bonus);
            }
        });
    }

}