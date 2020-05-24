import { GameEventVisitor } from "../../gameEvents/GameEventVisitor";
import { CardDrawnEvent } from "../../gameEvents/CardDrawnEvent";
import { CardPutIntoHarborEvent } from "../../gameEvents/CardPutIntoHarborEvent";
import { GamePhaseChangedEvent } from "../../gameEvents/GamePhaseChangedEvent";
import { HarborDiscardedEvent } from "../../gameEvents/HarborDiscardedEvent";
import { DrawnCardDiscardedEvent } from "../../gameEvents/DrawnCardDiscarded";
import { TurnPlayerChangedEvent } from "../../gameEvents/TurnPlayerChangedEvent";
import { PossibleHiresChangedEvent } from "../../gameEvents/PossibleHiresChangedEvent";
import { PersonHiredEvent } from "../../gameEvents/PersonHiredEvent";
import { NumberOfHiresChangedEvent } from "../../gameEvents/NumberOfHiresChangedEvent";
import { HarborCardDiscardedEvent } from "../../gameEvents/HarborCardDiscardedEvent";
import { FeePaidEvent } from "../../gameEvents/FeePaidEvent";
import { CoinsSpentEvent } from "../../gameEvents/CoinsSpentEvent";
import { CoinsGivenEvent } from "../../gameEvents/CoinsGivenEvent";
import { ActivePlayerChangedEvent } from "../../gameEvents/ActivePlayerChangedEvent";

export class EventsDelays extends GameEventVisitor<number> {

    constructor() {
        super(0);
    }

    visitCardDrawnEvent(event: CardDrawnEvent): number { return 600; }
    visitCardPutIntoHarborEvent(event: CardPutIntoHarborEvent): number { return 0; }
    visitGamePhaseChangedEvent(event: GamePhaseChangedEvent): number { return 0; }
    visitHarborDiscardedEvent(event: HarborDiscardedEvent): number { return 0; }
    visitDrawnCardDiscardedEvent(event: DrawnCardDiscardedEvent): number { return 0; }
    visitTurnPlayerChangedEvent(event: TurnPlayerChangedEvent): number { return 0; }
    visitPossibleHiresChangedEvent(event: PossibleHiresChangedEvent): number { return 0; }
    visitPersonHiredEvent(event: PersonHiredEvent): number { return 0; }
    visitNumberOfHiresChangedEvent(event: NumberOfHiresChangedEvent): number { return 0; }
    visitHarborCardDiscardedEvent(event: HarborCardDiscardedEvent): number { return 0; }
    visitFeePaidEvent(event: FeePaidEvent): number { return 0; }
    visitCoinsSpentEvent(event: CoinsSpentEvent): number { return 0; }
    visitCoinsGivenEvent(event: CoinsGivenEvent): number { return 0; }
    visitActivePlayerChangedEvent(event: ActivePlayerChangedEvent): number { return 0; }
}