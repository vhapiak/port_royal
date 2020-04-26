import { CardVisitor } from "../../../cards/CardVisitor";
import { PersonCard } from "../../../cards/PersonCard";
import { PirateCard } from "../../../cards/persons/PirateCard";

export class StrengthCalculator extends CardVisitor {

    strength: number;

    constructor(persons: PersonCard[]) {
        super();

        this.strength = 0;
        for (let person of persons) {
            person.apply(this);
        }
    }

    visitPirateCard(card: PirateCard): void {
        this.strength += card.strength;
    }

}