const SideType = `
  type Side {
    code: String!
    name: String!
    factions(nameIncludes: String, isMini: Boolean): [Faction]
    cards: [Card]
  }
`;

const TypeType = `
  type Type {
    code: String!
    isSubtype: Boolean
    name: String!
    position: Int
    side: Side!
    cards: [Card]
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
    cards(titleIncludes: String): [Card!]!
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
    cards: [Card!]!
  }
`;

const CardInterface = `
  interface ICard {
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
  }
`;

const AgendaType = `
  type Agenda implements ICard {
    advancementCost: Int!
    agendaPoints: Int!
    deckLimit: Int!
  }
`;
const AssetType = `
  type Asset implements ICard {
    cost: Int!
    factionCost: Int!
    deckLimit: Int!
    trashCost: Int
  }
`;
const EventType = `
  type Event implements ICard {
    cost: Int!
    factionCost: Int!
    deckLimit: Int!
  }
`;
const HardwareType = `
  type Hardware implements ICard {
    cost: Int!
    factionCost: Int!
    deckLimit: Int!
  }
`;
const IceType = `
  type Ice implements ICard {
    cost: Int!
    factionCost: Int!
    deckLimit: Int!
    strength: Int
    trashCost: Int
  }
`;
const IcebreakerType = `
  type Icebreaker implements ICard {
    cost: Int!
    factionCost: Int!
    deckLimit: Int!
    strength: Int
  }
`;
const IdentityType = `
  type Identity implements ICard {
    baseLink: Int
    influenceLimit: Int!
    minimumDeckSize: Int!
  }
`;
const OperationType = `
  type Operation implements ICard {
    cost: Int!
    factionCost: Int!
    deckLimit: Int!
    trashCost: Int
  }
`;
const ProgramType = `
  type Program implements ICard {
    cost: Int!
    memoryCost: Int!
    factionCost: Int!
    deckLimit: Int!
  }
`;
const ResourceType = `
  type Resource implements ICard {
    cost: Int!
    factionCost: Int!
    deckLimit: Int!
  }
`;
const UpgradeType = `
  type Upgrade implements ICard {
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
    cards(titleIncludes: String): [ICard]
    pack(code: String!): Pack
    packs(nameIncludes: String): [Pack]
    faction(code: String!): Faction
    factions(nameIncludes: String, isMini: Boolean): [Faction]
  }
`;

exports.typeDefs = `
  ${SideType}
  ${TypeType}
  ${PackType}
  ${CycleType}
  ${FactionType}
  ${CardInterface}

  ${QueryType}
`;
