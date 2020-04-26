import { CardVisitor } from "../../../cards/CardVisitor";
import { PersonCard } from "../../../cards/PersonCard";
import { TraderCard } from "../../../cards/persons/TraderCard";
import { ShipColor } from "../../../cards/ShipColor";

export class TraderBonusCalculator extends CardVisitor {

    color: ShipColor;
    income: number;

    constructor(persons: PersonCard[], color: ShipColor) {
        super();

        this.color = color;
        this.income = 0;
        for (let person of persons) {
            person.apply(this);
        }
    }

    visitTraderCard(card: TraderCard): void {
        if (card.color === this.color) {
            this.income += card.income;
        }
    }

}