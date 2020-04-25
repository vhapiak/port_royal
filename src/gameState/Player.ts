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

    addCoin(coin: Card): void {
        this.coins.push(coin);
    }

    removeCoin(): Card {
        // @todo assert coins not empty
        return this.coins.pop();
    }

    addPerson(person: PersonCard): void {
        this.persons.push(person);
    }
}