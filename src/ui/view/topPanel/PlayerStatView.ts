/// <reference types="phaser" />

import { GameModel } from "../../GameModel"
import { Player } from "../../../gameState/Player";
import { BoundingBox } from "../../math/BoundingBox";
import { GameEventVisitor } from "../../../gameEvents/GameEventVisitor";
import { PersonHiredEvent } from "../../../gameEvents/PersonHiredEvent";

type Calculator = (player: Player) => number;

export class PlayerStateView extends GameEventVisitor {

    boundingBox: BoundingBox;
    container: Phaser.GameObjects.Container;
    calculator: Calculator;
    template: string;
    gameModel: GameModel;
    state: Phaser.GameObjects.Text;
    playerIdx: number;

    constructor(config: any, calculator: Calculator, scene: Phaser.Scene, gameModel: GameModel) {
        super();
        
        this.boundingBox = new BoundingBox();
        this.container = scene.add.container(0, 0);
        this.calculator = calculator;
        this.gameModel = gameModel;
        this.template = config.state.template;

        if (config.text) {
            let text = scene.add.text(
                config.text.position.x, 
                config.text.position.y, 
                config.text.value, 
                config.text.font,
            );
            text.setOrigin(
                config.text.origin.x,
                config.text.origin.y);
            this.container.add(text);
            this.boundingBox.add(text);
        } 

        const image = scene.add.image(
            config.image.position.x, 
            config.image.position.y,
            config.image.texture);
        image.setOrigin(
            config.image.origin.x,
            config.image.origin.y);
        this.container.add(image);
        this.boundingBox.add(image);

        let state = scene.add.text(
            config.state.position.x, 
            config.state.position.y, 
            this.format(0), 
            config.state.font,
        );
        state.setOrigin(
            config.state.origin.x,
            config.state.origin.y);
        this.container.add(state);
        this.boundingBox.add(state);
        this.state = state;

        gameModel.subscribe(this);
    }
    
    setPlayer(index: number): void {
        this.playerIdx = index;
        this.update();
    }

    setPosition(x: number, y: number): void {
        const center = this.boundingBox.getCenter();
        this.container.setX(x - center.x);
        this.container.setY(y + center.y);
    }

    getSize(): Phaser.Math.Vector2 {
        const size = this.boundingBox.getSize();
        return new Phaser.Math.Vector2(size.x, size.y);
    }

    visitPersonHiredEvent(event: PersonHiredEvent) {
        this.update();
    }

    // @todo visit expedition event

    private format(num: number): string {
        return this.template.replace('{}', num + '');
    }

    private update(): void {
        const player = this.gameModel.gameEngine.state.players[this.playerIdx];
        const num = this.calculator(player);
        this.state.setText(this.format(num));
        this.container.setAlpha(num === 0 ? 0.2 : 1.0);
    }
}