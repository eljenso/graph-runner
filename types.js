const SideType = `
  type Side {
    code: String!
    name: String!
    factions(nameIncludes: String, isMini: Boolean): [Faction]
    cards(filter: FilterCards): [ICard]
  }
`;

const TypeType = `
  type Type {
    code: String!
    isSubtype: Boolean
    name: String!
    position: Int
    side: Side!
    cards(filter: FilterCards): [ICard]
  }
`;

const PackType = `
  type Pack {
    code: String!
    cycle: Cycle!
    dateReleased: String!
    ffgId: Int
    name: String!
    position: Int!
    size: Int!
    cards(filter: FilterCards): [ICard!]!
  }
`;

const CycleType = `
  type Cycle {
    code: String!
    name: String!
    position: String!
    rotated: Boolean
    size: Int!
    packs: [Pack!]!
  }
`;

const FactionType = `
  type Faction {
    code: String!
    color: String
    isMini: Boolean
    name: String!
    side: Side!
    cards(filter: FilterCards): [ICard!]!
  }
`;

const FilterCardsInput = `
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

const QueryType = `
  type Query {
    cycle(code: String!): Cycle
    cycles(nameIncludes: String): [Cycle]
    side(code: String!): Side
    sides(nameIncludes: String): [Side]
    type(code: String, isSubtype: Boolean, nameIncludes: String): Type
    types: [Type]
    card(code: String!): ICard
    cards(filter: FilterCards): [ICard]
    pack(code: String!): Pack
    packs(nameIncludes: String): [Pack]
    faction(code: String!): Faction
    factions(nameIncludes: String, isMini: Boolean): [Faction]
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

  ${QueryType}
`;
