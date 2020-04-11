import { PersonCard } from '../PersonCard';
import { CardVisitor } from '../CardVisitor';

export class PiratCard extends PersonCard {

    strength: number;

    constructor(id: number, name: string, imagePath: string, points: number, price: number, strength: number) {
        super(id, name, imagePath, points, price);

        this.strength = strength;
    }

    apply(visitor: CardVisitor): void {
        super.apply(visitor);
        visitor.visitPirat(this);
    }

}