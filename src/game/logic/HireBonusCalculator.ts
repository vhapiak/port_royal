import { CardVisitor } from "../../cards/CardVisitor";
import { PersonCard } from "../../cards/PersonCard";
import { GovernorCard } from "../../cards/persons/GovernorCard";

export class HireBonusCalculator extends CardVisitor {

    bonus: number;

    constructor(persons: PersonCard[]) {
        super();

        this.bonus = 0;
        for (let person of persons) {
            person.apply(this);
        }
    }

    visitGovernorCard(card: GovernorCard): void {
        this.bonus += card.bonus;
    }

}