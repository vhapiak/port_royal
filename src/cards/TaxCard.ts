import { Card } from './Card'
import { CardVisitor } from './CardVisitor';

export enum BonusType {
    MaxStrength,
    MinPoints,
} 

export class TaxCard extends Card {

    bonus: BonusType;
    threshold: number = 12;

    constructor(id: number, name: string, imagePath: string, bonus: BonusType) {
        super(id, name, imagePath);

        this.bonus = bonus;
    }

    apply(visitor: CardVisitor): void {
        visitor.visitTaxCard(this);
    }

}