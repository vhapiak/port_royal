import { PersonCard } from '../PersonCard';
import { CardVisitor } from '../CardVisitor';

export class MademoiselleCard extends PersonCard {

    discount: number = 1;

    constructor(id: number, name: string, imagePath: string, points: number, price: number) {
        super(id, name, imagePath, points, price);
    }

    apply(visitor: CardVisitor): void {
        super.apply(visitor);
        visitor.visitMademoiselle(this);
    }

}