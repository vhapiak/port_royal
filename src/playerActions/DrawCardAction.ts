import { PlayerAction } from "./PlayerAction";
import { PlayerActionVisitor } from "./PlayerActionVisitor";

export class DrawCardAction implements PlayerAction {

    apply(visitor: PlayerActionVisitor): void {
        visitor.visitDrawCardAction(this);
    }
}