
export function assert(condition: boolean) {
    if (condition) {
        throw new Error('Assertion failed');
    }
}