import React, { createContext, useContext, useReducer } from "react";
import type { ReactNode } from "react";
import type { Pokemon, GameState } from "./types";
import { defaultGameState } from "./defaultGameState";

// Actions for the reducer
type Action =
  | { type: "ADD_POKEMON_TO_PARTY"; pokemon: Pokemon }
  | { type: "ADD_POKEMON_TO_BOX"; pokemon: Pokemon }
  | { type: "ADD_POKEMON_SMART"; pokemon: Pokemon } // NEW
  | { type: "REMOVE_POKEMON_FROM_PARTY"; index: number }
  | { type: "REMOVE_POKEMON_FROM_BOX"; index: number }
  | { type: "RESET_GAME" }
  | { type: "MARK_ROUTE_COMPLETED"; route: string }
  | { type: "UPDATE_PARTY"; party: Pokemon[] }
  | { type: "ADD_ITEM"; item: string }
  | { type: "REMOVE_ITEM"; item: string }
  | { type: "UNLOCK_ROUTE"; route: string }
  | { type: "ADD_MOVE_UNLOCKED"; move: string }
  | { type: "INCREASE_ACE_LEVEL"; amount: number };

const MAX_PARTY_SIZE = 6;

const gameReducer = (state: GameState, action: Action): GameState => {
  switch (action.type) {
    case "ADD_POKEMON_TO_PARTY":
      if (state.party.length >= MAX_PARTY_SIZE) return state;
      return { ...state, party: [...state.party, action.pokemon] };
    case "ADD_POKEMON_TO_BOX":
      return { ...state, box: [...state.box, action.pokemon] };

    case "ADD_POKEMON_SMART": {
      // Decide dynamically based on latest state
      if (state.party.length < MAX_PARTY_SIZE) {
        return { ...state, party: [...state.party, action.pokemon] };
      } else {
        return { ...state, box: [...state.box, action.pokemon] };
      }
    }

    case "REMOVE_POKEMON_FROM_PARTY":
      return { ...state, party: state.party.filter((_, i) => i !== action.index) };
    case "REMOVE_POKEMON_FROM_BOX":
      return { ...state, box: state.box.filter((_, i) => i !== action.index) };
    case "MARK_ROUTE_COMPLETED":
      if (state.completedRoutes.includes(action.route)) return state;
      return { ...state, completedRoutes: [...state.completedRoutes, action.route] };
    case "UNLOCK_ROUTE":
      if (state.routesUnlocked.includes(action.route)) return state;
      return { ...state, routesUnlocked: [...state.routesUnlocked, action.route] };
    case "RESET_GAME":
      return {
        party: [],
        box: [],
        nextBossIndex: 0,
        completedRoutes: [],
        routesUnlocked: ["Route 1", "Route 2"], // Only first 2 routes unlocked initially
        itemsUnlocked: [],
        movesUnlocked: [],
        aceLevel: 0,
      };
    case "ADD_ITEM":
      if (state.itemsUnlocked.includes(action.item)) return state;
      return { ...state, itemsUnlocked: [...state.itemsUnlocked, action.item] };
    case "REMOVE_ITEM":
      return { ...state, itemsUnlocked: state.itemsUnlocked.filter(i => i !== action.item) };
    case "ADD_MOVE_UNLOCKED":
      if (state.movesUnlocked.includes(action.move)) return state;
      return { ...state, movesUnlocked: [...state.movesUnlocked, action.move] };
    case "UPDATE_PARTY":
      return { ...state, party: action.party };
    case "INCREASE_ACE_LEVEL":
      return { ...state, aceLevel: state.aceLevel + action.amount };
    default:
      return state;
  }
};

type GameStateContextProps = {
  state: GameState;
  dispatch: React.Dispatch<Action>;
};

const GameStateContext = createContext<GameStateContextProps | undefined>(undefined);

export const GameStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, defaultGameState);

  return (
    <GameStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GameStateContext.Provider>
  );
};

export const useGameState = () => {
  const context = useContext(GameStateContext);
  if (!context) throw new Error("useGameState must be used within a GameStateProvider");
  return context;
};
