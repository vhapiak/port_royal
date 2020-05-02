import { PersonCard } from '../PersonCard';
import { CardVisitor } from '../CardVisitor';

export class RogueCard extends PersonCard {

    static readonly THRESHOLD: number = 0;

    income: number = 1;

    constructor(id: number, name: string, points: number, price: number) {
        super(id, name, points, price);
    }

    apply(visitor: CardVisitor): void {
        super.apply(visitor);
        visitor.visitRogueCard(this);
    }

}