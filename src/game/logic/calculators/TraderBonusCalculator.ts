import { CardVisitor } from "../../../cards/CardVisitor";
import { PersonCard } from "../../../cards/PersonCard";
import { TraderCard } from "../../../cards/persons/TraderCard";
import { ShipType } from "../../../cards/ShipType";

export class TraderBonusCalculator extends CardVisitor {

    type: ShipType;
    income: number;

    constructor(persons: PersonCard[], type: ShipType) {
        super();

        this.type = type;
        this.income = 0;
        for (let person of persons) {
            person.apply(this);
        }
    }

    visitTraderCard(card: TraderCard): void {
        if (card.type === this.type) {
            this.income += card.income;
        }
    }

}