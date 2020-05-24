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

export class GameEventVisitor<Result = void> {

    def: Result;

    constructor(def: Result) {
        this.def = def;
    }

    visitCardDrawnEvent(event: CardDrawnEvent): Result { return this.def; }
    visitCardPutIntoHarborEvent(event: CardPutIntoHarborEvent): Result { return this.def; }
    visitGamePhaseChangedEvent(event: GamePhaseChangedEvent): Result { return this.def; }
    visitHarborDiscardedEvent(event: HarborDiscardedEvent): Result { return this.def; }
    visitDrawnCardDiscardedEvent(event: DrawnCardDiscardedEvent): Result { return this.def; }
    visitTurnPlayerChangedEvent(event: TurnPlayerChangedEvent): Result { return this.def; }
    visitPossibleHiresChangedEvent(event: PossibleHiresChangedEvent): Result { return this.def; }
    visitPersonHiredEvent(event: PersonHiredEvent): Result { return this.def; }
    visitNumberOfHiresChangedEvent(event: NumberOfHiresChangedEvent): Result { return this.def; }
    visitHarborCardDiscardedEvent(event: HarborCardDiscardedEvent): Result { return this.def; }
    visitFeePaidEvent(event: FeePaidEvent): Result { return this.def; }
    visitCoinsSpentEvent(event: CoinsSpentEvent): Result { return this.def; }
    visitCoinsGivenEvent(event: CoinsGivenEvent): Result { return this.def; }
    visitActivePlayerChangedEvent(event: ActivePlayerChangedEvent): Result { return this.def; }
}