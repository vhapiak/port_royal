import { PlayerAction } from "./PlayerAction";
import { PlayerActionVisitor } from "./PlayerActionVisitor";

export class StopDiscoveringAction implements PlayerAction {

    apply(visitor: PlayerActionVisitor): void {
        visitor.visitStopDiscoveringAction(this);
    }
}