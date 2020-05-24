/// <reference types="phaser" />

import { DrawPileView } from "./view/DrawPileView";
import { HarborView } from "./view/HarborView";
import { GameModel } from "./GameModel";
import { Player } from "../gameState/Player";
import { GameState } from "../gameState/GameState";
import { CardPile } from "../gameState/CardPile";
import { GameEngine } from "../game/GameEngine";
import { DrawnCardView } from "./view/DrawnCardView";
import { StopDrawingButton } from "./view/StopDrawingButton";
import { DiscardShipButtons } from "./view/DiscardShipButtons";
import { GamePhase } from "../gameState/GamePhase";
import { Harbor } from "../gameState/Harbor";
import { StopHiringButton } from "./view/StopHiringButton";
import { CourtesanCard } from "../cards/persons/CourtesanCard";
import { TopPanelView } from "./view/topPanel/TopPanelView";
import { CardsProvider } from "./CardsProvider";
import { Card } from "../cards/Card";
import { RandomShuffler } from "../common/RandomShuffler";
import { StartGameAction } from "../playerActions/StartGameAction";
import { Config } from "./view/ViewConfig";
import { PirateCard } from "../cards/persons/PirateCard";

export class GameScene extends Phaser.Scene {

    gameModel: GameModel;

    constructor() {
        super({
            key: 'game',
            active: true,
        });
    }

    preload(): void {
        let loading = this.add.text(Config.view.width / 2, Config.view.height / 2, 'Loading...', {
            fontFamily: 'Bookman',
            fontSize: 56,
            color: '#ffffff',
            fontStyle: 'bold italic'
        });
        loading.setOrigin(0.5, 0.5);
        this.load.on('complete', function () {
            loading.destroy(true);
        });

        this.load.image('main_bg', 'data/main_bg.png');
        this.load.image('top_panel_bg', 'data/top_panel_bg.png');
        this.load.image('points_mid', 'data/points_mid.png');
        this.load.image('coin_mid', 'data/coin_mid.png');
        this.load.image('coin_small', 'data/coin_small.png');
        this.load.image('name_tape', 'data/name_tape.png');
        this.load.image('player_border', 'data/player_border.png');
        this.load.image('blue_button', 'data/blue_button.png');
        this.load.image('brown_button', 'data/brown_button.png');
        this.load.image('small_border', 'data/small_border.png');
        this.load.image('small_border_corner', 'data/small_border_corner.png');

        this.load.image('captain_avatar', 'data/avatars/captain.png');
        this.load.image('courtesan_avatar', 'data/avatars/courtesan.png');
        this.load.image('gunsmith_avatar', 'data/avatars/gunsmith.png');
        this.load.image('oldman_avatar', 'data/avatars/oldman.png');
        this.load.image('pirate_avatar', 'data/avatars/pirate.png');

        this.load.image('strength', 'data/team/strength.png');
        this.load.image('sailor', 'data/team/sailor.png');
        this.load.image('carpenter', 'data/team/carpenter.png');
        this.load.image('chaplain', 'data/team/chaplain.png');
        this.load.image('mercenary', 'data/team/mercenary.png');
        this.load.image('governor', 'data/team/governor.png');
        this.load.image('captain', 'data/team/captain.png');
        this.load.image('rogue', 'data/team/rogue.png');
        this.load.image('courtesan', 'data/team/courtesan.png');

        this.load.image('shirt', 'data/cards/shirt.png');
        this.load.atlas('card_atlas', 'data/cards/en/atlas.png', 'data/cards/en/atlas.json');
        this.load.atlas('card_atlas0', 'data/cards/en/atlas0.png', 'data/cards/en/atlas0.json');
        this.load.atlas('card_atlas1', 'data/cards/en/atlas1.png', 'data/cards/en/atlas1.json');
        this.load.atlas('card_atlas2', 'data/cards/en/atlas2.png', 'data/cards/en/atlas2.json');
        this.load.atlas('card_atlas3', 'data/cards/en/atlas3.png', 'data/cards/en/atlas3.json');
        this.load.atlas('card_atlas4', 'data/cards/en/atlas4.png', 'data/cards/en/atlas4.json');
        this.load.atlas('card_atlas5', 'data/cards/en/atlas5.png', 'data/cards/en/atlas5.json');
        this.load.atlas('card_atlas6', 'data/cards/en/atlas6.png', 'data/cards/en/atlas6.json');

        this.load.json('deck', 'data/cards/deck.json');
    }

    create(): void {
        let background = this.add.image(0, 0, 'main_bg');
        background.setOrigin(0, 0);

        let cardsProvider = new CardsProvider(this);
        this.gameModel = this.makeGameModel(cardsProvider.getCards());
        this.gameModel.executeAction(new StartGameAction());

        let drawPile = new DrawPileView(this, this.gameModel);
        let habor = new HarborView(this, this.gameModel, cardsProvider);
        let drawCard = new DrawnCardView(this, this.gameModel, cardsProvider);
        let stopDrawing = new StopDrawingButton(this, this.gameModel);
        let discardShip = new DiscardShipButtons(this, this.gameModel);
        let stopHiring = new StopHiringButton(this, this.gameModel);
        let topPanel = new TopPanelView(this, this.gameModel);
    }

    private makeGameModel(cards: Card[]): GameModel {
        let card = new PirateCard(0, 'Pirate', 1, 1, 10);
        console.log('Cards in deck: ', cards.length);
        let players = [
            new Player('Jack', [], [card]),
            new Player('Will', [], []),
            new Player('Davy', [], [])
        ];

        let cardPile = new CardPile([], cards, new RandomShuffler());

        let gameState = new GameState(
            GamePhase.WaitingStart,
            cardPile,
            players,
            new Harbor([]),
            null,
            0,
            0,
            players[0],
            players[0]);

        let gameEngine = new GameEngine(gameState);
        return new GameModel(gameEngine, gameState.activePlayer);
    }
}