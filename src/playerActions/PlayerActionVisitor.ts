import { DrawCardAction } from "./DrawCardAction";
import { StopDiscoveringAction } from "./StopDiscoveringAction";
import { DiscardShipAction } from "./DiscardShipAction";
import { PutShipIntoHarborAction } from "./PutShipIntoHarborAction";
import { StopHiringAction } from "./StopHiringAction";
import { HireCardAction } from "./HireCardAction";

export class PlayerActionVisitor {
    visitDrawCardAction(action: DrawCardAction): void {}
    visitStopDiscoveringAction(action: StopDiscoveringAction): void {}
    visitDiscardShipAction(action: DiscardShipAction): void {}
    visitPutShipIntoHarborAction(action: PutShipIntoHarborAction): void {}
    visitStopHiringAction(action: StopHiringAction): void {}
    visitHireCardAction(action: HireCardAction): void {}
} 