import { GameEvent } from "./GameEvent";
import { GameEventVisitor } from "./GameEventVisitor";
import { Player } from "../gameState/Player";
import { PersonCard } from "../cards/PersonCard";

export class PersonHiredEvent implements GameEvent {

    player: Player
    person: PersonCard;

    constructor(player: Player, person: PersonCard) {
        this.player = player;
        this.person = person;
    }

    apply<Result>(visitor: GameEventVisitor<Result>): Result {
        return visitor.visitPersonHiredEvent(this);
    }
}