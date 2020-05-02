import {CardVisitor} from './CardVisitor';

export abstract class Card {

    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    abstract apply(visitor: CardVisitor): void;
}