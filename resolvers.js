const sides = require("./netrunner-cards-json/sides.json");
const types = require("./netrunner-cards-json/types.json");
const cycles = require("./netrunner-cards-json/cycles.json");
const packs = require("./netrunner-cards-json/packs.json");
const factions = require("./netrunner-cards-json/factions.json");

const { allCards } = require("./cards");

exports.resolvers = {
  Type: {
    isSubtype: type => type.is_subtype,
    side: type => sides.find(side => type.side_code === side.code)
  },
  Pack: {
    dateReleased: pack => pack.date_release,
    ffgId: pack => pack.ffg_id,
    cycle: pack => cycles.find(cycle => pack.cycle_code === cycle.code),
    cards: pack => allCards.filter(card => pack.code === card.pack_code)
  },
  Cycle: {
    packs: cycle => packs.filter(pack => pack.cycle_code === cycle.code)
  },
  Faction: {
    isMini: faction => faction.is_mini,
    side: faction => sides.find(side => faction.side_code === side.code)
  },
  Side: {
    factions: side =>
      factions.filter(faction => faction.side_code === side.code)
  },
  Card: {
    advancementCost: card => card.advancement_cost,
    agendaPoints: card => card.agenda_points,
    deckLimit: card => card.deck_limit,
    faction: card =>
      factions.find(faction => card.faction_code === faction.code),
    pack: card => packs.find(pack => card.pack_code === pack.code),
    side: card => sides.find(side => card.side_code === side.code),
    type: card => types.find(type => card.type_code === type.code)
  },
  Query: {
    side: (_, { code }) => sides.find(side => side.code === code),
    sides: () => sides,
    type: (_, { code }) => types.find(type => type.code === code),
    types: () => types,
    card: (_, { code }) => allCards.find(card => card.code === code),
    cards: () => allCards,
    pack: (_, { code }) => packs.find(pack => pack.code === code),
    packs: () => packs,
    cycle: (_, { code }) => cycles.find(cycle => cycle.code === code),
    cycles: () => cycles,
    faction: (_, { code }) => factions.find(faction => faction.code === code),
    factions: () => factions
  }
};
