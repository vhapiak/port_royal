/// <reference types="phaser" />

import { Config } from "../ViewConfig";

export class TeamBorderView {

    left: Phaser.GameObjects.Image;
    right: Phaser.GameObjects.Image;
    left_corner: Phaser.GameObjects.Image;
    right_corner: Phaser.GameObjects.Image;

    constructor(scene: Phaser.Scene) {
        const config = Config.topPanel.team;
        this.left = scene.add.image(0, config.border.y, 'small_border');
        this.left.setOrigin(0, 1);

        this.right = scene.add.image(Config.view.width, config.border.y, 'small_border');
        this.right.setOrigin(1, 1);

        this.left_corner = scene.add.image(0, config.border.y, 'small_border_corner');
        this.left_corner.setOrigin(1, 1);

        this.right_corner = scene.add.image(0, config.border.y, 'small_border_corner');
        this.right_corner.setOrigin(1, 1);
        this.right_corner.setScale(-1, 1);

        this.setPlayer(0);
    }

    setPlayer(index: number): void {
        const config = Config.topPanel.players;
        const width = config.offset;
        const center = config.first.x + index * width;

        this.left_corner.setX(center - width / 2);
        this.right_corner.setX(center + width / 2);

        const left_width = center - width / 2 - this.left_corner.width / 3;
        this.left.setDisplaySize(left_width, this.left.height);

        const right_width = Config.view.width - (center + width / 2 + this.left_corner.width / 3);
        this.right.setDisplaySize(right_width, this.right.height);
    }
}