import { Card } from './Card'
import { CardVisitor } from './CardVisitor';

export abstract class PersonCard extends Card {

    points: number;
    price: number;

    constructor(id: number, name: string, imagePath: string, points: number, price: number) {
        super(id, name, imagePath);

        this.points = points;
        this.price = price;
    }

    apply(visitor: CardVisitor): void {
        visitor.visitPersonCard(this);
    }

}