/// <reference types="phaser" />

import { Config } from "./ViewConfig";
import { GameModel } from "../GameModel";
import { GameEventVisitor } from "../../gameEvents/GameEventVisitor";
import { CardPutIntoHarborEvent } from "../../gameEvents/CardPutIntoHarborEvent";
import { HarborDiscardedEvent } from "../../gameEvents/HarborDiscardedEvent";
import { HarborCardView } from "./HarborCardView";
import { Card } from "../../cards/Card";
import { HarborCardDiscardedEvent } from "../../gameEvents/HarborCardDiscardedEvent";
import { PersonHiredEvent } from "../../gameEvents/PersonHiredEvent";
import { CardsProvider } from "../CardsProvider";

const harborConfig = Config.mainLayer.harborLayer;
const cardSize = Config.cardSize;
const cardWidthWithOffset = cardSize.width + harborConfig.cardsOffset.width;
const cardHeightWithOffset = cardSize.height + harborConfig.cardsOffset.height;

const visibleRows = 2;
const initialPosition = {
    x: harborConfig.x,
    y: Config.mainLayer.verticalLayer.deckRow.y
};

export class HarborView extends GameEventVisitor {

    scene: Phaser.Scene;
    gameModel: GameModel;
    cards: HarborCardView[];
    cardsProvider: CardsProvider;

    container: Phaser.GameObjects.Container;
    scrollTween: Phaser.Tweens.Tween;
    scrolledRow: number;

    constructor(scene: Phaser.Scene, gameModel: GameModel, cardsProvider: CardsProvider) {
        super();

        this.scene = scene;
        this.gameModel = gameModel;
        this.cards = [];
        this.cardsProvider = cardsProvider;
        this.scrollTween = null;
        this.scrolledRow = 0;

        let title = scene.add.text(
            Config.mainLayer.harborLayer.x,
            Config.mainLayer.titleRow.y,
            'Harbor',
            Config.titleFont);
        title.setOrigin(0.5, 0.5);

        this.container = scene.add.container(
            initialPosition.x,
            initialPosition.y);

        scene.input.on('wheel', HarborView.prototype.onScroll, this);

        const harborCards = this.gameModel.gameEngine.state.harbor.cards;
        for (let i = 0; i < harborCards.length; ++i) {
            this.addCard(harborCards[i]);
        }

        gameModel.subscribe(this);
    }

    visitCardPutIntoHarborEvent(event: CardPutIntoHarborEvent) {
        this.addCard(event.card);
    }

    visitHarborDiscardedEvent(event: HarborDiscardedEvent) {
        this.cards.forEach(card => card.destroy());
        this.cards = [];
    }

    visitHarborCardDiscardedEvent(event: HarborCardDiscardedEvent) {
        this.removeCard(event.card);
    }

    visitPersonHiredEvent(event: PersonHiredEvent) {
        this.removeCard(event.person);
    }

    private removeCard(card: Card) {
        this.cards.forEach(cardView => {
            if (cardView.card === card) {
                cardView.destroy();
            }
        });
    }

    private onScroll(pointer: any, gameObjects: any, deltaX: number, deltaY: number, deltaZ: number) {
        if (!this.scrollTween) {
            this.scrollTo(this.scrolledRow - deltaY / Math.abs(deltaY));
        }
    }

    private scrollTo(row: number) {
        if (row > 0 || row < visibleRows - Math.ceil(this.cards.length / harborConfig.cardsInRow)) {
            return;
        }
        this.scrolledRow = row;
        this.scrollTween = this.scene.add.tween({
            targets: this.container,
            y: initialPosition.y + row * cardHeightWithOffset,
            duration: 100
        });
        this.scrollTween.setCallback('onComplete', HarborView.prototype.stopScroll, [], this);
    }

    private stopScroll() {
        this.scrollTween = null;
    }

    private addCard(card: Card) {
        const firstCollumnX = 0 - cardWidthWithOffset * harborConfig.cardsInRow / 2 + cardWidthWithOffset / 2;
        const firstCollumnY = 0;

        const index = this.cards.length;
        const row = Math.floor(index / harborConfig.cardsInRow);
        const col = index % harborConfig.cardsInRow;

        const x = firstCollumnX + col * cardWidthWithOffset;
        const y = firstCollumnY + row * cardHeightWithOffset;

        const texture = this.cardsProvider.getCardTexture(card.id);
        const image = this.scene.add.image(x, y, texture.atlas, texture.frame);
        this.container.add(image);
        this.cards.push(new HarborCardView(image, card, this.gameModel));

        this.scrollTo(visibleRows - row - 1);
    }

}