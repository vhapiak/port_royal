/// <reference types="phaser" />

import { Config } from "./ViewConfig";

export class Button {

    backgroundImage: Phaser.GameObjects.Image; 
    text: Phaser.GameObjects.Text; 

    constructor(
        scene: Phaser.Scene, 
        root: Phaser.GameObjects.Container, 
        x: number, 
        y: number, 
        background: string, 
        text: string) {

        this.backgroundImage = scene.add.image(x, y, background);
        this.text = scene.add.text(x, y, text, Config.buttonFont);
        this.text.setOrigin(0.5, 0.5);

        if (root) {
            root.add(this.backgroundImage);
            root.add(this.text);
        }
    }

    onClick(callback: () => void, context: any): void {
        this.backgroundImage.setInteractive({cursor: 'pointer'}).on('pointerup', callback, context);
    }

}