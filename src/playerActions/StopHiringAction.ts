import { PlayerAction } from "./PlayerAction";
import { PlayerActionVisitor } from "./PlayerActionVisitor";

export class StopHiringAction implements PlayerAction {

    apply(visitor: PlayerActionVisitor): void {
        visitor.visitStopHiringAction(this);
    }
}