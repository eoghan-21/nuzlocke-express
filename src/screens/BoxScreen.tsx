// src/screens/BoxScreen.tsx
import React, { useState } from "react";
import { useGameState } from "../state/GameStateContext";

interface BoxScreenProps {
  onBack: () => void;
}

const BoxScreen: React.FC<BoxScreenProps> = ({ onBack }) => {
  const { state, dispatch } = useGameState();
  const [selectedBoxIndex, setSelectedBoxIndex] = useState<number | null>(null);
  const [selectedPartyIndex, setSelectedPartyIndex] = useState<number | null>(null);

  // Gen 5 Showdown sprite helpers
  const getShowdownId = (species: string) =>
    species.toLowerCase().replace(/♀/g, "f").replace(/♂/g, "m").replace(/[^a-z0-9]/g, "");

  const getSpriteUrl = (species: string) =>
    `https://play.pokemonshowdown.com/sprites/gen5/${getShowdownId(species)}.png`;

  const handleSwap = () => {
    if (selectedBoxIndex === null || selectedPartyIndex === null) return;

    const boxPokemon = state.box[selectedBoxIndex];
    const partyPokemon = state.party[selectedPartyIndex];

    const newBox = [...state.box];
    const newParty = [...state.party];

    newBox[selectedBoxIndex] = partyPokemon;
    newParty[selectedPartyIndex] = boxPokemon;

    dispatch({ type: "UPDATE_PARTY", party: newParty });
    dispatch({ type: "REMOVE_POKEMON_FROM_BOX", index: selectedBoxIndex });
    dispatch({ type: "ADD_POKEMON_TO_BOX", pokemon: partyPokemon });

    setSelectedBoxIndex(null);
    setSelectedPartyIndex(null);
  };

  return (
    <div style={{ padding: 20, backgroundColor: "#1a1a1a", minHeight: "100vh", color: "#f2f2f2" }}>
      <h1 style={{ fontSize: 36, textAlign: "center" }}>Box</h1>

      <button
        onClick={onBack}
        style={{ marginBottom: 20, padding: "10px 20px", fontSize: 18, borderRadius: 6 }}
      >
        Back
      </button>

      {/* Box Pokémon */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 16 }}>
        {state.box.map((pokemon, index) => (
          <div
            key={index}
            style={{
              border: selectedBoxIndex === index ? "2px solid #ffcc33" : "1px solid #555",
              borderRadius: 8,
              padding: 10,
              textAlign: "center",
              cursor: "pointer",
              backgroundColor: "#2a2a2a"
            }}
            onClick={() => setSelectedBoxIndex(index)}
          >
            <div
              style={{
                width: 96,
                height: 96,
                margin: "0 auto 6px",
                backgroundColor: "#333",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <img
                src={getSpriteUrl(pokemon.species)}
                alt={pokemon.species}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://play.pokemonshowdown.com/sprites/gen5/0.png";
                }}
              />
            </div>
            <div>{pokemon.nickname || pokemon.species}</div>
          </div>
        ))}
      </div>

      {/* Party */}
      <h2 style={{ marginTop: 30 }}>Party</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 16, marginTop: 10 }}>
        {state.party.map((pokemon, index) => (
          <div
            key={index}
            style={{
              border: selectedPartyIndex === index ? "2px solid #ffcc33" : "1px solid #555",
              borderRadius: 8,
              padding: 10,
              textAlign: "center",
              cursor: "pointer",
              backgroundColor: "#2a2a2a"
            }}
            onClick={() => setSelectedPartyIndex(index)}
          >
            <div
              style={{
                width: 96,
                height: 96,
                margin: "0 auto 6px",
                backgroundColor: "#333",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <img
                src={getSpriteUrl(pokemon.species)}
                alt={pokemon.species}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://play.pokemonshowdown.com/sprites/gen5/0.png";
                }}
              />
            </div>
            <div>{pokemon.nickname || pokemon.species}</div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSwap}
        disabled={selectedBoxIndex === null || selectedPartyIndex === null}
        style={{
          marginTop: 20,
          padding: "10px 20px",
          fontSize: 18,
          borderRadius: 6,
          cursor: selectedBoxIndex !== null && selectedPartyIndex !== null ? "pointer" : "not-allowed",
        }}
      >
        Swap Selected Pokémon
      </button>
    </div>
  );
};

export default BoxScreen;
