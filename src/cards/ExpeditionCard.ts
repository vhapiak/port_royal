import { Card } from './Card'
import { CardVisitor } from './CardVisitor';
import { CrewAbility } from './CrewAbility';

export class ExpeditionCard extends Card {

    income: number;
    points: number;
    abilities: CrewAbility[];

    constructor(id: number, name: string, imagePath: string, income: number, points: number, abilities: CrewAbility[]) {
        super(id, name, imagePath);

        this.income = income;
        this.points = points;
        this.abilities = abilities;
    }

    apply(visitor: CardVisitor): void {
        visitor.visitExpedition(this);
    }

}