/// <reference types="phaser" />

import { Card } from "../../cards/Card";
import { CardsProvider, CardTexture } from "../CardsProvider";

export enum FlipSide {
    FaceUp,
    FaceDown,
}

export class AnimatedCard {

    scene: Phaser.Scene;
    image: Phaser.GameObjects.Image;
    card: Card;
    side: FlipSide;
    texture: CardTexture;
    timeline: Phaser.Tweens.Timeline;

    constructor(scene: Phaser.Scene, card: Card, cardsProvider: CardsProvider) {
        this.scene = scene;
        this.card = card;
        this.side = FlipSide.FaceDown;
        this.image = scene.add.image(0, 0, 'shirt');
        this.texture = cardsProvider.getCardTexture(card.id);
    }

    setPosition(x: number, y: number) {
        this.image.x = x;
        this.image.y = y;
    }

    cancel() {
        if (this.timeline) {
            this.timeline.destroy();
        }
    }

    destroy() {
        this.cancel();
        this.image.destroy();
    }

    flip(side: FlipSide, duration: number) {
        this.cancel();
        if (side !== this.side) {
            const self = this;
            const halfDuration = duration / 2;
            this.timeline = this.scene.tweens.timeline({
                tweens: [
                    {
                        targets: this.image,
                        scaleX: 0,
                        duration: halfDuration,
                        offset: 0,
                        ease: 'Sine.easeIn',
                        onComplete: function () {
                            if (side == FlipSide.FaceDown) {
                                self.image.setTexture('shirt');
                            } else {
                                self.image.setTexture(self.texture.atlas, self.texture.frame);
                            }
                            self.side = side;
                        }
                    },
                    {
                        targets: this.image,
                        scaleY: 1.2,
                        duration: halfDuration,
                        offset: 0
                    },
                    {
                        targets: this.image,
                        scaleX: 1.0,
                        duration: halfDuration,
                        ease: 'Sine.easeOut',
                        offset: halfDuration
                    },
                    {
                        targets: this.image,
                        scaleY: 1.0,
                        duration: halfDuration,
                        offset: halfDuration
                    }
                ]
            });
        }
    }

    moveWithflip(x: number, y: number, side: FlipSide, duration: number) {
        this.cancel();
        const self = this;
        const halfDuration = duration / 2;
        this.timeline = this.scene.tweens.createTimeline();
        this.timeline.add({
            targets: this.image,
            x: x,
            duration: 600,
            offset: 0
        });
        this.timeline.add({
            targets: this.image,
            y: y,
            duration: 600,
            offset: 0
        });
        this.timeline.add({
            targets: this.image,
            scaleY: 1.2,
            duration: halfDuration,
            offset: 0
        });
        this.timeline.add({
            targets: this.image,
            scaleY: 1.0,
            duration: halfDuration,
            offset: halfDuration
        });
        this.timeline.play();
        console.log('move');
        if (side !== this.side) {
            this.timeline.add({
                targets: this.image,
                scaleX: 0,
                duration: halfDuration,
                offset: 0,
                ease: 'Sine.easeIn',
                onComplete: function () {
                    if (side == FlipSide.FaceDown) {
                        self.image.setTexture('shirt');
                    } else {
                        self.image.setTexture(self.texture.atlas, self.texture.frame);
                    }
                    self.side = side;
                }
            });
            this.timeline.add({
                targets: this.image,
                scaleX: 1.0,
                duration: halfDuration,
                offset: halfDuration,
                ease: 'Sine.easeOut'
            });
        } else {
            this.timeline.add({
                targets: this.image,
                scaleX: 1.2,
                duration: halfDuration,
                offset: 0
            });
            this.timeline.add({
                targets: this.image,
                scaleX: 1.0,
                duration: halfDuration,
                offset: halfDuration
            });
        }
    }
}