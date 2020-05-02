import { PersonCard } from '../PersonCard';
import { CardVisitor } from '../CardVisitor';

export class PirateCard extends PersonCard {

    strength: number;

    constructor(id: number, name: string, points: number, price: number, strength: number) {
        super(id, name, points, price);

        this.strength = strength;
    }

    apply(visitor: CardVisitor): void {
        super.apply(visitor);
        visitor.visitPirateCard(this);
    }

}