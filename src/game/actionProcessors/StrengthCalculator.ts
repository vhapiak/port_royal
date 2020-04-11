import { CardVisitor } from "../../cards/CardVisitor";
import { PersonCard } from "../../cards/PersonCard";
import { PiratCard } from "../../cards/persons/PiratCard";

export class StrengthCalculator extends CardVisitor {

    strength: number;

    constructor(persons: PersonCard[]) {
        super();

        this.strength = 0;
        for (let person of persons) {
            person.apply(this);
        }
    }

    visitPirat(card: PiratCard): void {
        this.strength += card.strength;
    }

}