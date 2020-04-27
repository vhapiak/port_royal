/// <reference types="phaser" />

import { DrawPileView } from "./view/DrawPileView";
import { HarborView } from "./view/HarborView";
import { GameModel } from "./GameModel";
import { Player } from "../gameState/Player";
import { ShipCard } from "../cards/ShipCard";
import { ShipColor } from "../cards/ShipColor";
import { PirateCard } from "../cards/persons/PirateCard";
import { TraderCard } from "../cards/persons/TraderCard";
import { ExpeditionCard } from "../cards/ExpeditionCard";
import { CrewAbility } from "../cards/CrewAbility";
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

export class GameScene extends Phaser.Scene {

    gameModel: GameModel;

    constructor() {
        super({
            key: 'game',
            active: true,
        });

        let pirate = new PirateCard(1, 'Pirate', 'pirate_c5_p1_s2', 1, 5, 2);
        let courtesan = new CourtesanCard(13, 'Courtesan', 'shirt', 3, 8);
        let coins = [
            new PirateCard(8, 'Pirate', 'pirate_c5_p1_s2', 1, 5, 2),
            new PirateCard(9, 'Pirate', 'pirate_c5_p1_s2', 1, 5, 2),
            new PirateCard(10, 'Pirate', 'pirate_c5_p1_s2', 1, 5, 2),
            new PirateCard(11, 'Pirate', 'pirate_c5_p1_s2', 1, 5, 2),
            new PirateCard(12, 'Pirate', 'pirate_c5_p1_s2', 1, 5, 2)
        ];
        let players = [
            new Player('Jack', [], [pirate]),
            new Player('Will', coins, [courtesan]),
            new Player('Davy', [], [])
        ];

        let cardPile = new CardPile([], [
            new ShipCard(0, 'Sloop', 'sloop_c1_s1', ShipColor.Black, 1, 1),
            new ShipCard(2, 'Sloop', 'sloop_c1_s1', ShipColor.Black, 1, 1),
            new PirateCard(3, 'Pirate', 'pirate_c5_p1_s2', 1, 5, 2),
            new TraderCard(4, 'Trader', 'trader_c3_p1_brig', 1, 3, ShipColor.Green),
            new ExpeditionCard(5, 'Expedition', 'expedition_c2_p4_ss', 2, 4, [CrewAbility.Sailor, CrewAbility.Sailor]),
            new PirateCard(6, 'Pirate', 'pirate_c5_p1_s2', 1, 5, 2),
            new TraderCard(7, 'Trader', 'trader_c3_p1_brig', 1, 3, ShipColor.Green),
        ]);

        let gameState = new GameState(
            GamePhase.Discovering,
            cardPile,
            players,
            new Harbor([]),
            null,
            0,
            0,
            players[0],
            players[0]);

        let gameEngine = new GameEngine(gameState);

        this.gameModel = new GameModel(gameEngine, gameState.activePlayer);
    }

    preload(): void {
        this.load.image('main_bg', 'data/main_bg.png');
        this.load.image('top_panel_bg', 'data/top_panel_bg.png');
        this.load.image('points_mid', 'data/points_mid.png');
        this.load.image('coin_mid', 'data/coin_mid.png');
        this.load.image('name_tape', 'data/name_tape.png');
        this.load.image('player_border', 'data/player_border.png');
        this.load.image('blue_button', 'data/blue_button.png');
        this.load.image('brown_button', 'data/brown_button.png');

        this.load.image('captain_avatar', 'data/avatars/captain.png');
        this.load.image('courtesan_avatar', 'data/avatars/courtesan.png');
        this.load.image('gunsmith_avatar', 'data/avatars/gunsmith.png');
        this.load.image('oldman_avatar', 'data/avatars/oldman.png');
        this.load.image('pirate_avatar', 'data/avatars/pirate.png');

        this.load.image('shirt', 'data/cards/shirt.png');
        this.load.image('expedition_c2_p4_ss', 'data/cards/expedition_c2_p4_ss.png');
        this.load.image('pirate_c5_p1_s2', 'data/cards/pirate_c5_p1_s2.png');
        this.load.image('sloop_c1_s1', 'data/cards/sloop_c1_s1.png');
        this.load.image('trader_c3_p1_brig', 'data/cards/trader_c3_p1_brig.png');
    }

    create(): void {
        let background = this.add.image(0, 0, 'main_bg');
        background.setOrigin(0, 0);

        let drawPile = new DrawPileView(this, this.gameModel);
        let habor = new HarborView(this, this.gameModel);
        let drawCard = new DrawnCardView(this, this.gameModel);
        let stopDrawing = new StopDrawingButton(this, this.gameModel);
        let discardShip = new DiscardShipButtons(this, this.gameModel);
        let stopHiring = new StopHiringButton(this, this.gameModel);
        let topPanel = new TopPanelView(this, this.gameModel);
    }
}