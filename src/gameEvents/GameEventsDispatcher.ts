import { GameEventVisitor } from "./GameEventVisitor";
import { GameEvent } from "./GameEvent";

export class GameEventsDispatcher {

    visitors: GameEventVisitor[] = [];

    subscribe(visitor: GameEventVisitor): void {
        this.visitors.push(visitor);
    }

    dispatch(event: GameEvent): void {
        this.visitors.forEach(visitor => {
            event.apply(visitor);
        });
    }

}