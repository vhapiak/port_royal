import { PersonCard } from '../PersonCard';
import { CardVisitor } from '../CardVisitor';
import { ShipColor } from '../ShipColor';

export class TraderCard extends PersonCard {

    color: ShipColor;
    income: number = 1;

    constructor(id: number, name: string, imagePath: string, points: number, price: number, color: ShipColor) {
        super(id, name, imagePath, points, price);

        this.color = color;
    }

    apply(visitor: CardVisitor): void {
        super.apply(visitor);
        visitor.visitTraderCard(this);
    }

}