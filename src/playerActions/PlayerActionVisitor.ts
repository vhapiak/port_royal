import { DrawCardAction } from "./DrawCardAction";
import { StopDiscoveringAction } from "./StopDiscoveringAction";
import { DiscardShipAction } from "./DiscardShipAction";
import { PutShipIntoHarborAction } from "./PutShipIntoHarborAction";
import { StopHiringAction } from "./StopHiringAction";
import { HireCardAction } from "./HireCardAction";

export class PlayerActionVisitor<Result> {

    def: Result;

    constructor(def: Result) {
        this.def = this.def;
    }

    visitDrawCardAction(action: DrawCardAction): Result { return this.def; }
    visitStopDiscoveringAction(action: StopDiscoveringAction): Result { return this.def; }
    visitDiscardShipAction(action: DiscardShipAction): Result { return this.def; }
    visitPutShipIntoHarborAction(action: PutShipIntoHarborAction): Result { return this.def; }
    visitStopHiringAction(action: StopHiringAction): Result { return this.def; }
    visitHireCardAction(action: HireCardAction): Result { return this.def; }
} 