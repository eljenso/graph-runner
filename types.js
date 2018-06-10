const sideType = `
  type Side {
    code: String!
    name: String!
    factions(nameIncludes: String, isMini: Boolean): [Faction]
    cards: [Card]
  }
`;

const typeType = `
  type Type {
    code: String!
    isSubtype: Boolean
    name: String!
    position: Int
    side: Side!
    cards: [Card]
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
    cards(titleIncludes: String): [Card!]!
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
    cards: [Card!]!
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
    cycles(nameIncludes: String): [Cycle]
    side(code: String!): Side
    sides(nameIncludes: String): [Side]
    type(code: String, isSubtype: Boolean, nameIncludes: String): Type
    types: [Type]
    card(code: String!): Card
    cards(titleIncludes: String): [Card]
    pack(code: String!): Pack
    packs(nameIncludes: String): [Pack]
    faction(code: String!): Faction
    factions(nameIncludes: String, isMini: Boolean): [Faction]
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
