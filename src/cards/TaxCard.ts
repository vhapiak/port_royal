import { Card } from './Card'
import { CardVisitor } from './CardVisitor';

export enum BonusType {
    MaxStrength,
    MinPoints,
} 

export class TaxCard extends Card {

    bonus: BonusType;
    threshold: number = 12;

    constructor(id: number, name: string, bonus: BonusType) {
        super(id, name);

        this.bonus = bonus;
    }

    apply(visitor: CardVisitor): void {
        visitor.visitTaxCard(this);
    }

}