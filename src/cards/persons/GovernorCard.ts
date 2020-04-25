import { PersonCard } from '../PersonCard';
import { CardVisitor } from '../CardVisitor';

export class GovernorCard extends PersonCard {

    bonus: number = 1;

    constructor(id: number, name: string, imagePath: string, points: number, price: number) {
        super(id, name, imagePath, points, price);
    }

    apply(visitor: CardVisitor): void {
        super.apply(visitor);
        visitor.visitGovernorCard(this);
    }

}