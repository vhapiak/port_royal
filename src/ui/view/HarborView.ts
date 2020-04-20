/// <reference types="phaser" />

import { Config } from "./ViewConfig";
import { GameModel } from "../GameModel";
import { GameEventVisitor } from "../../gameEvents/GameEventVisitor";
import { CardPutIntoHarborEvent } from "../../gameEvents/CardPutIntoHarbor";

export class HarborView extends GameEventVisitor {

    scene: Phaser.Scene;
    gameModel: GameModel;
    cards: Phaser.GameObjects.Image[];

    constructor(scene: Phaser.Scene, gameModel: GameModel) {
        super();
        
        this.scene = scene;
        this.gameModel = gameModel;
        this.cards = [];
        
        let title = scene.add.text(
            Config.mainLayer.harborLayer.x,
            Config.mainLayer.titleRow.y,
            'Harbor',
            Config.titleFont);
        title.setOrigin(0.5, 0.5);

        gameModel.subscribe(this);
        this.updateState();
    }

    visitCardPutIntoHarborEvent(event: CardPutIntoHarborEvent) {
        this.updateState();
    }

    private updateState(): void {
        this.cards.forEach((card) => {
            card.destroy(true);
        });
        this.cards = [];

        const harborConfig = Config.mainLayer.harborLayer;
        const cardSize = Config.cardSize;
        const cardWidthWithOffset = cardSize.width + harborConfig.cardsOffset.width;
        const cardHeightWithOffset = cardSize.height + harborConfig.cardsOffset.height;
        const firstCollumnX = harborConfig.x - cardWidthWithOffset * harborConfig.cardsInRow / 2 + cardWidthWithOffset / 2;
        const firstCollumnY = Config.mainLayer.verticalLayer.deckRow.y;

        const harborCards = this.gameModel.gameEngine.state.harbor.cards; 
        for(let i = 0; i < harborCards.length; ++i) {
            const row = Math.floor(i / harborConfig.cardsInRow);
            const col = i % harborConfig.cardsInRow;

            let card = this.scene.add.image(
                firstCollumnX + col * cardWidthWithOffset, 
                firstCollumnY + row * cardHeightWithOffset, 
                harborCards[i].imagePath);

            this.cards.push(card);
        }
    }

}