import { CardDrawnEvent } from "./CardDrawnEvent";
import { CardPutIntoHarborEvent } from "./CardPutIntoHarbor";
import { GamePhaseChangedEvent } from "./GamePhaseChangedEvent";

export class GameEventVisitor {
    visitCardDrawnEvent(event: CardDrawnEvent): void { }
    visitCardPutIntoHarborEvent(event: CardPutIntoHarborEvent): void { }
    visitGamePhaseChangedEvent(event: GamePhaseChangedEvent) { } 
}