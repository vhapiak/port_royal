import { Card } from './Card'
import { CardVisitor } from './CardVisitor';

export abstract class PersonCard extends Card {

    points: number;
    price: number;

    constructor(id: number, name: string, points: number, price: number) {
        super(id, name);

        this.points = points;
        this.price = price;
    }

    apply(visitor: CardVisitor): void {
        visitor.visitPersonCard(this);
    }

}