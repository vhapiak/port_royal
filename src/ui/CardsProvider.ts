/// <reference types="phaser" />

import { Card } from "../cards/Card";
import { PirateCard } from "../cards/persons/PirateCard";
import { CaptainCard } from "../cards/persons/CaptainCard";
import { TraderCard } from "../cards/persons/TraderCard";
import { ShipType } from "../cards/ShipType";
import { RogueCard } from "../cards/persons/RogueCard";
import { CourtesanCard } from "../cards/persons/CourtesanCard";
import { CrewCard } from "../cards/persons/CrewCard";
import { CrewAbility } from "../cards/CrewAbility";
import { ShipCard } from "../cards/ShipCard";
import { GovernorCard } from "../cards/persons/GovernorCard";
import { TaxCard, BonusType } from "../cards/TaxCard";
import { ExpeditionCard } from "../cards/ExpeditionCard";

export type CardTexture = {
    atlas: string;
    frame: string;
}

export class CardsProvider {

    idToTexture = new Map<number, CardTexture>();
    cards: Card[] = [];

    constructor(scene: Phaser.Scene) {
        const deckJson = scene.cache.json.get('deck');

        const cardToTexture = this.generateCardsTexturesMap(scene);

        const cardsBuilders = new Map<string, (id: number, json: any) => Card>([
            ['ship', buildShip],
            ['pirate', buildPirate],
            ['captain', buildCaptain],
            ['trader', buildTrader],
            ['governor', buildGovernor],
            ['courtesan', buildCourtesan],
            ['rogue', buildRogue],
            ['crew', buildCrew],
            ['tax', buildTax],
            ['expedition', buildExpedition],
        ]);

        let globalId = 0;
        for (let json of deckJson) {
            if (!cardsBuilders.has(json.type)) {
                throw new Error('Unkown card type ' + json.type);
            }

            const textureName = this.generateTextureName(json);
            if (!cardToTexture.has(textureName)) {
                throw new Error('There is no texture for the card ' + textureName);
            }

            for (let i = 0; i < json.copy; ++i) {
                const id = globalId++;
                const builder = cardsBuilders.get(json.type);
                this.cards.push(builder(id, json));
                this.idToTexture.set(id, cardToTexture.get(textureName));
            }
        }

    }

    getCards(): Card[] {
        return this.cards;
    }

    getCardTexture(id: number): CardTexture {
        return this.idToTexture.get(id);
    }

    private generateCardsTexturesMap(scene: Phaser.Scene): Map<string, CardTexture> {
        const map = new Map<string, CardTexture>();

        scene.cache.json.getKeys().forEach(name => {
            if (name.startsWith('card_atlas')) {
                const atlasJson = scene.cache.json.get(name);
                for (let frame of atlasJson.frames) {
                    if (map.has(frame.filename)) {
                        throw new Error(
                            'Card atlas duplicates card name ' + frame.filename +
                            ' defined in ' + JSON.stringify(map.get(frame.filename)));
                    }
                    map.set(frame.filename, {
                        atlas: name,
                        frame: frame.filename
                    });
                }
            }
        });

        return map;
    }

    private generateTextureName(json): string {
        let result: string = json.type + '_';
        if (json.ship !== undefined) {
            result += json.ship + '_';
        }
        if (json.ability !== undefined) {
            result += json.ability + '_';
        }
        if (json.bonus !== undefined) {
            result += json.bonus;
        }
        if (json.sailor !== undefined) {
            for (let i = 0; i < json.sailor; ++i) {
                result += 'sa_';
            }
        }
        if (json.chaplain !== undefined) {
            for (let i = 0; i < json.chaplain; ++i) {
                result += 'ch_';
            }
        }
        if (json.carpenter !== undefined) {
            for (let i = 0; i < json.carpenter; ++i) {
                result += 'ca_';
            }
        }
        if (json.points !== undefined) {
            result += 'p' + json.points;
        }
        if (json.cost !== undefined) {
            result += 'c' + json.cost;
        }
        if (json.strength !== undefined) {
            result += 's' + json.strength;
        }
        return result;
    }
}

function buildPirate(id: number, json): Card {
    return new PirateCard(id, json.name, json.points, json.cost, json.strength);
}

function buildCaptain(id: number, json): Card {
    return new CaptainCard(id, json.name, json.points, json.cost);
}

function buildRogue(id: number, json): Card {
    return new RogueCard(id, json.name, json.points, json.cost);
}

function buildCourtesan(id: number, json): Card {
    return new CourtesanCard(id, json.name, json.points, json.cost);
}

function buildGovernor(id: number, json): Card {
    return new GovernorCard(id, json.name, json.points, json.cost);
}

function buildCrew(id: number, json): Card {
    const strToEnum = new Map<string, CrewAbility>([
        ['sailor', CrewAbility.Sailor],
        ['chaplain', CrewAbility.Chaplain],
        ['carpenter', CrewAbility.Carpenter],
        ['mercenary', CrewAbility.Mercenary],
    ]);
    if (strToEnum.has(json.ability)) {
        return new CrewCard(id, json.name, json.points, json.cost, strToEnum.get(json.ability));
    }
    throw new Error('Unknown ability ' + json.ability); 
}

function buildExpedition(id: number, json): Card {
    let abilities: CrewAbility[] = [];
    if (json.sailor !== undefined) {
        for (let i = 0; i < json.sailor; ++i) {
            abilities.push(CrewAbility.Sailor);
        }
    }    
    if (json.chaplain !== undefined) {
        for (let i = 0; i < json.chaplain; ++i) {
            abilities.push(CrewAbility.Chaplain);
        }
    }   
    if (json.carpenter !== undefined) {
        for (let i = 0; i < json.carpenter; ++i) {
            abilities.push(CrewAbility.Carpenter);
        }
    }
    return new ExpeditionCard(id, json.name, json.cost, json.points, abilities);
}

function buildTax(id: number, json): Card {
    const strToEnum = new Map<string, BonusType>([
        ['strength', BonusType.MaxStrength],
        ['points', BonusType.MinPoints],
    ]);
    if (strToEnum.has(json.bonus)) {
        return new TaxCard(id, json.name, strToEnum.get(json.bonus));
    }
    throw new Error('Unknown bonus ' + json.bonus); 
}

function getStr2ShipType(): Map<string, ShipType> {
    return new Map<string, ShipType>([
        ['pinnace', ShipType.Pinnace],
        ['flute', ShipType.Flute],
        ['frigate', ShipType.Frigate],
        ['galleon', ShipType.Galleon],
        ['brig', ShipType.Brig],
    ]);
}

function buildShip(id: number, json) {
    const strToEnum = getStr2ShipType();
    if (strToEnum.has(json.ship)) {
        let strength = json.strength; 
        if (strength === 'i') {
            strength = ShipCard.IMMORTAL_STRENGTH;
        }
        return new ShipCard(id, json.name, strToEnum.get(json.ship), json.cost, strength);
    }
    throw new Error('Unkown ship type ' + json.ship);
}

function buildTrader(id: number, json): Card {
    const strToEnum = getStr2ShipType();

    if (strToEnum.has(json.ship)) {

        return new TraderCard(id, json.name, json.points, json.cost, strToEnum.get(json.ship));
    }
    throw new Error('Unkown ship type ' + json.ship);
}