import { PersonCard } from '../PersonCard';
import { CardVisitor } from '../CardVisitor';
import { CrewAbility } from '../CrewAbility';

export class CrewCard extends PersonCard {

    ability: CrewAbility;

    constructor(id: number, name: string, points: number, price: number, ability: CrewAbility) {
        super(id, name, points, price);

        this.ability = ability;
    }

    apply(visitor: CardVisitor): void {
        super.apply(visitor);
        visitor.visitCrewCard(this);
    }

}