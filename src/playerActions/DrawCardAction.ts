import { PlayerAction } from "./PlayerAction";
import { PlayerActionVisitor } from "./PlayerActionVisitor";

export class DrawCardAction implements PlayerAction {

    apply<Result>(visitor: PlayerActionVisitor<Result>): Result {
        return visitor.visitDrawCardAction(this);
    }
}