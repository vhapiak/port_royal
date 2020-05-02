import { PlayerAction } from "./PlayerAction";
import { PlayerActionVisitor } from "./PlayerActionVisitor";

export class StartGameAction implements PlayerAction {

    apply<Result>(visitor: PlayerActionVisitor<Result>): Result {
        return visitor.visitStartGameAction(this);
    }
}