import { CardVisitor } from "../../cards/CardVisitor";
import { PersonCard } from "../../cards/PersonCard";
import { CourtesanCard } from "../../cards/persons/CourtesanCard";

export class HireDiscountCalculator extends CardVisitor {

    discount: number;

    constructor(persons: PersonCard[]) {
        super();

        this.discount = 0;
        for (let person of persons) {
            person.apply(this);
        }
    }

    visitCourtesanCard(card: CourtesanCard): void {
        this.discount += card.discount;
    }

}