import { GameEventVisitor } from "./GameEventVisitor";
import { GameEvent } from "./GameEvent";

export class GameEventsDispatcher {

    visitors: GameEventVisitor[] = [];

    subscribe(visitor: GameEventVisitor): void {
        this.visitors.push(visitor);
    }

    unsubscribe(visitor: GameEventVisitor): void {
        const index = this.visitors.indexOf(visitor);
        if (index >= 0) {
            this.visitors.splice(index, 1);
        }
    }

    dispatch(event: GameEvent): void {
        this.visitors.forEach(visitor => {
            event.apply(visitor);
        });
    }

}