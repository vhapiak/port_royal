/// <reference types="phaser" />

import { Card } from "../cards/Card";
import { PirateCard } from "../cards/persons/PirateCard";
import { CaptainCard } from "../cards/persons/CaptainCard";
import { TraderCard } from "../cards/persons/TraderCard";
import { ShipType } from "../cards/ShipType";

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
            ['pirate', buildPirate],
            ['captain', buildCaptain],
            ['trader', buildTrader],
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
        if(json.ship) {
            result += json.ship + '_';
        }
        result += 'p' + json.points;
        result += 'c' + json.cost;
        if(json.strength) {
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

function buildTrader(id: number, json): Card {
    const strToEnum = new Map<string, ShipType>([
        ['pinnace', ShipType.Pinnace],
        ['flute', ShipType.Flute],
    ]);

    if (strToEnum.has(json.ship)) {

        return new TraderCard(id, json.name, json.points, json.cost, strToEnum.get(json.ship));
    }
    throw new Error('Unkown ship type ' + json.ship);
}