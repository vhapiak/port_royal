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

export class HarborView extends GameEventVisitor {

    scene: Phaser.Scene;
    gameModel: GameModel;
    cards: HarborCardView[];
    cardsProvider: CardsProvider;

    constructor(scene: Phaser.Scene, gameModel: GameModel, cardsProvider: CardsProvider) {
        super();

        this.scene = scene;
        this.gameModel = gameModel;
        this.cards = [];
        this.cardsProvider = cardsProvider;

        let title = scene.add.text(
            Config.mainLayer.harborLayer.x,
            Config.mainLayer.titleRow.y,
            'Harbor',
            Config.titleFont);
        title.setOrigin(0.5, 0.5);

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

    private addCard(card: Card) {
        const harborConfig = Config.mainLayer.harborLayer;
        const cardSize = Config.cardSize;
        const cardWidthWithOffset = cardSize.width + harborConfig.cardsOffset.width;
        const cardHeightWithOffset = cardSize.height + harborConfig.cardsOffset.height;
        const firstCollumnX = harborConfig.x - cardWidthWithOffset * harborConfig.cardsInRow / 2 + cardWidthWithOffset / 2;
        const firstCollumnY = Config.mainLayer.verticalLayer.deckRow.y;

        const index = this.cards.length;
        const row = Math.floor(index / harborConfig.cardsInRow);
        const col = index % harborConfig.cardsInRow;

        const x = firstCollumnX + col * cardWidthWithOffset;
        const y = firstCollumnY + row * cardHeightWithOffset;

        const texture = this.cardsProvider.getCardTexture(card.id);
        this.cards.push(new HarborCardView(x, y, texture, card, this.scene, this.gameModel));
    }

}