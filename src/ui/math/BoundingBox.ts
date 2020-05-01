/// <reference types="phaser" />

interface Object extends
    Phaser.GameObjects.Components.ComputedSize,
    Phaser.GameObjects.Components.Transform,
    Phaser.GameObjects.Components.Origin { }

export class BoundingBox {

    left: number = 0;
    bottom: number = 0;
    right: number = 0;
    top: number = 0;

    add(object: Object) {
        const left = object.x - object.displayWidth * object.originX;
        const right = object.x + object.displayWidth * (1 - object.originX);
        const top = object.y - object.displayHeight * object.originY;
        const bottom = object.y + object.displayHeight * (1 - object.originY);

        this.left = Math.min(this.left, left);
        this.right = Math.max(this.right, right);
        this.top = Math.min(this.top, top);
        this.bottom = Math.max(this.bottom, bottom);
    }

    getCenter(): Phaser.Math.Vector2 {
        return new Phaser.Math.Vector2(
            (this.left + this.right) / 2,
            (this.bottom + this.top) / 2,
        );
    }

    getSize(): Phaser.Math.Vector2 {
        return new Phaser.Math.Vector2(
            Math.abs(this.left) + Math.abs(this.right),
            Math.abs(this.bottom) + Math.abs(this.top),
        );
    }

}