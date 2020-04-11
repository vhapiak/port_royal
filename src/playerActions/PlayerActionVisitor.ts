import { DrawCardAction } from "./DrawCardAction";
import { StopDiscoveringAction } from "./StopDiscoveringAction";
import { DiscardShipAction } from "./DiscardShipAction";
import { PutShipIntoHarborAction } from "./PutShipIntoHarborAction";

export class PlayerActionVisitor {
    visitDrawCardAction(action: DrawCardAction): void {}
    visitStopDiscoveringAction(action: StopDiscoveringAction): void {}
    visitDiscardShipAction(action: DiscardShipAction): void {}
    visitPutShipIntoHarborAction(action: PutShipIntoHarborAction): void {}
} 