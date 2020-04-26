import { ShipCard } from "./ShipCard";
import { TaxCard } from "./TaxCard";
import { ExpeditionCard } from "./ExpeditionCard";
import { PersonCard } from "./PersonCard";

import { PirateCard } from "./persons/PirateCard";
import { TraderCard } from "./persons/TraderCard";
import { CrewCard } from "./persons/CrewCard";
import { CourtesanCard } from "./persons/CourtesanCard";
import { GovernorCard } from "./persons/GovernorCard";
import { CaptainCard } from "./persons/CaptainCard";
import { RogueCard } from "./persons/RogueCard";

export abstract class CardVisitor {
    visitShipCard(card: ShipCard): void { }
    visitTaxCard(card: TaxCard): void { }
    visitExpeditionCard(card: ExpeditionCard): void { }
    visitPersonCard(card: PersonCard): void { }

    visitPirateCard(card: PirateCard): void { }
    visitTraderCard(card: TraderCard): void { }
    visitCrewCard(card: CrewCard): void { }
    visitCourtesanCard(card: CourtesanCard): void { }
    visitGovernorCard(card: GovernorCard): void { }
    visitCaptainCard(card: CaptainCard): void { }
    visitRogueCard(card: RogueCard): void { }
}