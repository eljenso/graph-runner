const FIELDS = {
  Cards: "cards(filter: FilterCards): [ICard!]!",
  Factions: "factions(nameIncludes: String, isMini: Boolean): [Faction]",
  Packs: `
    packs(
      nameIncludes: String,
      "Only include packs released after or on this date. Must be of format 'YYYY-MM-DD', e.g. 2014-02-21"
      releasedAfter: String,
      "Only include packs released before or on this date. Must be of format 'YYYY-MM-DD', e.g. 2014-02-21"
      releasedBefore: String,
      "Whether to include draft pack or not (default is false)"
      includeDraft: Boolean = false
    ): [Pack!]!
  `
};

const SideType = `
  "Sides in the game (either Corp or Runner)"
  type Side {
    code: String!
    name: String!
    "All factions of a side"
    ${FIELDS.Factions}
    "All cards of a side"
    ${FIELDS.Cards}
  }
`;

const TypeType = `
  "All the different card types (including subtypes)"
  type Type {
    code: String!
    isSubtype: Boolean
    name: String!
    position: Int
    side: Side!
    "All cards having this (sub)type"
    ${FIELDS.Cards}
  }
`;

const CycleType = `
  "Set of packs. By default does not include 'draft'."
  type Cycle {
    code: String!
    name: String!
    position: String!
    rotated: Boolean
    size: Int!
    ${FIELDS.Packs}
  }
`;

const PackType = `
  "By default does not include 'draft'."
  type Pack {
    code: String!
    cycle: Cycle!
    dateReleased: String!
    ffgId: Int
    name: String!
    position: Int!
    size: Int!
    ${FIELDS.Cards}
  }
`;

const FactionType = `
  type Faction {
    code: String!
    "The primary color a faction"
    color: String
    isMini: Boolean
    name: String!
    side: Side!
    ${FIELDS.Cards}
  }
`;

const FilterCardsInput = `
  """
  Object for filterting cards.
  Was implemented because there are many attributes on each card.
  """
  input FilterCards {
    textIncludes: String
    flavorIncludes: String
    subtype: String
    cost: Int
    minCost: Int
    maxCost: Int
    agendaPoints: Int
    minAgendaPoints: Int
    maxAgendaPoints: Int
    factionCost: Int
    minFactionCost: Int
    maxFactionCost: Int
    strength: Int
    minStrength: Int
    maxStrength: Int
    advancementCost: Int
    minAdvancementCost: Int
    maxAdvancementCost: Int
    trashCost: Int
    minTrashCost: Int
    maxTrashCost: Int
    uniqueness: Boolean
    quantity: Int
    minQuantity: Int
    maxQuantity: Int
    titleIncludes: String
    type: String
    pack: String
    faction: String
    side: String
  }
`;

const CardInterfaceFields = `
  code: String!
  faction: Faction!
  flavor: String
  illustrator: String
  keywords: String
  pack: Pack!
  position: Int!
  quantity: Int!
  side: Side!
  text: String
  title: String!
  type: Type!
  uniqueness: Boolean!
`;

const CardInterface = `
  "Common card interface which has all common attributes shared across all card types."
  interface ICard {
    ${CardInterfaceFields}
  }
`;

const AgendaType = `
  type Agenda implements ICard {
    ${CardInterfaceFields}
    advancementCost: Int!
    agendaPoints: Int!
    deckLimit: Int!
  }
`;
const AssetType = `
  type Asset implements ICard {
    ${CardInterfaceFields}
    cost: Int!
    factionCost: Int!
    deckLimit: Int!
    trashCost: Int
  }
`;
const EventType = `
  type Event implements ICard {
    ${CardInterfaceFields}
    cost: Int!
    factionCost: Int!
    deckLimit: Int!
  }
`;
const HardwareType = `
  type Hardware implements ICard {
    ${CardInterfaceFields}
    cost: Int!
    factionCost: Int!
    deckLimit: Int!
  }
`;
const IceType = `
  type Ice implements ICard {
    ${CardInterfaceFields}
    cost: Int!
    factionCost: Int!
    deckLimit: Int!
    strength: Int
    trashCost: Int
  }
`;
const IcebreakerType = `
  type Icebreaker implements ICard {
    ${CardInterfaceFields}
    cost: Int!
    factionCost: Int!
    deckLimit: Int!
    strength: Int
  }
`;
const IdentityType = `
  type Identity implements ICard {
    ${CardInterfaceFields}
    baseLink: Int
    influenceLimit: Int!
    minimumDeckSize: Int!
  }
`;
const OperationType = `
  type Operation implements ICard {
    ${CardInterfaceFields}
    cost: Int!
    factionCost: Int!
    deckLimit: Int!
    trashCost: Int
  }
`;
const ProgramType = `
  type Program implements ICard {
    ${CardInterfaceFields}
    cost: Int!
    memoryCost: Int!
    factionCost: Int!
    deckLimit: Int!
  }
`;
const ResourceType = `
  type Resource implements ICard {
    ${CardInterfaceFields}
    cost: Int!
    factionCost: Int!
    deckLimit: Int!
  }
`;
const UpgradeType = `
  type Upgrade implements ICard {
    ${CardInterfaceFields}
    cost: Int!
    factionCost: Int!
    deckLimit: Int!
    trashCost: Int
  }
`;

const RotationType = `
  type Rotation {
    code: String!
    cycles: [Cycle!]!
    name: String!
    dateStart: String!
  }
`;

const MWLType = `
  type MWLEntry {
    card: ICard!
    globalPenalty: Int
    universalFactionCost: Int
    isRestricted: Int
    deckLimit: Int
  }

  type MWL {
    code: String!
    cards: [MWLEntry!]!
    name: String!
    dateStart: String!
  }
`;

const QueryType = `
  type Query {
    "Get single cycle by code"
    cycle(code: String!): Cycle

    "Get cycles by filters"
    cycles(
      nameIncludes: String,
      isRotated: Boolean,
      "Whether to include draft cycle or not (default is false)"
      includeDraft: Boolean = false
    ): [Cycle!]!

    "Get single side by code"
    side(code: String!): Side

    "Get sides by filters"
    sides(nameIncludes: String): [Side!]!

    "Get single type by code"
    type(code: String!): Type

    "Get sides by filters"
    types(isSubtype: Boolean, nameIncludes: String): [Type!]!

    "Get single card by code"
    card(code: String!): ICard

    "Get cards by filters"
    ${FIELDS.Cards}

    "Get single pack by code"
    pack(code: String!): Pack

    "Get packs by filters"
    ${FIELDS.Packs}

    "Get single faction by code"
    faction(code: String!): Faction

    "Get factions by filters"
    ${FIELDS.Factions}

    "Get rotation by code"
    rotation(code: String!): Rotation

    "Get rotation by filters"
    rotations(
      nameIncludes: String,
      startedAfter: String,
      includesCycle: String
    ): [Rotation!]!

    "Get MWL version by code"
    mwl(code: String!): MWL

    "Get MWL by filters"
    mwls(
      nameIncludes: String,
      startedAfter: String
    ): [MWL!]!
  }
`;

exports.typeDefs = `
  ${FilterCardsInput}

  ${SideType}
  ${TypeType}
  ${PackType}
  ${CycleType}
  ${FactionType}
  ${CardInterface}

  ${AgendaType}
  ${AssetType}
  ${EventType}
  ${HardwareType}
  ${IceType}
  ${IcebreakerType}
  ${IdentityType}
  ${OperationType}
  ${ResourceType}
  ${ProgramType}
  ${UpgradeType}

  ${RotationType}
  ${MWLType}

  ${QueryType}
`;
