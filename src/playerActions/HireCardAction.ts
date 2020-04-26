import { PlayerAction } from "./PlayerAction";
import { PlayerActionVisitor } from "./PlayerActionVisitor";
import { Card } from "../cards/Card";

export class HireCardAction implements PlayerAction {

    card: Card;

    constructor(card: Card) {
        this.card = card;
    }

    apply<Result>(visitor: PlayerActionVisitor<Result>): Result {
        return visitor.visitHireCardAction(this);
    }
}