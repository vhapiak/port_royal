import { CardDrawnEvent } from "./CardDrawnEvent";
import { CardPutIntoHarborEvent } from "./CardPutIntoHarborEvent";
import { GamePhaseChangedEvent } from "./GamePhaseChangedEvent";
import { HarborDiscardedEvent } from "./HarborDiscardedEvent";
import { DrawnCardDiscardedEvent } from "./DrawnCardDiscarded";

export class GameEventVisitor {
    visitCardDrawnEvent(event: CardDrawnEvent): void { }
    visitCardPutIntoHarborEvent(event: CardPutIntoHarborEvent): void { }
    visitGamePhaseChangedEvent(event: GamePhaseChangedEvent) { } 
    visitHarborDiscardedEvent(event: HarborDiscardedEvent) { }
    visitDrawnCardDiscardedEvent(event: DrawnCardDiscardedEvent) { }
}