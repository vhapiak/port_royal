import { Card } from './Card'
import { CardVisitor } from './CardVisitor';
import { ShipColor } from './ShipColor';

export class ShipCard extends Card {

    static readonly IMMORTAL_STRENGTH: number = NaN;

    color: ShipColor;
    income: number;
    strength: number;

    constructor(id: number, name: string, imagePath: string, color: ShipColor, income: number, strength: number) {
        super(id, name, imagePath);

        this.color = color;
        this.income = income;
        this.strength = strength;
    }

    apply(visitor: CardVisitor): void {
        visitor.visitShipCard(this);
    }

}