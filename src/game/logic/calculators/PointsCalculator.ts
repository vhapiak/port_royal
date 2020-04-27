import { Player } from "../../../gameState/Player";

export class PointsCalculator {

    points: number;

    constructor(player: Player) {
        this.points = 0;
        for (let person of player.persons) {
            this.points += person.points;
        }
    }

}