import { ResultCode } from "./ResultCode";
import { GameEvent } from "../gameEvents/GameEvent";

export class ExecutionResult {
    code: ResultCode;
    events: GameEvent[];

    constructor(code: ResultCode, events: GameEvent[] = []) {
        this.code = code;
        this.events = events;
    }
}