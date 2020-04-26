import { CardVisitor } from "../../cards/CardVisitor";
import { PersonCard } from "../../cards/PersonCard";
import { CaptainCard } from "../../cards/persons/CaptainCard";

export class CaptainBonusCalculator extends CardVisitor {

    income: number;

    constructor(persons: PersonCard[]) {
        super();

        this.income = 0;
        for (let person of persons) {
            person.apply(this);
        }
    }

    visitCaptainCard(card: CaptainCard): void {
        this.income += card.income;
    }

}