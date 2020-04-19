import { PersonCard } from "../cards/PersonCard";
import { Card } from "../cards/Card";

export class Player {
    name: string;
    coins: Card[];
    persons: PersonCard[];

    constructor(name: string) {
        this.name = name;
        this.coins = [];
        this.persons = [];
    }
}