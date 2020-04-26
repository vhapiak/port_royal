import { PlayerAction } from "./PlayerAction";
import { PlayerActionVisitor } from "./PlayerActionVisitor";

export class PutShipIntoHarborAction implements PlayerAction {

    apply<Result>(visitor: PlayerActionVisitor<Result>): Result {
        return visitor.visitPutShipIntoHarborAction(this);
    }
}