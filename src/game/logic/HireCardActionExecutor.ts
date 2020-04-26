import { GameActionsExecutor } from "../GameActionsExecutor";
import { CardVisitor } from "../../cards/CardVisitor";
import { ShipCard } from "../../cards/ShipCard";
import { PersonCard } from "../../cards/PersonCard";
import { ResultCode } from "../ResultCode";
import { TraderBonusCalculator } from "./calculators/TraderBonusCalculator";
import { HireDiscountCalculator } from "./calculators/HireDiscountCalculator";

export class HireCardActionExecutor extends CardVisitor {

    executor: GameActionsExecutor;
    result: ResultCode;

    constructor(executor: GameActionsExecutor) {
        super();

        this.executor = executor;
        this.result = ResultCode.WrongCardType;
    }

    visitShipCard(ship: ShipCard): void {
        this.result = this.processShip(ship);
    }

    visitPersonCard(person: PersonCard) {
        this.result = this.processPerson(person);
    }

    private processShip(ship: ShipCard): ResultCode {
        const gameState = this.executor.gameState;
        const activePlayer = gameState.activePlayer;
        const traderBonusCalculator = new TraderBonusCalculator(activePlayer.persons, ship.color);
        this.executor.giveCoins(activePlayer, ship.income + traderBonusCalculator.income);
        this.executor.discardHarborCard(ship);
        return ResultCode.Ok;
    }

    private processPerson(person: PersonCard): ResultCode {
        const gameState = this.executor.gameState;
        const activePlayer = gameState.activePlayer;
        const discountCalculator = new HireDiscountCalculator(activePlayer.persons);
        const finalPrice = Math.max(person.price - discountCalculator.discount, 0);
        if (activePlayer.coins.length < finalPrice) {
            return ResultCode.NotEnoughCoins;
        } 

        this.executor.spendCoins(activePlayer, finalPrice);
        this.executor.hirePerson(activePlayer, person);

        return ResultCode.Ok;
    }

}