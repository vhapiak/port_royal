import { ShipCard } from "./ShipCard";
import { TaxCard } from "./TaxCard";
import { ExpeditionCard } from "./ExpeditionCard";
import { PersonCard } from "./PersonCard";

import { PiratCard } from "./persons/PiratCard";
import { TraderCard } from "./persons/TraderCard";
import { CrewCard } from "./persons/CrewCard";
import { MademoiselleCard } from "./persons/MademoiselleCard";
import { AdmiralCard } from "./persons/AdmiralCard";
import { GovernorCard } from "./persons/GovernorCard";
import { JesterCard } from "./persons/JesterCard";

export abstract class CardVisitor {
    visitShip(card: ShipCard): void { }
    visitTax(card: TaxCard): void { }
    visitExpedition(card: ExpeditionCard): void { }
    visitPerson(card: PersonCard): void { }

    visitPirat(card: PiratCard): void { }
    visitTrader(card: TraderCard): void { }
    visitCrew(card: CrewCard): void { }
    visitMademoiselle(card: MademoiselleCard) { }
    visitAdmiral(card: AdmiralCard) { }
    visitGovernor(card: GovernorCard) { }
    visitJester(card: JesterCard) { }
}