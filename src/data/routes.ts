// data/routes.ts

export type RoutePokemon = {
  species: string;
  encounterType:
    | "grass"
    | "cave"
    | "surf"
    | "gift"
    | "radar"
    | "honey"
    | "fish-old"
    | "fish-great"
    | "fish-super";
  rate: number;
};

export interface Sublocation {
  name: string;
  availablePokemon: RoutePokemon[];
}

export interface Route {
  name: string;
  availablePokemon?: RoutePokemon[];
  sublocations?: Sublocation[]; // multi-floor/area routes
}

export const routes: Route[] = [
  {
    name: "Twinleaf Town",
    availablePokemon: [
      { species: "Eevee", encounterType: "gift", rate: 5 },
      { species: "Psyduck", encounterType: "surf", rate: 90 },
      { species: "Golduck", encounterType: "surf", rate: 10 },
      { species: "Magikarp", encounterType: "fish-old", rate: 55 },
      { species: "Magikarp", encounterType: "fish-great", rate: 55 },
      { species: "Magikarp", encounterType: "fish-super", rate: 0 },
      { species: "Poliwag", encounterType: "fish-old", rate: 45 },
      { species: "Poliwag", encounterType: "fish-great", rate: 45 },
      { species: "Poliwag", encounterType: "fish-super", rate: 0 },
      { species: "Gyarados", encounterType: "fish-old", rate: 0 },
      { species: "Gyarados", encounterType: "fish-great", rate: 0 },
      { species: "Gyarados", encounterType: "fish-super", rate: 55 },
      { species: "Poliwhirl", encounterType: "fish-old", rate: 0 },
      { species: "Poliwhirl", encounterType: "fish-great", rate: 0 },
      { species: "Poliwhirl", encounterType: "fish-super", rate: 45 },
    ],
  },

  {
    name: "Route 201",
    availablePokemon: [
      { species: "Turtwig", encounterType: "gift", rate: 5 },
      { species: "Chimchar", encounterType: "gift", rate: 5 },
      { species: "Piplup", encounterType: "gift", rate: 5 },
      { species: "Starly", encounterType: "grass", rate: 30 },
      { species: "Bidoof", encounterType: "grass", rate: 30 },
      { species: "Pidgey", encounterType: "grass", rate: 20 },
      { species: "Kricketot", encounterType: "grass", rate: 0 },
      { species: "Nidoran♂", encounterType: "grass", rate: 10 },
      { species: "Nidoran♀", encounterType: "grass", rate: 10 },
      { species: "Hoothoot", encounterType: "grass", rate: 0 },
      { species: "Doduo", encounterType: "radar", rate: 22 },
    ],
  },

  {
    name: "Lake Verity",
    availablePokemon: [
      { species: "Starly", encounterType: "grass", rate: 30 },
      { species: "Bidoof", encounterType: "grass", rate: 20 },
      { species: "Surskit", encounterType: "grass", rate: 20 },
      { species: "Azurill", encounterType: "grass", rate: 10 },
      { species: "Psyduck", encounterType: "grass", rate: 10 },
      { species: "Wingull", encounterType: "grass", rate: 10 },
      { species: "Wynaut", encounterType: "radar", rate: 22 },
      { species: "Surskit", encounterType: "surf", rate: 90 },
      { species: "Masquerain", encounterType: "surf", rate: 10 },
      { species: "Magikarp", encounterType: "fish-old", rate: 85 },
      { species: "Magikarp", encounterType: "fish-great", rate: 100 },
      { species: "Magikarp", encounterType: "fish-super", rate: 0 },
      { species: "Feebas", encounterType: "fish-old", rate: 15 },
      { species: "Gyarados", encounterType: "fish-super", rate: 100 },
    ],
  },

  {
    name: "Route 202",
    availablePokemon: [
      { species: "Shinx", encounterType: "grass", rate: 20 },
      { species: "Zigzagoon", encounterType: "grass", rate: 20 },
      { species: "Sentret", encounterType: "grass", rate: 20 },
      { species: "Rattata", encounterType: "grass", rate: 10 },
      { species: "Poochyena", encounterType: "grass", rate: 10 },
      { species: "Growlithe", encounterType: "grass", rate: 10 },
      { species: "Burmy", encounterType: "grass", rate: 10 },
      { species: "Hoothoot", encounterType: "grass", rate: 0 },
      { species: "Houndour", encounterType: "radar", rate: 22 },
    ],
  },

  {
    name: "Route 204 (South)",
    availablePokemon: [
      { species: "Starly", encounterType: "grass", rate: 20 },
      { species: "Budew", encounterType: "grass", rate: 20 },
      { species: "Bellsprout", encounterType: "grass", rate: 10 },
      { species: "Ralts", encounterType: "grass", rate: 10 },
      { species: "Caterpie", encounterType: "grass", rate: 10 },
      { species: "Weedle", encounterType: "grass", rate: 10 },
      { species: "Wurmple", encounterType: "grass", rate: 10 },
      { species: "Ledyba", encounterType: "grass", rate: 0 },
      { species: "Sunkern", encounterType: "grass", rate: 10 },
      { species: "Oddish", encounterType: "grass", rate: 0 },
      { species: "Spinarak", encounterType: "grass", rate: 10 },
      { species: "Roselia", encounterType: "radar", rate: 22 },
      { species: "Marill", encounterType: "surf", rate: 90 },
      { species: "Azumarill", encounterType: "surf", rate: 10 },
      { species: "Magikarp", encounterType: "fish-old", rate: 40 },
      { species: "Magikarp", encounterType: "fish-great", rate: 40 },
      { species: "Magikarp", encounterType: "fish-super", rate: 0 },
      { species: "Goldeen", encounterType: "fish-old", rate: 30 },
      { species: "Goldeen", encounterType: "fish-great", rate: 30 },
      { species: "Corphish", encounterType: "fish-old", rate: 30 },
      { species: "Corphish", encounterType: "fish-great", rate: 30 },
      { species: "Gyarados", encounterType: "fish-super", rate: 40 },
      { species: "Seaking", encounterType: "fish-super", rate: 30 },
      { species: "Crawdaunt", encounterType: "fish-super", rate: 30 },
    ],
  },

  {
    name: "Ravaged Path",
    availablePokemon: [
      { species: "Zubat", encounterType: "cave", rate: 30 },
      { species: "Geodude", encounterType: "cave", rate: 20 },
      { species: "Wooper", encounterType: "cave", rate: 20 },
      { species: "Psyduck", encounterType: "cave", rate: 10 },
      { species: "Sandshrew", encounterType: "cave", rate: 10 },
      { species: "Makuhita", encounterType: "cave", rate: 10 },

      { species: "Wooper", encounterType: "surf", rate: 90 },
      { species: "Quagsire", encounterType: "surf", rate: 10 },

      { species: "Magikarp", encounterType: "fish-old", rate: 70 },
      { species: "Magikarp", encounterType: "fish-great", rate: 70 },
      { species: "Magikarp", encounterType: "fish-super", rate: 0 },

      { species: "Barboach", encounterType: "fish-old", rate: 30 },
      { species: "Barboach", encounterType: "fish-great", rate: 30 },
      { species: "Barboach", encounterType: "fish-super", rate: 0 },

      { species: "Gyarados", encounterType: "fish-old", rate: 0 },
      { species: "Gyarados", encounterType: "fish-great", rate: 0 },
      { species: "Gyarados", encounterType: "fish-super", rate: 55 },

      { species: "Whiscash", encounterType: "fish-old", rate: 0 },
      { species: "Whiscash", encounterType: "fish-great", rate: 0 },
      { species: "Whiscash", encounterType: "fish-super", rate: 45 },
    ],
  },

  {
    name: "Route 203",
    availablePokemon: [
      { species: "Starly", encounterType: "grass", rate: 25 },
      { species: "Bidoof", encounterType: "grass", rate: 20 },
      { species: "Spearow", encounterType: "grass", rate: 15 },
      { species: "Seedot", encounterType: "grass", rate: 10 },
      { species: "Lotad", encounterType: "grass", rate: 10 },
      { species: "Cubone", encounterType: "grass", rate: 10 },
      { species: "Abra", encounterType: "grass", rate: 10 },

      { species: "Pineco", encounterType: "radar", rate: 22 },

      { species: "Psyduck", encounterType: "surf", rate: 90 },
      { species: "Golduck", encounterType: "surf", rate: 10 },

      { species: "Magikarp", encounterType: "fish-old", rate: 55 },
      { species: "Magikarp", encounterType: "fish-great", rate: 55 },
      { species: "Magikarp", encounterType: "fish-super", rate: 0 },

      { species: "Corphish", encounterType: "fish-old", rate: 45 },
      { species: "Corphish", encounterType: "fish-great", rate: 45 },
      { species: "Corphish", encounterType: "fish-super", rate: 0 },

      { species: "Gyarados", encounterType: "fish-old", rate: 0 },
      { species: "Gyarados", encounterType: "fish-great", rate: 0 },
      { species: "Gyarados", encounterType: "fish-super", rate: 55 },

      { species: "Crawdaunt", encounterType: "fish-old", rate: 0 },
      { species: "Crawdaunt", encounterType: "fish-great", rate: 0 },
      { species: "Crawdaunt", encounterType: "fish-super", rate: 45 },
    ],
  },

  {
    name: "Oreburgh Gate",
    sublocations: [
      {
        name: "1F",
        availablePokemon: [
          { species: "Zubat", encounterType: "cave", rate: 35 },
          { species: "Geodude", encounterType: "cave", rate: 35 },
          { species: "Diglett", encounterType: "cave", rate: 20 },
          { species: "Riolu", encounterType: "cave", rate: 10 }
        ]
      },

      {
        name: "B1F",
        availablePokemon: [
          { species: "Zubat", encounterType: "cave", rate: 35 },
          { species: "Geodude", encounterType: "cave", rate: 35 },
          { species: "Diglett", encounterType: "cave", rate: 20 },
          { species: "Riolu", encounterType: "cave", rate: 10 },

          { species: "Zubat", encounterType: "surf", rate: 90 },
          { species: "Golbat", encounterType: "surf", rate: 10 },

          { species: "Magikarp", encounterType: "fish-old", rate: 55 },
          { species: "Magikarp", encounterType: "fish-great", rate: 40 },
          { species: "Magikarp", encounterType: "fish-super", rate: 0 },

          { species: "Barboach", encounterType: "fish-old", rate: 45 },
          { species: "Barboach", encounterType: "fish-great", rate: 60 },
          { species: "Barboach", encounterType: "fish-super", rate: 15 },

          { species: "Gyarados", encounterType: "fish-old", rate: 0 },
          { species: "Gyarados", encounterType: "fish-great", rate: 0 },
          { species: "Gyarados", encounterType: "fish-super", rate: 40 },

          { species: "Whiscash", encounterType: "fish-old", rate: 0 },
          { species: "Whiscash", encounterType: "fish-great", rate: 0 },
          { species: "Whiscash", encounterType: "fish-super", rate: 45 }
        ]
      }
    ]
  },


  {
    name: "Route 207",
    availablePokemon: [
      { species: "Machop", encounterType: "grass", rate: 30 },
      { species: "Rhyhorn", encounterType: "grass", rate: 20 },
      { species: "Ponyta", encounterType: "grass", rate: 20 },
      { species: "Phanpy", encounterType: "grass", rate: 20 },
      { species: "Larvitar", encounterType: "grass", rate: 10 },

      { species: "Stantler", encounterType: "radar", rate: 22 },

      { species: "Aipom", encounterType: "honey", rate: 30 },
      { species: "Slakoth", encounterType: "honey", rate: 20 },
      { species: "Metapod", encounterType: "honey", rate: 20 },
      { species: "Kakuna", encounterType: "honey", rate: 20 },
      { species: "Munchlax", encounterType: "honey", rate: 10 },
    ],
  },

  {
    name: "Oreburgh City",
    availablePokemon: [
      { species: "Treecko", encounterType: "gift", rate: 10 },
      { species: "Torchic", encounterType: "gift", rate: 10 },
      { species: "Mudkip", encounterType: "gift", rate: 10 },
      { species: "Beldum", encounterType: "gift", rate: 10 },
    ]
  },

  {
    name: "Mining Museum",
    availablePokemon: [
      { species: "Omanyte", encounterType: "gift", rate: 20 },
      { species: "Kabuto", encounterType: "gift", rate: 20 },
      { species: "Aerodactyl", encounterType: "gift", rate: 20 },
      { species: "Lileep", encounterType: "gift", rate: 20 },
      { species: "Anorith", encounterType: "gift", rate: 20 },
      { species: "Cranidos", encounterType: "gift", rate: 20 },
      { species: "Shieldon", encounterType: "gift", rate: 20 },
    ]
  },
  {
    name: "Oreburgh Mine",
    sublocations: [
      {
        name: "1F",
        availablePokemon: [
          { species: "Geodude", encounterType: "cave", rate: 25 },
          { species: "Zubat", encounterType: "cave", rate: 25 },
          { species: "Whismur", encounterType: "cave", rate: 20 },
          { species: "Aron", encounterType: "cave", rate: 10 },
          { species: "Onix", encounterType: "cave", rate: 10 },
          { species: "Trapinch", encounterType: "cave", rate: 10 },],
      },
      {
        name: "B1F",
        availablePokemon: [      
          { species: "Geodude", encounterType: "cave", rate: 25 },
          { species: "Zubat", encounterType: "cave", rate: 25 },
          { species: "Whismur", encounterType: "cave", rate: 20 },
          { species: "Aron", encounterType: "cave", rate: 10 },
          { species: "Onix", encounterType: "cave", rate: 10 },
          { species: "Trapinch", encounterType: "cave", rate: 10 },],
      }
    ]
  },
];

