const moment = require("moment");

const SIDES = require("./netrunner-cards-json/sides.json");
const TYPES = require("./netrunner-cards-json/types.json");
const CYCLES = require("./netrunner-cards-json/cycles.json").sort(
  (cycleA, cycleB) => (cycleA.position <= cycleB.position ? -1 : 1)
);
const PACKS = require("./netrunner-cards-json/packs.json").sort(
  (packA, packB) => (packA.date_release <= packB.date_release ? -1 : 1)
);
const FACTIONS = require("./netrunner-cards-json/factions.json");
const ROTATIONS = require("./netrunner-cards-json/rotations.json");
const MWL = require("./netrunner-cards-json/mwl.json");
const PREBUILTS = require("./netrunner-cards-json/prebuilts.json");

const { ALL_CARDS } = require("./cards");

const DATE_FORMAT = "YYYY-MM-DD";

function filterFactions({ code, sideCode, nameIncludes = "", isMini }) {
  let filteredFactions = FACTIONS;
  if (code) {
    return filteredFactions.filter(faction => faction.code === code);
  }
  if (sideCode) {
    filteredFactions = filteredFactions.filter(
      faction => faction.side_code === sideCode
    );
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
  textIncludes,
  flavorIncludes,
  subtype,
  cost,
  minCost,
  maxCost,
  agendaPoints,
  minAgendaPoints,
  maxAgendaPoints,
  factionCost,
  minFactionCost,
  maxFactionCost,
  strength,
  minStrength,
  maxStrength,
  advancementCost,
  minAdvancementCost,
  maxAdvancementCost,
  trashCost,
  minTrashCost,
  maxTrashCost,
  uniqueness,
  quantity,
  minQuantity,
  maxQuantity,
  titleIncludes,
  type,
  pack,
  faction,
  side
} = {}) {
  //TODO: Allow sorting by whatever
  let filteredCards = ALL_CARDS;
  if (code) {
    return filteredCards.filter(card => card.code === code);
  }
  if (titleIncludes) {
    filteredCards = filteredCards.filter(card =>
      card.title.toLowerCase().includes(titleIncludes.toLowerCase())
    );
  }
  if (type) {
    filteredCards = filteredCards.filter(card => card.type_code === type);
  }
  if (pack) {
    filteredCards = filteredCards.filter(card => card.pack_code === pack);
  }
  if (faction) {
    filteredCards = filteredCards.filter(card => card.faction_code === faction);
  }
  if (side) {
    filteredCards = filteredCards.filter(card => card.side_code === side);
  }
  if (textIncludes) {
    filteredCards = filteredCards.filter(
      card =>
        card.text &&
        card.text.toLowerCase().includes(textIncludes.toLowerCase())
    );
  }
  if (flavorIncludes) {
    filteredCards = filteredCards.filter(
      card =>
        card.flavor &&
        card.flavor.toLowerCase().includes(flavorIncludes.toLowerCase())
    );
  }
  if (subtype) {
    filteredCards = filteredCards.filter(
      card =>
        card.keywords &&
        card.keywords.toLowerCase().includes(subtype.toLowerCase())
    );
  }
  if (typeof cost === "number") {
    filteredCards = filteredCards.filter(
      card => card.cost && card.cost === cost
    );
  }
  if (typeof minCost === "number") {
    filteredCards = filteredCards.filter(
      card => card.cost && card.cost >= minCost
    );
  }
  if (typeof maxCost === "number") {
    filteredCards = filteredCards.filter(
      card => card.cost && card.cost <= maxCost
    );
  }
  if (typeof agendaPoints === "number") {
    filteredCards = filteredCards.filter(
      card => card.agenda_points && card.agenda_points === agendaPoints
    );
  }
  if (typeof minAgendaPoints === "number") {
    filteredCards = filteredCards.filter(
      card => card.agenda_points && card.agenda_points >= minAgendaPoints
    );
  }
  if (typeof maxAgendaPoints === "number") {
    filteredCards = filteredCards.filter(
      card => card.agenda_points && card.agenda_points <= maxAgendaPoints
    );
  }
  if (typeof factionCost === "number") {
    filteredCards = filteredCards.filter(
      card => card.faction_cost && card.faction_cost === factionCost
    );
  }
  if (typeof minFactionCost === "number") {
    filteredCards = filteredCards.filter(
      card => card.faction_cost && card.faction_cost >= minFactionCost
    );
  }
  if (typeof maxFactionCost === "number") {
    filteredCards = filteredCards.filter(
      card => card.faction_cost && card.faction_cost <= maxFactionCost
    );
  }
  if (typeof strength === "number") {
    filteredCards = filteredCards.filter(
      card => card.strength && card.strength === strength
    );
  }
  if (typeof minStrength === "number") {
    filteredCards = filteredCards.filter(
      card => card.strength && card.strength >= minStrength
    );
  }
  if (typeof maxStrength === "number") {
    filteredCards = filteredCards.filter(
      card => card.strength && card.strength <= maxStrength
    );
  }
  if (typeof advancementCost === "number") {
    filteredCards = filteredCards.filter(
      card => card.advancement_cost && card.advancement_cost === advancementCost
    );
  }
  if (typeof minAdvancementCost === "number") {
    filteredCards = filteredCards.filter(
      card =>
        card.advancement_cost && card.advancement_cost >= minAdvancementCost
    );
  }
  if (typeof maxAdvancementCost === "number") {
    filteredCards = filteredCards.filter(
      card =>
        card.advancement_cost && card.advancement_cost <= maxAdvancementCost
    );
  }
  if (typeof trashCost === "number") {
    filteredCards = filteredCards.filter(
      card => card.trash_cost && card.trash_cost === trashCost
    );
  }
  if (typeof minTrashCost === "number") {
    filteredCards = filteredCards.filter(
      card => card.trash_cost && card.trash_cost >= minTrashCost
    );
  }
  if (typeof maxTrashCost === "number") {
    filteredCards = filteredCards.filter(
      card => card.trash_cost && card.trash_cost <= maxTrashCost
    );
  }
  if (typeof uniqueness === "boolean") {
    filteredCards = filteredCards.filter(
      card => card.uniqueness === uniqueness
    );
  }
  if (typeof quantity === "number") {
    filteredCards = filteredCards.filter(
      card => card.quantity && card.quantity === quantity
    );
  }
  if (typeof minQuantity === "number") {
    filteredCards = filteredCards.filter(
      card => card.quantity && card.quantity >= minQuantity
    );
  }
  if (typeof maxQuantity === "number") {
    filteredCards = filteredCards.filter(
      card => card.quantity && card.quantity <= maxQuantity
    );
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

function filterCycles({ code, nameIncludes, isRotated, includeDraft }) {
  let filteredCycles = CYCLES;
  if (code) {
    return filteredCycles.filter(cycle => cycle.code === code);
  }
  if (nameIncludes) {
    filteredCycles = filteredCycles.filter(cycle =>
      cycle.name.toLowerCase().includes(nameIncludes.toLowerCase())
    );
  }
  if (typeof isRotated === "boolean") {
    filteredCycles = filteredCycles.filter(
      cycle => cycle.rotated === isRotated
    );
  }
  if (!includeDraft) {
    filteredCycles = filteredCycles.filter(cycle => cycle.code !== "draft");
  }
  return filteredCycles;
}

function filterPacks({
  code,
  nameIncludes,
  cycleCode,
  includeDraft,
  releasedAfter,
  releasedBefore
}) {
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
  if (!includeDraft) {
    filteredPacks = filteredPacks.filter(pack => pack.code !== "draft");
  }
  if (releasedAfter) {
    filteredPacks = filteredPacks.filter(pack =>
      moment(pack.date_release, DATE_FORMAT).isSameOrAfter(
        moment(releasedAfter, DATE_FORMAT)
      )
    );
  }
  if (releasedBefore) {
    filteredPacks = filteredPacks.filter(pack =>
      moment(pack.date_release, DATE_FORMAT).isSameOrBefore(
        moment(releasedBefore, DATE_FORMAT)
      )
    );
  }
  return filteredPacks;
}

function filterRotations({ code, nameIncludes, startedAfter, includesCycle }) {
  let filteredRotations = ROTATIONS;

  if (code) {
    return filteredRotations.filter(rotation => rotation.code === code);
  }

  if (nameIncludes) {
    filteredRotations = filteredRotations.filter(rotation =>
      rotation.name.toLowerCase().includes(nameIncludes.toLowerCase())
    );
  }
  if (startedAfter) {
    filteredRotations = filteredRotations.filter(rotation =>
      moment(rotation.date_start, DATE_FORMAT).isSameOrAfter(
        moment(startedAfter, DATE_FORMAT)
      )
    );
  }
  if (includesCycle) {
    filteredRotations = filteredRotations.filter(rotation =>
      rotation.cycles.includes(includesCycle)
    );
  }

  return filteredRotations;
}

function filterMWLs({ code, nameIncludes, startedAfter }) {
  if (code) {
    return MWL.filter(mwl => mwl.code === code);
  }
  let filteredMWLs = MWL;

  if (nameIncludes) {
    filteredMWLs = filteredMWLs.filter(mwl =>
      mwl.name.toLowerCase().includes(nameIncludes.toLowerCase())
    );
  }
  if (startedAfter) {
    filteredMWLs = filteredMWLs.filter(mwl =>
      moment(mwl.date_start, DATE_FORMAT).isSameOrAfter(
        moment(startedAfter, DATE_FORMAT)
      )
    );
  }

  return filteredMWLs;
}

function filterPrebuilts({ code, nameIncludes }) {
  if (code) {
    return PREBUILTS.filter(prebuilt => prebuilt.code === code);
  }

  let filteredPrebuilts = PREBUILTS;

  if (nameIncludes) {
    filteredPrebuilts = filteredPrebuilts.filter(prebuilt =>
      prebuilt.name.toLowerCase().includes(nameIncludes.toLowerCase())
    );
  }

  return filteredPrebuilts;
}

const CardResolvers = {
  baseLink: card => card.base_link,
  deckLimit: card => card.deck_limit,
  factionCost: card => card.faction_cost,
  influenceLimit: card => card.influence_limit,
  minimumDeckSize: card => card.minimum_deck_size,
  memoryCost: card => card.memory_cost,
  trashCost: card => card.trash_cost,
  commons: {
    faction: ({ faction_code }) => {
      const faction = filterFactions({ code: faction_code });
      return faction ? faction[0] : null;
    },
    pack: ({ pack_code }) => {
      const pack = filterPacks({ code: pack_code });
      return pack ? pack[0] : null;
    },
    side: ({ side_code }) => {
      const side = filterSides({ code: side_code });
      return side ? side[0] : null;
    },
    type: ({ type_code }) => {
      const type = filterTypes({ code: type_code });
      return type ? type[0] : null;
    }
  }
};

exports.resolvers = {
  Type: {
    cards: ({ code }, { filter }) => filterCards({ type: code, ...filter }),
    isSubtype: type => type.is_subtype,
    side: ({ side_code }) => {
      let side = filterSides({ code: side_code });
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
    cards: ({ code }, { filter }) => filterCards({ pack: code, ...filter })
  },
  Cycle: {
    packs: (
      { code },
      { nameIncludes, includeDraft, releasedAfter, releasedBefore }
    ) =>
      filterPacks({
        cycleCode: code,
        nameIncludes,
        includeDraft,
        releasedAfter,
        releasedBefore
      })
  },
  Faction: {
    cards: ({ code }, { filter }) => filterCards({ faction: code, ...filter }),
    isMini: faction => faction.is_mini,
    side: ({ side_code }) => filterSides({ code: side_code })
  },
  Side: {
    cards: ({ code }, { filter }) => filterCards({ side: code, ...filter }),
    factions: ({ code }, { nameIncludes, isMini }) =>
      filterFactions({ sideCode: code, nameIncludes, isMini })
  },
  Rotation: {
    cycles: ({ cycles: cycleCodes }) => {
      return CYCLES.filter(cycle => {
        return cycleCodes.includes(cycle.code);
      });
    },
    dateStart: rotation => rotation.date_start
  },
  MWL: {
    cards: ({ cards: cardCodes }) => {
      const cards = [];
      for (const cardCode in cardCodes) {
        if (cardCodes.hasOwnProperty(cardCode)) {
          const card = cardCodes[cardCode];
          card.code = cardCode;
          cards.push(card);
        }
      }
      return cards;
    },
    dateStart: mwl => mwl.date_start
  },
  MWLEntry: {
    card: ({ code }) => {
      const card = filterCards({ code });
      return card ? card[0] : null;
    },
    globalPenalty: mwlenty => mwlenty.global_penalty,
    universalFactionCost: mwlenty => mwlenty.universal_faction_cost,
    isRestricted: mwlenty => mwlenty.is_restricted,
    deckLimit: mwlenty => mwlenty.deck_limit
  },
  Prebuilt: {
    cards: ({ cards }) => {
      const prebuiltCards = [];
      for (const cardCode in cards) {
        if (cards.hasOwnProperty(cardCode)) {
          const quantity = cards[cardCode];
          prebuiltCards.push({
            card: cardCode,
            quantity
          });
        }
      }
      return prebuiltCards;
    },
    dateReleased: prebuilt => prebuilt.date_release
  },
  PrebuiltCard: {
    card: ({ card: code }) => {
      const card = filterCards({ code });
      return card ? card[0] : null;
    }
  },
  ICard: {
    __resolveType: card => {
      switch (card.type_code) {
        case "identity":
          return "Identity";

        case "agenda":
          return "Agenda";

        case "asset":
          return "Asset";

        case "ice":
        case "barrier":
        case "code-gate":
        case "sentry":
          return "Ice";

        case "event":
          return "Event";

        case "hardware":
          return "Hardware";

        case "icebreaker":
          return "Icebreaker";

        case "operation":
          return "Operation";

        case "program":
          return "Program";

        case "resource":
          return "Resource";

        case "upgrade":
          return "Upgrade";

        default:
          return null;
      }
    }
  },
  Agenda: {
    advancementCost: card => card.advancement_cost,
    agendaPoints: card => card.agenda_points,
    deckLimit: CardResolvers.deckLimit,
    ...CardResolvers.commons
  },
  Asset: {
    factionCost: CardResolvers.factionCost,
    deckLimit: CardResolvers.deckLimit,
    trashCost: CardResolvers.trashCost,
    ...CardResolvers.commons
  },
  Event: {
    factionCost: CardResolvers.factionCost,
    deckLimit: CardResolvers.deckLimit,
    ...CardResolvers.commons
  },
  Hardware: {
    factionCost: CardResolvers.factionCost,
    deckLimit: CardResolvers.deckLimit,
    ...CardResolvers.commons
  },
  Ice: {
    factionCost: CardResolvers.factionCost,
    deckLimit: CardResolvers.deckLimit,
    trashCost: CardResolvers.trashCost,
    ...CardResolvers.commons
  },
  Icebreaker: {
    factionCost: CardResolvers.factionCost,
    deckLimit: CardResolvers.deckLimit,
    ...CardResolvers.commons
  },
  Identity: {
    influenceLimit: CardResolvers.influenceLimit,
    minimumDeckSize: CardResolvers.minimumDeckSize,
    ...CardResolvers.commons
  },
  Operation: {
    factionCost: CardResolvers.factionCost,
    deckLimit: CardResolvers.deckLimit,
    trashCost: CardResolvers.trashCost,
    ...CardResolvers.commons
  },
  Program: {
    memoryCost: CardResolvers.memoryCost,
    factionCost: CardResolvers.factionCost,
    deckLimit: CardResolvers.deckLimit,
    ...CardResolvers.commons
  },
  Resource: {
    factionCost: CardResolvers.factionCost,
    deckLimit: CardResolvers.deckLimit,
    ...CardResolvers.commons
  },
  Upgrade: {
    factionCost: CardResolvers.factionCost,
    deckLimit: CardResolvers.deckLimit,
    trashCost: CardResolvers.trashCost,
    ...CardResolvers.commons
  },
  Query: {
    side: (_, { code }) => {
      const side = filterSides({ code });
      return side ? side[0] : null;
    },
    sides: (_, { nameIncludes }) => filterSides({ nameIncludes }),
    type: (_, { code }) => {
      const type = filterTypes({ code });
      return type ? type[0] : null;
    },
    types: (_, { isSubtype, nameIncludes }) =>
      filterTypes({ isSubtype, nameIncludes }),
    card: (_, { code }) => {
      const card = filterCards({ code });
      return card ? card[0] : null;
    },
    cards: (_, { filter }) => {
      return filterCards(filter);
    },
    pack: (_, { code }) => {
      const pack = filterPacks({ code });
      return pack ? pack[0] : null;
    },
    packs: (
      _,
      { nameIncludes, includeDraft, releasedAfter, releasedBefore }
    ) => {
      return filterPacks({
        nameIncludes,
        includeDraft,
        releasedAfter,
        releasedBefore
      });
    },
    cycle: (_, { code }) => {
      const cycle = filterCycles({ code });
      return cycle ? cycle[0] : null;
    },
    cycles: (_, { nameIncludes, isRotated, includeDraft }) =>
      filterCycles({ nameIncludes, isRotated, includeDraft }),
    faction: (_, { code }) => {
      const faction = filterFactions({ code });
      return faction ? faction[0] : null;
    },
    factions: (_, { nameIncludes, isMini }) =>
      filterFactions({ nameIncludes, isMini }),
    rotation: (_, { code }) => {
      const rotation = filterRotations({ code });
      return rotation ? rotation[0] : null;
    },
    rotations: (_, { nameIncludes, startedAfter, includesCycle }) =>
      filterRotations({ nameIncludes, startedAfter, includesCycle }),
    mwl: (_, { code }) => {
      const mwl = filterMWLs({ code });
      return mwl ? mwl[0] : null;
    },
    mwls: (_, { nameIncludes, startedAfter }) =>
      filterMWLs({ nameIncludes, startedAfter }),
    prebuilt: (_, { code }) => {
      const prebuilt = filterPrebuilts({ code });
      return prebuilt ? prebuilt[0] : null;
    },
    prebuilts: (_, { nameIncludes }) => filterPrebuilts({ nameIncludes })
  }
};
