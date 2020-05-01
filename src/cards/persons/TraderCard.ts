import { PersonCard } from '../PersonCard';
import { CardVisitor } from '../CardVisitor';
import { ShipType } from '../ShipType';

export class TraderCard extends PersonCard {

    type: ShipType;
    income: number = 1;

    constructor(id: number, name: string, imagePath: string, points: number, price: number, type: ShipType) {
        super(id, name, imagePath, points, price);

        this.type = type;
    }

    apply(visitor: CardVisitor): void {
        super.apply(visitor);
        visitor.visitTraderCard(this);
    }

}