const SIDES = require("./netrunner-cards-json/sides.json");
const TYPES = require("./netrunner-cards-json/types.json");
const CYCLES = require("./netrunner-cards-json/cycles.json");
const PACKS = require("./netrunner-cards-json/packs.json");
const FACTIONS = require("./netrunner-cards-json/factions.json");

const { ALL_CARDS } = require("./cards");

function filterFactions({ code, nameIncludes = "", isMini }) {
  let filteredFactions = FACTIONS;
  if (code) {
    return filteredFactions.filter(faction => faction.side_code === code);
  }
  if (typeof isMini === "boolean") {
    filteredFactions = filteredFactions.filter(
      faction => faction.is_mini === isMini
    );
  }
  if (nameIncludes) {
    filteredFactions = filteredFactions.filter(faction =>
      faction.name.toLowerCase().includes(nameIncludes.toLowerCase())
    );
  }
  return filteredFactions;
}

function filterCards({
  code,
  titleIncludes = "",
  typeCode,
  packCode,
  factionCode,
  sideCode
}) {
  let filteredCards = ALL_CARDS;
  if (code) {
    return filteredCards.filter(card => card.code === code);
  }
  if (titleIncludes) {
    filteredCards = filteredCards.filter(card =>
      card.title.toLowerCase().includes(titleIncludes.toLowerCase())
    );
  }
  if (typeCode) {
    filteredCards = filteredCards.filter(card => card.type_code === typeCode);
  }
  if (packCode) {
    filteredCards = filteredCards.filter(card => card.pack_code === packCode);
  }
  if (factionCode) {
    filteredCards = filteredCards.filter(
      card => card.faction_code === factionCode
    );
  }
  if (sideCode) {
    filteredCards = filteredCards.filter(card => card.side_code === sideCode);
  }
  return filteredCards;
}

function filterSides({ code, nameIncludes }) {
  let filteredSides = SIDES;
  if (code) {
    return filteredSides.filter(side => side.code === code);
  }
  if (nameIncludes) {
    filteredSides = filteredSides.filter(side =>
      side.name.toLowerCase().includes(nameIncludes.toLowerCase())
    );
  }
  return filteredSides;
}

function filterTypes({ code, isSubtype, nameIncludes, sideCode }) {
  let filteredTypes = TYPES;
  if (code) {
    return filteredTypes.filter(type => type.code === code);
  }
  if (typeof isSubtype === "boolean") {
    filteredTypes = filteredTypes.filter(type => type.is_subtype === isSubtype);
  }
  if (nameIncludes) {
    filteredTypes = filteredTypes.filter(type =>
      type.name.toLowerCase().includes(nameIncludes.toLowerCase())
    );
  }
  if (sideCode) {
    filteredTypes = filteredTypes.filter(type => type.side_code === sideCode);
  }
  return filteredTypes;
}

function filterCycles({ code, nameIncludes }) {
  let filteredCycles = CYCLES;
  if (code) {
    return filteredCycles.filter(cycle => cycle.code === code);
  }
  if (nameIncludes) {
    filteredCycles = filteredCycles.filter(cycle =>
      cycle.name.toLowerCase().includes(nameIncludes.toLowerCase())
    );
  }
  return filteredCycles;
}

function filterPacks({ code, nameIncludes, cycleCode }) {
  let filteredPacks = PACKS;
  if (code) {
    return filteredPacks.filter(pack => pack.code === code);
  }
  if (nameIncludes) {
    filteredPacks = filteredPacks.filter(pack =>
      pack.name.toLowerCase().includes(nameIncludes.toLowerCase())
    );
  }
  if (cycleCode) {
    filteredPacks = filteredPacks.filter(pack => pack.cycle_code === cycleCode);
  }
  //TODO: release date
  return filteredPacks;
}

exports.resolvers = {
  Type: {
    cards: ({ code }) => filterCards({ typeCode: code }),
    isSubtype: type => type.is_subtype,
    side: ({ side_code }) => {
      let side = filterTypes({ code: side_code });
      return side ? side[0] : null;
    }
  },
  Pack: {
    dateReleased: pack => pack.date_release,
    ffgId: pack => pack.ffg_id,
    cycle: ({ cycle_code }) => {
      let cycle = filterCycles({ code: cycle_code });
      return cycle ? cycle[0] : null;
    },
    cards: ({ code }) => filterCards({ packCode: code })
  },
  Cycle: {
    packs: ({ code }) => filterPacks({ cycleCode: code })
  },
  Faction: {
    cards: ({ code }) => filterCards({ factionCode: code }),
    isMini: faction => faction.is_mini,
    side: ({ side_code }) => filterSides({ code: side_code })
  },
  Side: {
    cards: ({ code }) => filterCards({ sideCode: code }),
    factions: ({ code }, { nameIncludes, isMini }) =>
      filterFactions({ code, nameIncludes, isMini })
  },
  Card: {
    advancementCost: card => card.advancement_cost,
    agendaPoints: card => card.agenda_points,
    deckLimit: card => card.deck_limit,
    faction: ({ faction_code }) => filterFactions({ code: faction_code }),
    pack: ({ pack_code }) => filterPacks({ code: pack_code }),
    side: ({ side_code }) => filterSides({ code: side_code }),
    type: ({ type_code }) => filterTypes({ code: type_code })
  },
  Query: {
    side: (_, { code }) => {
      const side = filterSides({ code });
      return side ? side[0] : null;
    },
    sides: (_, { nameIncludes }) => filterSides({ nameIncludes }),
    type: (_, { code, isSubtype, nameIncludes }) => {
      const type = filterTypes({ code, isSubtype, nameIncludes });
      return type ? type[0] : null;
    },
    types: () => TYPES,
    card: (_, { code }) => {
      const card = filterCards({ code });
      return card ? card[0] : null;
    },
    cards: (_, { titleIncludes }) => filterCards({ titleIncludes }),
    pack: (_, { code }) => {
      const pack = filterPacks({ code });
      return code ? code[0] : null;
    },
    packs: (_, { nameIncludes }) => filterPacks({ nameIncludes }),
    cycle: (_, { code }) => {
      const cycle = filterCycles({ code });
      return cycle ? cycle[0] : null;
    },
    cycles: (_, { nameIncludes }) => filterCycles({ nameIncludes }),
    faction: (_, { code }) => {
      const faction = filterFactions({ code });
      return faction ? faction[0] : null;
    },
    factions: (_, { nameIncludes, isMini }) =>
      filterFactions({ nameIncludes, isMini })
  }
};
