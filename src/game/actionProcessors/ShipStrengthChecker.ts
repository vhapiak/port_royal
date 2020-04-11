import { CardVisitor } from "../../cards/CardVisitor";
import { Player } from "../../gameState/Player";
import { ShipCard } from "../../cards/ShipCard";
import { StrengthCalculator } from "./StrengthCalculator";

export class ShipStrengthChecker extends CardVisitor {

    private player: Player;

    isCardDiscardable: boolean;

    constructor(player: Player) {
        super();

        this.player = player;
        this.isCardDiscardable = false;
    }

    visitShip(card: ShipCard): void {
        let strengthCalculator = new StrengthCalculator(this.player.persons);
        this.isCardDiscardable = 
            card.strength !== ShipCard.IMMORTAL_STRENGTH &&
            card.strength <= strengthCalculator.strength;
    }

}