import React, { useState } from "react";
import CyclingSelector, { type Option } from "../components/CyclingSelector";
import { routes, type Route, type Sublocation, type RoutePokemon } from "../data/routes";
import { useGameState } from "../state/GameStateContext";
import { pokemonList } from "../data/pokemonData";

type RouteSelectionProps = {
  onBack?: () => void;
};

type EncounterType =
  | "grass"
  | "cave"
  | "surf"
  | "gift"
  | "radar"
  | "honey"
  | "fish-old"
  | "fish-great"
  | "fish-super";

const natures = [
  "Hardy","Lonely","Brave","Adamant","Naughty",
  "Bold","Docile","Relaxed","Impish","Lax",
  "Timid","Hasty","Serious","Jolly","Naive",
  "Modest","Mild","Quiet","Bashful","Rash",
  "Calm","Gentle","Sassy","Careful","Quirky"
];

const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const generateIVs = () => ({
  hp: getRandomInt(0, 31),
  attack: getRandomInt(0, 31),
  defense: getRandomInt(0, 31),
  specialAttack: getRandomInt(0, 31),
  specialDefense: getRandomInt(0, 31),
  speed: getRandomInt(0, 31),
});

// Encounter backgrounds
const encounterBackgrounds: Record<string, string> = {
  grass: "url('src/assets/grass.png')",
  surf: "url('src/assets/surfing.png')",
  "fish-old": "url('src/assets/fishing2.png')",
  "fish-great": "url('src/assets/fishing2.png')",
  "fish-super": "url('src/assets/fishing2.png')",
  cave: "url('src/assets/cave.png')",
  gift: "url('src/assets/gift.png')",
  radar: "url('src/assets/radar.png')",
  honey: "url('src/assets/honey.png')",
};

const RouteSelection: React.FC<RouteSelectionProps> = ({ onBack }) => {
  const { state, dispatch } = useGameState();

  const [selectedRoute, setSelectedRoute] = useState<string>("");
  const [selectedSublocation, setSelectedSublocation] = useState<string | null>(null);
  const [selectedEncounter, setSelectedEncounter] = useState<EncounterType | "fish" | null>(null);
  const [fishRodType, setFishRodType] = useState<"fish-old" | "fish-great" | "fish-super">("fish-old");
  const [message, setMessage] = useState<string>("");

  const mainRoute: Route | undefined = routes.find(r => r.name === selectedRoute);
  const sublocation: Sublocation | undefined = mainRoute?.sublocations?.find(sl => sl.name === selectedSublocation);

  const isRouteCompleted = mainRoute
    ? state.completedRoutes.includes(mainRoute.name)
    : false;

  // --- Catch Pokémon ---
  const handleCatch = (option: Option) => {
    const basePokemon = pokemonList.find(p => p.species === option.label);
    if (!basePokemon) return;

    const abilitySlots = Object.values(basePokemon.abilities).filter(Boolean);
    const ability = abilitySlots[getRandomInt(0, abilitySlots.length - 1)];
    const level = state.aceLevel;

    const moves = basePokemon.moves
      .filter(m => m.level <= level)
      .map(m => m.name)
      .slice(0, 4);

    const newPokemon = {
      id: `${basePokemon.species}-${Date.now()}`,
      species: basePokemon.species,
      level,
      moves: moves.length > 0 ? moves : ["Tackle"],
      ability,
      nature: natures[getRandomInt(0, natures.length - 1)],
      ivs: generateIVs(),
      nickname: "",
      item: "",
    };

    console.log(newPokemon);

    if (state.party.length < 6) {
      dispatch({ type: "ADD_POKEMON_TO_PARTY", pokemon: newPokemon });
    } else {
      dispatch({ type: "ADD_POKEMON_TO_BOX", pokemon: newPokemon });
    }

    setMessage(`Caught: ${basePokemon.species}!`);

    if (mainRoute) {
      dispatch({ type: "MARK_ROUTE_COMPLETED", route: mainRoute.name });
    }
  };

  // --- Get encounter options ---
  const getEncounterOptions = (): Option[] => {
    if (!selectedRoute || !selectedEncounter) return [];

    const encounterType: EncounterType = selectedEncounter === "fish" ? fishRodType : selectedEncounter as EncounterType;

    const availablePokemon: RoutePokemon[] = sublocation?.availablePokemon ?? mainRoute?.availablePokemon ?? [];

    return availablePokemon
      .filter(p => p.encounterType === encounterType)
      .map(p => ({ label: p.species, weight: p.rate }));
  };

  const handleSelect = (option: Option) => {
    if (isRouteCompleted) return;
    handleCatch(option);
  };

  const caughtSpecies = state.party.concat(state.box).map(p => p.species);
  const unlockedRoutes = routes.filter(route => state.routesUnlocked.includes(route.name));

  return (
    <div
      style={{
        padding: 20,
        minHeight: "100vh",
        background: selectedEncounter
          ? encounterBackgrounds[selectedEncounter === "fish" ? fishRodType : selectedEncounter]
          : "#222",
        backgroundSize: "cover",
        backgroundPosition: "center",
        imageRendering: "pixelated",
        transition: "background 0.5s ease",
      }}
    >
      <div
        style={{
          background: "rgba(0,0,0,0.30)",
          padding: 20,
          borderRadius: 12,
          minHeight: "90vh",
        }}
      >
        <h1 style={{ fontSize: 36, color: "white", textShadow: "0 0 10px black" }}>
          Select a Route
        </h1>

        {onBack && (
          <button
            onClick={onBack}
            style={{ marginBottom: 20, padding: "10px 16px", fontSize: 18, borderRadius: 8 }}
          >
            Back
          </button>
        )}

        {/* --- Base Route Selection --- */}
        <select
          value={selectedRoute}
          onChange={e => {
            setSelectedRoute(e.target.value);
            setSelectedSublocation(null);
            setSelectedEncounter(null);
            setMessage("");
          }}
          style={{ fontSize: 20, padding: "10px 14px", borderRadius: 8, marginBottom: 20 }}
        >
          <option value="">-- Select Route --</option>
          {unlockedRoutes.map(route => (
            <option
              key={route.name}
              value={route.name}
              disabled={state.completedRoutes.includes(route.name)}
            >
              {route.name} {state.completedRoutes.includes(route.name) ? "(Completed)" : ""}
            </option>
          ))}
        </select>

        {/* --- Sublocation Selection (if any) --- */}
        {mainRoute?.sublocations && (
          <select
            value={selectedSublocation ?? ""}
            onChange={e => {
              setSelectedSublocation(e.target.value);
              setSelectedEncounter(null);
              setMessage("");
            }}
            style={{ fontSize: 18, padding: "8px 12px", borderRadius: 8, marginBottom: 20 }}
          >
            <option value="">-- Select Floor --</option>
            {mainRoute.sublocations.map(sl => (
              <option key={sl.name} value={sl.name}>
                {sl.name}
              </option>
            ))}
          </select>
        )}

        {/* --- Encounter Types --- */}
        {(mainRoute && (!mainRoute.sublocations || selectedSublocation)) && (
          <div style={{ marginTop: 20 }}>
            <p style={{ fontSize: 22, fontWeight: "bold", color: "white" }}>
              Select Encounter Type:
            </p>

            {["grass", "cave", "surf", "gift", "radar", "honey", "fish"].map(enc => (
              <div key={enc} style={{ display: "inline-block", marginRight: 12 }}>
                <button
                  onClick={() => setSelectedEncounter(enc as EncounterType | "fish")}
                  disabled={isRouteCompleted}
                  style={{
                    padding: "12px 20px",
                    fontSize: 18,
                    fontWeight: selectedEncounter === enc ? "bold" : "normal",
                    opacity: isRouteCompleted ? 0.5 : 1,
                  }}
                >
                  {enc.charAt(0).toUpperCase() + enc.slice(1)}
                </button>

                {enc === "fish" && selectedEncounter === "fish" && (
                  <div style={{ marginTop: 6 }}>
                    {["fish-old", "fish-great", "fish-super"].map(rod => (
                      <button
                        key={rod}
                        onClick={() => setFishRodType(rod as "fish-old" | "fish-great" | "fish-super")}
                        disabled={isRouteCompleted}
                        style={{
                          marginRight: 6,
                          padding: "6px 12px",
                          fontSize: 14,
                          fontWeight: fishRodType === rod ? "bold" : "normal",
                          opacity: isRouteCompleted ? 0.5 : 1,
                        }}
                      >
                        {rod.replace("fish-", "Rod ")}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* --- Cycling Selector --- */}
        {selectedEncounter && (
          <div style={{ marginTop: 40 }}>
            <CyclingSelector
              options={getEncounterOptions()}
              onSelect={handleSelect}
              disabled={isRouteCompleted}
              caughtPokemon={caughtSpecies}
            />

            {message && (
              <div
                style={{
                  marginTop: 40,
                  fontSize: 36,
                  fontWeight: "bold",
                  color: "#ffcc33",
                  textShadow: "0 0 10px black",
                }}
              >
                {message}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RouteSelection;
