import { GameStateManager } from "./GameStateManager";
import { CardVisitor } from "../../cards/CardVisitor";
import { ShipCard } from "../../cards/ShipCard";
import { PersonCard } from "../../cards/PersonCard";
import { ResultCode } from "../ResultCode";
import { TraderBonusCalculator } from "./TraderBonusCalculator";
import { HireDiscountCalculator } from "./HireDiscountCalculator";

export class HireCardActionExecutor extends CardVisitor {

    manager: GameStateManager;
    result: ResultCode;

    constructor(manager: GameStateManager) {
        super();

        this.manager = manager;
        this.result = ResultCode.WrongCardType;
    }

    visitShipCard(ship: ShipCard): void {
        this.result = this.processShip(ship);
    }

    visitPersonCard(person: PersonCard) {
        this.result = this.processPerson(person);
    }

    private processShip(ship: ShipCard): ResultCode {
        const gameState = this.manager.gameState;
        const activePlayer = gameState.activePlayer;
        const traderBonusCalculator = new TraderBonusCalculator(activePlayer.persons, ship.color);
        this.manager.addCoins(activePlayer, ship.income + traderBonusCalculator.income);
        this.manager.discardHarborCard(ship);
        return ResultCode.Ok;
    }

    private processPerson(person: PersonCard): ResultCode {
        const gameState = this.manager.gameState;
        const activePlayer = gameState.activePlayer;
        const discountCalculator = new HireDiscountCalculator(activePlayer.persons);
        const finalPrice = Math.max(person.price - discountCalculator.discount, 0);
        if (activePlayer.coins.length < finalPrice) {
            return ResultCode.NotEnoughCoins;
        } 

        this.manager.spendCoins(activePlayer, finalPrice);
        this.manager.hirePerson(activePlayer, person);

        return ResultCode.Ok;
    }

}