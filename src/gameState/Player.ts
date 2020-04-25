import { PersonCard } from "../cards/PersonCard";
import { Card } from "../cards/Card";

export class Player {
    name: string;
    coins: Card[];
    persons: PersonCard[];

    constructor(name: string, coins: Card[], persons: PersonCard[]) {
        this.name = name;
        this.coins = coins;
        this.persons = persons;
    }
}