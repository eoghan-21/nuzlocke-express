import type { GameState } from "./types";

export const defaultGameState: GameState = {
  nextBossIndex: 0,
  routesUnlocked: ["Twinleaf Town", "Route 201"],
  completedRoutes: [],
  itemsUnlocked: ["Oran Berry", "Chesto Berry"],
  movesUnlocked: [],
  box: [],
  party: [],
  aceLevel: 5,
};
