const sideType = `
  type Side {
    code: String!
    name: String!
    factions: [Faction]
  }
`;

const typeType = `
  type Type {
    code: String!
    isSubtype: Boolean
    name: String!
    position: Int
    side: Side!
  }
`;

const packType = `
  type Pack {
    code: String!
    cycle: Cycle!
    dateReleased: String!
    ffgId: Int
    name: String!
    position: Int!
    size: Int!
    cards: [Card!]!
  }
`;

const cycleType = `
  type Cycle {
    code: String!
    name: String!
    position: String!
    rotated: Boolean
    size: Int!
    packs: [Pack!]!
  }
`;

const factionType = `
  type Faction {
    code: String!
    color: String
    isMini: Boolean
    name: String!
    side: Side!
  }
`;

const cardType = `
  type Card {
    advancementCost: Int
    agendaPoints: Int
    baseLink: Int
    code: String!
    cost: Int
    deckLimit: Int!
    faction: Faction!
    factionCost: Int
    flavor: String
    illustrator: String
    influenceLimit: Int
    keywords: String
    memoryCost: Int
    minimumDeckSize: Int
    pack: Pack!
    position: Int!
    quantity: Int!
    side: Side!
    strength: Int
    text: String
    title: String!
    trashCost: Int
    type: Type!
    uniqueness: Boolean!
  }
`;

const queryType = `
  type Query {
    cycle(code: String!): Cycle
    cycles: [Cycle]
    side(code: String!): Side
    sides: [Side]
    type(code: String!): Type
    types: [Type]
    card(code: String!): Card
    cards: [Card]
    pack(code: String!): Pack
    packs: [Pack]
    faction(code: String!): Faction
    factions: [Faction]
  }
`;

exports.typeDefs = `
  ${sideType}
  ${typeType}
  ${packType}
  ${cycleType}
  ${factionType}
  ${cardType}

  ${queryType}
`;
