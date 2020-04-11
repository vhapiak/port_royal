import {CardVisitor} from './CardVisitor';

export abstract class Card {

    id: number;
    name: string;
    imagePath: string;

    constructor(id: number, name: string, imagePath: string) {
        this.id = id;
        this.name = name;
        this.imagePath = imagePath;
    }

    abstract apply(visitor: CardVisitor): void;
}