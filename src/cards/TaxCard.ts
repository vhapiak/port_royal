import { Card } from './Card'
import { CardVisitor } from './CardVisitor';

export enum BonusType {
    MaxStrength,
    MinPoints,
} 

export class TaxCard extends Card {

    bonusType: BonusType;
    bonus: number = 1;
    threshold: number = 12;

    constructor(id: number, name: string, bonus: BonusType) {
        super(id, name);

        this.bonusType = bonus;
    }

    apply(visitor: CardVisitor): void {
        visitor.visitTaxCard(this);
    }

}