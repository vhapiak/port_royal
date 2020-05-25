import { AnimatedCard } from "./AnimatedCard";

export type Result = {
    card: AnimatedCard,
    position: {
        x: number,
        y: number
    }
};

export interface IAnimatedCardHolder {
    popCard(): Result
}