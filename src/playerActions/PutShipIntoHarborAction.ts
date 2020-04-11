import { PlayerAction } from "./PlayerAction";
import { PlayerActionVisitor } from "./PlayerActionVisitor";

export class PutShipIntoHarborAction implements PlayerAction {

    apply(visitor: PlayerActionVisitor): void {
        visitor.visitPutShipIntoHarborAction(this);
    }
}