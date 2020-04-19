import { CardDrawnEvent } from "./CardDrawnEvent";
import { CardPutIntoHarborEvent } from "./CardPutIntoHarbor";

export class GameEventVisitor {
    visitCardDrawnEvent(event: CardDrawnEvent): void { }
    visitCardPutIntoHarborEvent(event: CardPutIntoHarborEvent): void { }
}