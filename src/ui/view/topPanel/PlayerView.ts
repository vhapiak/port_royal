/// <reference types="phaser" />

import { GameModel } from "../../GameModel";
import { Config } from "../ViewConfig";
import { PointsCalculator } from "../../../game/logic/calculators/PointsCalculator";
import { GameEventVisitor } from "../../../gameEvents/GameEventVisitor";
import { PersonHiredEvent } from "../../../gameEvents/PersonHiredEvent";
import { CoinsGivenEvent } from "../../../gameEvents/CoinsGivenEvent";
import { CoinsSpentEvent } from "../../../gameEvents/CoinsSpentEvent";
import { FeePaidEvent } from "../../../gameEvents/FeePaidEvent";
import { PlayerSelectedListener } from "./PlayerSelectedListener";
import { ActivePlayerChangedEvent } from "../../../gameEvents/ActivePlayerChangedEvent";
import { TurnPlayerChangedEvent } from "../../../gameEvents/TurnPlayerChangedEvent";

export class PlayerView extends GameEventVisitor {

    private playerIdx: number;
    private gameModel: GameModel;
    private listener: PlayerSelectedListener;
    private pointsText: Phaser.GameObjects.Text;
    private coinsText: Phaser.GameObjects.Text;
    private nameText: Phaser.GameObjects.Text;

    constructor(x: number, y: number, playerIdx: number, scene: Phaser.Scene, gameModel: GameModel, listener: PlayerSelectedListener) {
        super();

        this.playerIdx = playerIdx;
        this.gameModel = gameModel;
        this.listener = listener;

        const config = Config.topPanel.players;
        const border = scene.add.image(0, 0, 'player_border');
        const gameState = gameModel.gameEngine.state;

        const tape = scene.add.image(
            0,
            config.elements.tape.y,
            'name_tape'
        );
        this.nameText = scene.add.text(
            0, 
            config.elements.name.y,
            gameState.players[playerIdx].name,
            config.elements.name.font
        );
        this.nameText.setOrigin(0.5, 0.5);

        const avatarConfig = config.elements.avatars[playerIdx];
        const avatar = scene.add.image(
            avatarConfig.x,
            avatarConfig.y,
            avatarConfig.image
        );

        const points = scene.add.image(
            config.elements.stats.icons.x,
            config.elements.stats.points.y,
            'points_mid'
        );
        this.pointsText = scene.add.text(
            config.elements.stats.text.x,
            config.elements.stats.points.text.y,
            '',
            config.elements.stats.text.font
        );
        this.pointsText.setOrigin(0, 1);

        const coins = scene.add.image(
            config.elements.stats.icons.x,
            config.elements.stats.coins.y,
            'coin_mid'
        );
        this.coinsText = scene.add.text(
            config.elements.stats.text.x,
            config.elements.stats.coins.text.y,
            '',
            config.elements.stats.text.font
        );
        this.coinsText.setOrigin(0, 1);

        scene.add.container(x, y, [
            border,
            points,
            this.pointsText,
            coins,
            this.coinsText,
            avatar,
            tape,
            this.nameText
        ]);

        const cursor = {cursor: 'pointer'};
        avatar.setInteractive(cursor).on('pointerup', PlayerView.prototype.onClick, this);
        tape.setInteractive(cursor).on('pointerup', PlayerView.prototype.onClick, this);

        gameModel.subscribe(this);
        this.updatePoints();
        this.updateCoins();
        this.updateActiveState();
    }

    visitPersonHiredEvent(event: PersonHiredEvent) {
        this.updatePoints();
    }

    visitCoinsGivenEvent(event: CoinsGivenEvent) {
        this.updateCoins();
    }

    visitCoinsSpentEvent(event: CoinsSpentEvent) {
        this.updateCoins();
    }

    visitFeePaidEvent(event: FeePaidEvent) {
        this.updateCoins();
    }

    visitActivePlayerChangedEvent(event: ActivePlayerChangedEvent) {
        this.updateActiveState();
    }

    visitTurnPlayerChangedEvent(event: TurnPlayerChangedEvent) {
        this.updateActiveState();
    }

    private updateCoins() {
        const player = this.gameModel.gameEngine.state.players[this.playerIdx];
        const coins = player.coins.length;
        this.coinsText.setText('x' + coins);
    }

    private updatePoints() {
        const player = this.gameModel.gameEngine.state.players[this.playerIdx];
        const pointsCalculator = new PointsCalculator(player);
        this.pointsText.setText('x' + pointsCalculator.points);
    }

    private updateActiveState() {
        const gameState = this.gameModel.gameEngine.state;
        const player = gameState.players[this.playerIdx];
        if (player === gameState.activePlayer) {
            this.nameText.setColor(Config.topPanel.players.activeColor);
        } else if (player === gameState.turnPlayer)  {
            this.nameText.setColor(Config.topPanel.players.turnColor);
        } else {
            this.nameText.setColor(Config.topPanel.players.normalColor);
        }
    }

    private onClick(): void {
        this.listener.onPlayerSelected(this.playerIdx);
    }
}