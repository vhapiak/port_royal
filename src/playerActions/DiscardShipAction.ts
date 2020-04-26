import { PlayerAction } from "./PlayerAction";
import { PlayerActionVisitor } from "./PlayerActionVisitor";

export class DiscardShipAction implements PlayerAction {

    apply<Result>(visitor: PlayerActionVisitor<Result>): Result {
        return visitor.visitDiscardShipAction(this);
    }
}