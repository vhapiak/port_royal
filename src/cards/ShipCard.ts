import { Card } from './Card'
import { CardVisitor } from './CardVisitor';
import { ShipType } from './ShipType';

export class ShipCard extends Card {

    static readonly IMMORTAL_STRENGTH: number = NaN;

    type: ShipType;
    income: number;
    strength: number;

    constructor(id: number, name: string, imagePath: string, type: ShipType, income: number, strength: number) {
        super(id, name, imagePath);

        this.type = type;
        this.income = income;
        this.strength = strength;
    }

    apply(visitor: CardVisitor): void {
        visitor.visitShipCard(this);
    }

}