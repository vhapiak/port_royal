import { CardDrawnEvent } from "./CardDrawnEvent";
import { CardPutIntoHarborEvent } from "./CardPutIntoHarbor";
import { GamePhaseChangedEvent } from "./GamePhaseChangedEvent";
import { HarborDiscardedEvent } from "./HarborDiscardedEvent";

export class GameEventVisitor {
    visitCardDrawnEvent(event: CardDrawnEvent): void { }
    visitCardPutIntoHarborEvent(event: CardPutIntoHarborEvent): void { }
    visitGamePhaseChangedEvent(event: GamePhaseChangedEvent) { } 
    visitHarborDiscardedEvent(event: HarborDiscardedEvent) { }
}