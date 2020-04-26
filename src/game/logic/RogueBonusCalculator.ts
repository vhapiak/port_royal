import { CardVisitor } from "../../cards/CardVisitor";
import { PersonCard } from "../../cards/PersonCard";
import { RogueCard } from "../../cards/persons/RogueCard";

export class RogueBonusCalculator extends CardVisitor {

    income: number;

    constructor(persons: PersonCard[]) {
        super();

        this.income = 0;
        for (let person of persons) {
            person.apply(this);
        }
    }

    visitRogueCard(card: RogueCard): void {
        this.income += card.income;
    }

}