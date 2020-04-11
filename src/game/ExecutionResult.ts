import { ResultCode } from "./ResultCode";

export class ExecutionResult {
    result: ResultCode;
    events: void;

    constructor(result: ResultCode) {
        this.result = result;
    }
}