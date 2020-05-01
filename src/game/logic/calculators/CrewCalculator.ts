import { CardVisitor } from "../../../cards/CardVisitor";
import { PersonCard } from "../../../cards/PersonCard";
import { CrewAbility } from "../../../cards/CrewAbility";
import { CrewCard } from "../../../cards/persons/CrewCard";

export class CrewCalculator extends CardVisitor {

    ability: CrewAbility;
    total: number;

    constructor(persons: PersonCard[], ability: CrewAbility) {
        super();

        this.ability = ability;
        this.total = 0;
        for (let person of persons) {
            person.apply(this);
        }
    }

    visitCrewCard(card: CrewCard): void {
        if (card.ability === this.ability) {
            this.total++;
        }
    }

}