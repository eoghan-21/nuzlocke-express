import React, { useState } from "react";
import { useGameState } from "../state/GameStateContext";
import { pokemonList } from "../data/pokemonData";
import type { Pokemon } from "../state/types";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";

interface EditablePokemon extends Pokemon {
  moves: string[];
  item: string;
  nickname: string;
  level: number;
  ivs: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
}

interface TeamEditorProps {
  onBack?: () => void;
}

const natureMultipliers: Record<string, { attack: number; defense: number; specialAttack: number; specialDefense: number; speed: number }> = {
  Hardy: { attack: 1, defense: 1, specialAttack: 1, specialDefense: 1, speed: 1 },
  Lonely: { attack: 1.1, defense: 0.9, specialAttack: 1, specialDefense: 1, speed: 1 },
  Brave: { attack: 1.1, defense: 1, specialAttack: 1, specialDefense: 1, speed: 0.9 },
  Adamant: { attack: 1.1, defense: 1, specialAttack: 0.9, specialDefense: 1, speed: 1 },
  Naughty: { attack: 1.1, defense: 1, specialAttack: 1, specialDefense: 0.9, speed: 1 },
  Bold: { attack: 0.9, defense: 1.1, specialAttack: 1, specialDefense: 1, speed: 1 },
  Docile: { attack: 1, defense: 1, specialAttack: 1, specialDefense: 1, speed: 1 },
  Relaxed: { attack: 1, defense: 1.1, specialAttack: 1, specialDefense: 1, speed: 0.9 },
  Impish: { attack: 1, defense: 1.1, specialAttack: 0.9, specialDefense: 1, speed: 1 },
  Lax: { attack: 1, defense: 1.1, specialAttack: 1, specialDefense: 0.9, speed: 1 },
  Timid: { attack: 0.9, defense: 1, specialAttack: 1, specialDefense: 1, speed: 1.1 },
  Hasty: { attack: 1, defense: 0.9, specialAttack: 1, specialDefense: 1, speed: 1.1 },
  Serious: { attack: 1, defense: 1, specialAttack: 1, specialDefense: 1, speed: 1 },
  Jolly: { attack: 1, defense: 1, specialAttack: 0.9, specialDefense: 1, speed: 1.1 },
  Naive: { attack: 1, defense: 1, specialAttack: 1, specialDefense: 0.9, speed: 1.1 },
  Modest: { attack: 0.9, defense: 1, specialAttack: 1.1, specialDefense: 1, speed: 1 },
  Mild: { attack: 1, defense: 0.9, specialAttack: 1.1, specialDefense: 1, speed: 1 },
  Quiet: { attack: 1, defense: 1, specialAttack: 1.1, specialDefense: 1, speed: 0.9 },
  Bashful: { attack: 1, defense: 1, specialAttack: 1, specialDefense: 1, speed: 1 },
  Rash: { attack: 1, defense: 1, specialAttack: 1.1, specialDefense: 0.9, speed: 1 },
  Calm: { attack: 0.9, defense: 1, specialAttack: 1, specialDefense: 1.1, speed: 1 },
  Gentle: { attack: 1, defense: 0.9, specialAttack: 1, specialDefense: 1.1, speed: 1 },
  Sassy: { attack: 1, defense: 1, specialAttack: 0.9, specialDefense: 1.1, speed: 1 },
  Careful: { attack: 1, defense: 1, specialAttack: 1, specialDefense: 1.1, speed: 0.9 },
  Quirky: { attack: 1, defense: 1, specialAttack: 1, specialDefense: 1, speed: 1 },
};

// Theoretical max Pokémon base stats for normalization
const maxBaseStats = {
  hp: 255,
  attack: 150,
  defense: 150,
  specialAttack: 150,
  specialDefense: 150,
  speed: 150,
};

// Stat bar color based on ratio (0–1)
const statColor = (ratio: number) => {
  if (ratio < 0.33) return "#ff4d4d"; // red
  if (ratio < 0.66) return "#ffcc00"; // yellow
  return "#4dff4d";                   // green
};

// Calculate actual stat (EV=0)
const calculateStat = (base: number, iv: number, level: number, nature: number, isHP = false) => {
  const ev = 0; // EVs = 0
  if (isHP) return Math.floor((2 * base + iv + Math.floor(ev / 4)) * level / 100 + level + 10);
  return Math.floor(Math.floor((2 * base + iv + Math.floor(ev / 4)) * level / 100 + 5) * nature);
};

const TeamEditor: React.FC<TeamEditorProps> = ({ onBack }) => {
  const { state, dispatch } = useGameState();
  const [editableParty, setEditableParty] = useState<EditablePokemon[]>(() => {
    const partyWithMoves: EditablePokemon[] = state.party.map(p => ({
      ...p,
      moves: p.moves?.slice(0, 4) || ["", "", "", ""],
      item: p.item || "",
      nickname: p.nickname || "",
      level: state.aceLevel,
      ivs: p.ivs!,
    }));
    while (partyWithMoves.length < 6) {
      partyWithMoves.push({
        id: `empty-${partyWithMoves.length}`,
        species: "",
        nickname: "",
        item: "",
        moves: ["", "", "", ""],
        level: state.aceLevel,
        ivs: { hp: 0, attack: 0, defense: 0, specialAttack: 0, specialDefense: 0, speed: 0 },
      });
    }
    return partyWithMoves;
  });

  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

  const getShowdownId = (species: string) =>
    species.toLowerCase().replace(/♀/g, "f").replace(/♂/g, "m").replace(/[^a-z0-9]/g, "");

  const getSpriteUrl = (species: string) =>
    `https://play.pokemonshowdown.com/sprites/gen5/${getShowdownId(species)}.png`;

  const getAvailableMoves = (species?: string, level?: number): string[] => {
    if (!species || !level) return [];
    const collectedMoves: { name: string; level: number }[] = [];
    let current = species;

    while (true) {
      const entry = pokemonList.find(p => p.species === current);
      if (!entry) break;
      collectedMoves.push(...entry.moves);

      const preEvolution = pokemonList.find(p => p.evolution?.evolvesTo === current);
      if (!preEvolution) break;
      current = preEvolution.species;
    }

    const seen = new Set<string>();
    const finalMoves: string[] = [];
    for (const m of collectedMoves) {
      if (m.level <= (level ?? 0) && !seen.has(m.name)) {
        seen.add(m.name);
        finalMoves.push(m.name);
      }
    }
    return finalMoves;
  };

  const handleNicknameChange = (slotIndex: number, value: string) => {
    setEditableParty(prev => {
      const copy = [...prev];
      copy[slotIndex] = { ...copy[slotIndex], nickname: value };
      return copy;
    });
  };

  const handleMoveChange = (slotIndex: number, moveIndex: number, value: string) => {
    setEditableParty(prev => {
      const copy = [...prev];
      const moves = [...(copy[slotIndex].moves || ["", "", "", ""])];
      moves[moveIndex] = value;
      copy[slotIndex] = { ...copy[slotIndex], moves };
      return copy;
    });
  };

  const handleItemChange = (slotIndex: number, value: string) => {
    setEditableParty(prev => {
      const copy = [...prev];
      copy[slotIndex] = { ...copy[slotIndex], item: value };
      return copy;
    });
  };

  const handleEvolve = (slotIndex: number) => {
    setEditableParty(prev => {
      const copy = [...prev];
      const mon = copy[slotIndex];
      if (!mon.species) return prev;

      const base = pokemonList.find(p => p.species === mon.species);
      if (!base?.evolution) return prev;
      const evolution = base.evolution;
      if (state.aceLevel < evolution.level) return prev;

      const evolved = pokemonList.find(p => p.species === evolution.evolvesTo);
      if (!evolved) return prev;

      const oldMoves = mon.moves.slice(0, 4);
      const newMoves = getAvailableMoves(evolved.species, state.aceLevel).filter(m => !oldMoves.includes(m));

      copy[slotIndex] = {
        ...mon,
        species: evolved.species,
        ability: evolved.abilities.slot0 || "",
        moves: [...oldMoves, ...newMoves].slice(0, 4),
        level: state.aceLevel,
      };

      return copy;
    });
  };

  const saveTeam = () => {
    const filtered = editableParty.filter(p => p.species).map(p => ({ ...p, level: state.aceLevel }));
    dispatch({ type: "UPDATE_PARTY", party: filtered });
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const copy = [...editableParty];
    const [removed] = copy.splice(result.source.index, 1);
    copy.splice(result.destination.index, 0, removed);
    setEditableParty(copy);
  };

  return (
    <div style={{ padding: 20, backgroundColor: "#1a1a1a", minHeight: "100vh", color: "#f2f2f2" }}>
      <h1 style={{ fontSize: 36, textAlign: "center" }}>Team Editor</h1>
      <div style={{ fontSize: 20, textAlign: "center", marginBottom: 20, padding: "6px 12px", backgroundColor: "#333", color: "#fff", borderRadius: 6, border: "1px solid #555" }}>
        Level Cap: {state.aceLevel}
      </div>
      {onBack && (
        <button style={{ marginBottom: 10 }} onClick={() => { saveTeam(); onBack(); }}>
          Back
        </button>
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="party" direction="horizontal">
          {(provided) => (
            <div style={{ display: "flex", gap: 20, marginTop: 20 }} {...provided.droppableProps} ref={provided.innerRef}>
              {editableParty.map((pokemon, index) => {
                const level = state.aceLevel;
                const possibleMoves = getAvailableMoves(pokemon.species, level);
                const entry = pokemonList.find(p => p.species === pokemon.species);
                const canEvolve = entry?.evolution ? state.aceLevel >= entry.evolution.level : false;
                const multipliers = pokemon.nature ? natureMultipliers[pokemon.nature] : { attack: 1, defense: 1, specialAttack: 1, specialDefense: 1, speed: 1 };
                const baseStats = entry?.baseStats || { hp: 0, attack: 0, defense: 0, specialAttack: 0, specialDefense: 0, speed: 0 };
                const stats = pokemon.ivs ? {
                  hp: calculateStat(baseStats.hp, pokemon.ivs.hp, level, 1, true),
                  attack: calculateStat(baseStats.attack, pokemon.ivs.attack, level, multipliers.attack),
                  defense: calculateStat(baseStats.defense, pokemon.ivs.defense, level, multipliers.defense),
                  specialAttack: calculateStat(baseStats.specialAttack, pokemon.ivs.specialAttack, level, multipliers.specialAttack),
                  specialDefense: calculateStat(baseStats.specialDefense, pokemon.ivs.specialDefense, level, multipliers.specialDefense),
                  speed: calculateStat(baseStats.speed, pokemon.ivs.speed, level, multipliers.speed),
                } : null;

                return (
                  <Draggable key={pokemon.id} draggableId={pokemon.id} index={index}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={{ border: "1px solid #444", backgroundColor: "#2a2a2a", borderRadius: 10, padding: 10, display: "flex", flexDirection: "column", alignItems: "center", minHeight: 500, ...provided.draggableProps.style }}>
                        <h3 style={{ color: "#e0e0e0" }}>Slot {index + 1}</h3>
                        <div style={{ width: 96, height: 96, backgroundColor: "#3a3a3a", borderRadius: 8, marginBottom: 10, display: "flex", alignItems: "center", justifyContent: "center", cursor: pokemon.species ? "pointer" : "default" }} onClick={() => pokemon.species && setSelectedSlot(selectedSlot === index ? null : index)}>
                          {pokemon.species && <img src={getSpriteUrl(pokemon.species)} alt={pokemon.species} style={{ width: "100%", height: "100%", objectFit: "contain" }} onError={e => { (e.target as HTMLImageElement).src = "https://play.pokemonshowdown.com/sprites/gen5/0.png"; }} />}
                        </div>

                        <div style={{ width: "100%", marginBottom: 6, padding: "6px 8px", backgroundColor: "#333", color: "#aaa", border: "1px solid #555", borderRadius: 4 }}>
                          {pokemon.species}
                        </div>

                        <input
                          type="text"
                          placeholder="Nickname"
                          value={pokemon.nickname || ""}
                          onChange={e => handleNicknameChange(index, e.target.value)}
                          style={{ width: "100%", marginBottom: 6, backgroundColor: "#333", color: "#fff", border: "1px solid #555" }}
                        />

                        <div style={{ width: "100%", marginBottom: 6, padding: "6px 8px", backgroundColor: "#333", color: "#aaa", border: "1px solid #555", borderRadius: 4 }}>
                          {pokemon.ability || ""}
                        </div>

                        {/* Display nature */}
                        <div style={{ width: "100%", marginBottom: 6, padding: "6px 8px", backgroundColor: "#333", color: "#fff", border: "1px solid #555", borderRadius: 4 }}>
                          Nature: {pokemon.nature || "(Unknown)"}
                        </div>


                        {canEvolve && <button onClick={() => handleEvolve(index)} style={{ marginBottom: 6 }}>Evolve!</button>}

                        <select value={pokemon.item || ""} onChange={e => handleItemChange(index, e.target.value)} style={{ width: "100%", marginBottom: 6, backgroundColor: "#333", color: "#fff", border: "1px solid #555", padding: "4px 6px" }}>
                          <option value="">(None)</option>
                          {state.itemsUnlocked.map(item => <option key={item} value={item}>{item}</option>)}
                        </select>

                        {/* Stat bars */}
                        {stats && pokemon.ivs && (
                          <div style={{ width: "100%", marginBottom: 6 }}>
                            {Object.entries(stats).map(([key, value]) => {
                              const maxStat = maxBaseStats[key as keyof typeof maxBaseStats];
                              const ratio = Math.min(value / maxStat, 1);

                              return (
                                <div key={key} style={{ marginBottom: 4 }}>
                                  <div style={{ fontSize: 12, color: "#ffcc33" }}>
                                    {key.toUpperCase()}: {value} ({(pokemon.ivs as any)[key]})
                                  </div>
                                  <div style={{ height: 8, width: "100%", backgroundColor: "#333", borderRadius: 4 }}>
                                    <div style={{
                                      height: "100%",
                                      width: `${ratio * 100}%`,
                                      backgroundColor: statColor(ratio),
                                      borderRadius: 4,
                                    }} />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {pokemon.species && <div style={{ width: "100%", marginTop: 6 }}>
                          {Array.from({ length: 4 }).map((_, i) => (
                            <select key={i} value={pokemon.moves[i] || ""} onChange={e => handleMoveChange(index, i, e.target.value)} style={{ width: "100%", marginBottom: 6, backgroundColor: "#333", color: "#fff", border: "1px solid #555", padding: "4px 6px" }}>
                              <option value="">(None)</option>
                              {possibleMoves.map(m => <option key={m} value={m}>{m}</option>)}
                            </select>
                          ))}
                        </div>}
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TeamEditor;
