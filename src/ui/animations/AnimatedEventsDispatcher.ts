import { GameEvent } from "../../gameEvents/GameEvent";
import { GameEventsDispatcher } from "../../gameEvents/GameEventsDispatcher";
import { EventsDelays } from "./EventsDelays";

export class AnimatedDispatcher {

    eventsQueue: GameEvent[];
    dispatcher: GameEventsDispatcher;
    delays: EventsDelays;

    constructor() {
        this.eventsQueue = [];
        this.dispatcher = new GameEventsDispatcher();
        this.delays = new EventsDelays();
    }

    addEvents(events: GameEvent[]): void {
        this.eventsQueue.push.apply(this.eventsQueue, events);
    }

    startDispatching(): void {
        this.dispatchNext();
    }

    dispatchNext(): void {
        const event = this.eventsQueue.shift();
        this.dispatcher.dispatch(event);

        if (this.isEmpty()) {
            return;
        }

        const delay = event.apply(this.delays);
        if (delay === 0) {
            this.dispatchNext();
        } else {
            setTimeout(AnimatedDispatcher.prototype.dispatchNext.bind(this), delay);
        }
    }

    isEmpty(): boolean {
        return this.eventsQueue.length === 0;
    }

}