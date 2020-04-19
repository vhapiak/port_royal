/// <reference types="phaser" />

import { GameScene } from "./ui/GameScene";

function main(): void {

    let phaserGame = new Phaser.Game({
        backgroundColor: 0x472509,
        scale: {
            width: 1920,
            height: 1080,
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            parent: 'content'
        },
        scene: [GameScene]
    });
}

main();