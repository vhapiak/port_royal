import { CardDrawnEvent } from "./CardDrawnEvent";
import { CardPutIntoHarborEvent } from "./CardPutIntoHarborEvent";
import { GamePhaseChangedEvent } from "./GamePhaseChangedEvent";
import { HarborDiscardedEvent } from "./HarborDiscardedEvent";
import { DrawnCardDiscardedEvent } from "./DrawnCardDiscarded";
import { TurnPlayerChangedEvent } from "./TurnPlayerChangedEvent";
import { PossibleHiresChangedEvent } from "./PossibleHiresChangedEvent";
import { PersonHiredEvent } from "./PersonHiredEvent";
import { NumberOfHiresChangedEvent } from "./NumberOfHiresChangedEvent";
import { HarborCardDiscardedEvent } from "./HarborCardDiscardedEvent";
import { FeePaidEvent } from "./FeePaidEvent";
import { CoinsSpentEvent } from "./CoinsSpentEvent";
import { CoinsGivenEvent } from "./CoinsGivenEvent";
import { ActivePlayerChangedEvent } from "./ActivePlayerChangedEvent";

export class GameEventVisitor {
    visitCardDrawnEvent(event: CardDrawnEvent): void { }
    visitCardPutIntoHarborEvent(event: CardPutIntoHarborEvent): void { }
    visitGamePhaseChangedEvent(event: GamePhaseChangedEvent) { }
    visitHarborDiscardedEvent(event: HarborDiscardedEvent) { }
    visitDrawnCardDiscardedEvent(event: DrawnCardDiscardedEvent) { }
    visitTurnPlayerChangedEvent(event: TurnPlayerChangedEvent) { }
    visitPossibleHiresChangedEvent(event: PossibleHiresChangedEvent) { }
    visitPersonHiredEvent(event: PersonHiredEvent) { }
    visitNumberOfHiresChangedEvent(event: NumberOfHiresChangedEvent) { }
    visitHarborCardDiscardedEvent(event: HarborCardDiscardedEvent) { }
    visitFeePaidEvent(event: FeePaidEvent) { }
    visitCoinsSpentEvent(event: CoinsSpentEvent) { }
    visitCoinsGivenEvent(event: CoinsGivenEvent) { }
    visitActivePlayerChangedEvent(event: ActivePlayerChangedEvent) { }
}