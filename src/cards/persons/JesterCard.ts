import { PersonCard } from '../PersonCard';
import { CardVisitor } from '../CardVisitor';

export class JesterCard extends PersonCard {

    income: number = 1;

    constructor(id: number, name: string, imagePath: string, points: number, price: number) {
        super(id, name, imagePath, points, price);
    }

    apply(visitor: CardVisitor): void {
        super.apply(visitor);
        visitor.visitJester(this);
    }

}