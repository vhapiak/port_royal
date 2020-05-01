/// <reference types="phaser" />

import { GameModel } from "../../GameModel";
import { Config } from "../ViewConfig";
import { PlayerStateView } from "./PlayerStatView";
import { Player } from "../../../gameState/Player";
import { StrengthCalculator } from "../../../game/logic/calculators/StrengthCalculator";
import { CrewAbility } from "../../../cards/CrewAbility";
import { CrewCalculator } from "../../../game/logic/calculators/CrewCalculator";
import { HireBonusCalculator } from "../../../game/logic/calculators/HireBonusCalculator";
import { CaptainBonusCalculator } from "../../../game/logic/calculators/CaptainBonusCalculator";
import { RogueBonusCalculator } from "../../../game/logic/calculators/RogueBonusCalculator";
import { HireDiscountCalculator } from "../../../game/logic/calculators/HireDiscountCalculator";
import { ShipType } from "../../../cards/ShipType";
import { TraderBonusCalculator } from "../../../game/logic/calculators/TraderBonusCalculator";

export class TeamView {

    constructor(scene: Phaser.Scene, gameModel: GameModel) {
        const config = Config.topPanel.team;

        const members = [
            new PlayerStateView(config.pirates, strengthCalculator, scene, gameModel),

            new PlayerStateView(config.sailor, makeCrewCalculator(CrewAbility.Sailor), scene, gameModel),
            new PlayerStateView(config.carpenter, makeCrewCalculator(CrewAbility.Carpenter), scene, gameModel),
            new PlayerStateView(config.chaplain, makeCrewCalculator(CrewAbility.Chaplain), scene, gameModel),
            new PlayerStateView(config.mercenary, makeCrewCalculator(CrewAbility.Mercenary), scene, gameModel),

            new PlayerStateView(config.governor, hireBonusCalculator, scene, gameModel),
            new PlayerStateView(config.captain, captainBonusCalculator, scene, gameModel),
            new PlayerStateView(config.rogue, rogueBonusCalculator, scene, gameModel),
            new PlayerStateView(config.courtesan, hireDiscountCalculator, scene, gameModel),

            new PlayerStateView(config.brig, makeTraderBonusCalculator(ShipType.Brig), scene, gameModel),
            new PlayerStateView(config.galleon, makeTraderBonusCalculator(ShipType.Galleon), scene, gameModel),
            new PlayerStateView(config.frigate, makeTraderBonusCalculator(ShipType.Frigate), scene, gameModel),
            new PlayerStateView(config.pinnace, makeTraderBonusCalculator(ShipType.Pinnace), scene, gameModel),
            new PlayerStateView(config.flute, makeTraderBonusCalculator(ShipType.Flute), scene, gameModel),
        ];

        const totalWidth = Config.view.width - 2 * config.borderOffset.x;
        let membersWidth = 0;
        members.forEach(member => { membersWidth += member.getSize().x; });

        const offset = (totalWidth - membersWidth) / (members.length - 1);

        let x = config.borderOffset.x;
        for (let i = 0; i < members.length; ++i) {
            x += members[i].getSize().x / 2;
            members[i].setPosition(x, config.y);
            members[i].setPlayer(gameModel.gameEngine.state.activePlayer);
            x += members[i].getSize().x / 2 + offset;
        }
    }
}

function strengthCalculator(player: Player): number {
    return new StrengthCalculator(player.persons).strength;
}

function makeCrewCalculator(ability: CrewAbility): (Player) => number {
    return function (player: Player): number {
        return new CrewCalculator(player.persons, ability).total;
    }
}

function hireBonusCalculator(player: Player): number {
    return new HireBonusCalculator(player.persons).bonus;
}

function captainBonusCalculator(player: Player): number {
    return new CaptainBonusCalculator(player.persons).income;
}

function rogueBonusCalculator(player: Player): number {
    return new RogueBonusCalculator(player.persons).income;
}

function hireDiscountCalculator(player: Player): number {
    return new HireDiscountCalculator(player.persons).discount;
}

function makeTraderBonusCalculator(type: ShipType): (Player) => number {
    return function (player: Player): number {
        return new TraderBonusCalculator(player.persons, type).income;
    }
}