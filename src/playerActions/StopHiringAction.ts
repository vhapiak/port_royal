import { PlayerAction } from "./PlayerAction";
import { PlayerActionVisitor } from "./PlayerActionVisitor";

export class StopHiringAction implements PlayerAction {

    apply<Result>(visitor: PlayerActionVisitor<Result>): Result {
        return visitor.visitStopHiringAction(this);
    }
}