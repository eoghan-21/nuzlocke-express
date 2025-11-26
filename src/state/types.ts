export interface Pokemon {
  id: string;
  species: string;
  sprite?: string;
  nickname?: string;
  level?: number;
  nature?: string;
  ability?: string;
  item?: string;
  moves?: string[];
  types?: string[]; // e.g., ["Water"], ["Bug", "Electric"]
  ivs?: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number; 
    speed: number; 
  };
}

export interface GameState {
  nextBossIndex: number;
  routesUnlocked: string[];
  completedRoutes: string[];
  itemsUnlocked: string[];
  movesUnlocked: string[];
  box: Pokemon[];
  party: Pokemon[];
  aceLevel: number;
}
