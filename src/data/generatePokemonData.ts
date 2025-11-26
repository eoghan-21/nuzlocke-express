import * as fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cacheDir = path.join(__dirname, "cache");

// Make sure cache folder exists
if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir);

// ---------------- Types ----------------
export interface MoveEntry {
  name: string;
  level: number;
}

export interface Evolution {
  evolvesTo: string;
  level: number;
}

export interface PokemonAbilitySlots {
  slot0?: string;
  slot1?: string;
  hidden?: string;
}

export interface PokemonData {
  species: string;
  abilities: PokemonAbilitySlots;
  baseStats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
  moves: MoveEntry[];
  evolution?: Evolution;
}

// API response types
interface ApiAbility {
  ability: { name: string };
  is_hidden: boolean;
  slot: number;
}

interface ApiStat {
  stat: { name: string };
  base_stat: number;
}

interface ApiMove {
  move: { name: string };
  version_group_details: {
    move_learn_method: { name: string };
    level_learned_at: number;
  }[];
}

interface PokemonApiResponse {
  name: string;
  abilities: ApiAbility[];
  stats: ApiStat[];
  moves: ApiMove[];
}

interface SpeciesApiResponse {
  evolution_chain: { url: string };
}

interface EvolutionChainResponse {
  chain: {
    species: { name: string };
    evolves_to: any[];
    evolution_details: { min_level?: number }[];
  };
}

// ---------------- Fetch with cache ----------------
async function fetchJsonWithCache<T>(url: string, cacheFile: string): Promise<T> {
  const cachePath = path.join(cacheDir, cacheFile);

  if (fs.existsSync(cachePath)) {
    const raw = fs.readFileSync(cachePath, "utf-8");
    return JSON.parse(raw) as T;
  }

  const res = await fetch(url);
  const data = await res.json() as T;
  fs.writeFileSync(cachePath, JSON.stringify(data, null, 2), "utf-8");
  return data;
}

// ---------------- Fetch & parse Pokémon ----------------
async function fetchPokemonData(id: number): Promise<PokemonData> {
  const data = await fetchJsonWithCache<PokemonApiResponse>(
    `https://pokeapi.co/api/v2/pokemon/${id}`,
    `pokemon-${id}.json`
  );

  const species = data.name.charAt(0).toUpperCase() + data.name.slice(1);

  // Ability slots
  const abilities: PokemonAbilitySlots = {};
  for (const ab of data.abilities) {
    const abilityName = ab.ability.name
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(" ");

    if (ab.is_hidden) abilities.hidden = abilityName;
    else if (ab.slot === 1) abilities.slot0 = abilityName;
    else if (ab.slot === 2) abilities.slot1 = abilityName;
  }

  const baseStats = {
    hp: data.stats.find((s) => s.stat.name === "hp")!.base_stat,
    attack: data.stats.find((s) => s.stat.name === "attack")!.base_stat,
    defense: data.stats.find((s) => s.stat.name === "defense")!.base_stat,
    specialAttack: data.stats.find((s) => s.stat.name === "special-attack")!.base_stat,
    specialDefense: data.stats.find((s) => s.stat.name === "special-defense")!.base_stat,
    speed: data.stats.find((s) => s.stat.name === "speed")!.base_stat,
  };

  // Moves
  const moves: MoveEntry[] = data.moves
    .filter((m) =>
      m.version_group_details.some((v) => v.move_learn_method.name === "level-up")
    )
    .map((m) => {
      const lvl = m.version_group_details.find(
        (v) => v.move_learn_method.name === "level-up"
      )!;
      return {
        name: m.move.name
          .split("-")
          .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
          .join(" "),
        level: lvl.level_learned_at,
      };
    })
    .filter(
      (v, i, a) => a.findIndex((t) => t.name === v.name && t.level === v.level) === i
    )
    .sort((a, b) => a.level - b.level);

  // Evolution data
  const speciesData = await fetchJsonWithCache<SpeciesApiResponse>(
    `https://pokeapi.co/api/v2/pokemon-species/${id}`,
    `species-${id}.json`
  );

  // Use a simple filename for evolution chain cache
  const evoId = speciesData.evolution_chain.url.split("/").filter(Boolean).pop()!;
  const evoChain = await fetchJsonWithCache<EvolutionChainResponse>(
    speciesData.evolution_chain.url,
    `evo-${evoId}.json`
  );

  function parseEvolution(chain: EvolutionChainResponse["chain"], currentSpecies: string): Evolution | undefined {
    if (chain.species.name === currentSpecies && chain.evolves_to.length > 0) {
      const next = chain.evolves_to[0];
      const evoDetails = next.evolution_details[0];
      const level = evoDetails.min_level ?? 10;

      return {
        evolvesTo: next.species.name.charAt(0).toUpperCase() + next.species.name.slice(1),
        level,
      };
    }

    for (const c of chain.evolves_to) {
      const found = parseEvolution(c, currentSpecies);
      if (found) return found;
    }
    return undefined;
  }

  const evolution = parseEvolution(evoChain.chain, data.name);

  return { species, abilities, baseStats, moves, evolution };
}

// ---------------- Generate all Pokémon ----------------
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function generateAllPokemon() {
  const pokemonList: PokemonData[] = [];

  for (let i = 1; i <= 649; i++) {
    try {
      console.log(`Fetching Pokémon #${i}`);
      const p = await fetchPokemonData(i);
      pokemonList.push(p);
      await delay(150); // Small delay to prevent API throttling
    } catch (err) {
      console.error(`Failed to fetch Pokémon #${i}:`, err);
    }
  }

  const tsContent =
    `export interface MoveEntry { name: string; level: number; }\n` +
    `export interface Evolution { evolvesTo: string; level: number; }\n` +
    `export interface PokemonAbilitySlots { slot0?: string; slot1?: string; hidden?: string; }\n` +
    `export interface PokemonData { species: string; abilities: PokemonAbilitySlots; baseStats: { hp: number; attack: number; defense: number; specialAttack: number; specialDefense: number; speed: number; }; moves: MoveEntry[]; evolution?: Evolution; }\n\n` +
    `export const pokemonList: PokemonData[] = ${JSON.stringify(pokemonList, null, 2)};`;

  const outPath = path.join(__dirname, "pokemonData.ts");
  fs.writeFileSync(outPath, tsContent, "utf-8");
  console.log(`pokemonData.ts generated successfully at ${outPath}`);
}

// ---------------- Run ----------------
generateAllPokemon().catch(console.error);
