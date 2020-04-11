import { PlayerAction } from "./PlayerAction";
import { PlayerActionVisitor } from "./PlayerActionVisitor";

export class DiscardShipAction implements PlayerAction {

    apply(visitor: PlayerActionVisitor): void {
        visitor.visitDiscardShipAction(this);
    }
}