// src/data/pokemonData.ts

export interface MoveEntry {
  name: string;
  level: number; // Level at which the Pokémon can learn this move
}

export interface PokemonData {
  species: string;
  abilities: string[];
  baseStats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
  moves: MoveEntry[];
}

export const pokemonList: PokemonData[] = [
  {
    species: "Bulbasaur",
    abilities: ["Overgrow", "Chlorophyll"],
    baseStats: { hp: 45, attack: 49, defense: 49, specialAttack: 65, specialDefense: 65, speed: 45 },
    moves: [
      { name: "Tackle", level: 1 },
      { name: "Growl", level: 3 },
      { name: "Vine Whip", level: 7 }
    ]
  },
  {
    species: "Charmander",
    abilities: ["Blaze", "Solar Power"],
    baseStats: { hp: 39, attack: 52, defense: 43, specialAttack: 60, specialDefense: 50, speed: 65 },
    moves: [
      { name: "Scratch", level: 1 },
      { name: "Growl", level: 1 },
      { name: "Ember", level: 9 },
      { name: "Metal Claw", level: 13 },
      { name: "Flamethrower", level: 24 },
      { name: "Belly Drum", level: 32 },
      { name: "Rest", level: 40 }
    ]
  },
  {
    species: "Squirtle",
    abilities: ["Torrent", "Rain Dish"],
    baseStats: { hp: 44, attack: 48, defense: 65, specialAttack: 50, specialDefense: 64, speed: 43 },
    moves: [
      { name: "Tackle", level: 1 },
      { name: "Tail Whip", level: 4 },
      { name: "Water Gun", level: 7 }
    ]
  },
  {
    species: "Pikachu",
    abilities: ["Static", "Lightning Rod"],
    baseStats: { hp: 35, attack: 55, defense: 40, specialAttack: 50, specialDefense: 50, speed: 90 },
    moves: [
      { name: "Growl", level: 1 },
      { name: "Thunder Shock", level: 1 },
      { name: "Quick Attack", level: 5 }
    ]
  },
  {
    species: "Politoed",
    abilities: ["Drizzle", "Damp", "Water Absorb"],
    baseStats: { hp: 90, attack: 75, defense: 75, specialAttack: 90, specialDefense: 100, speed: 70 },
    moves: [
      { name: "Surf", level: 1 },
      { name: "Perish Song", level: 15 },
      { name: "Scald", level: 20 },
      { name: "Rest", level: 25 },
      { name: "Body Slam", level: 30 },
      { name: "Ice Beam", level: 40 }
    ]
  },
  {
    species: "Heracross",
    abilities: ["Guts", "Swarm", "Moxie"],
    baseStats: { hp: 80, attack: 125, defense: 75, specialAttack: 40, specialDefense: 95, speed: 85 },
    moves: [
      { name: "Megahorn", level: 1 },
      { name: "Pin Missile", level: 10 },
      { name: "Brick Break", level: 15 },
      { name: "Aerial Ace", level: 20 },
      { name: "Close Combat", level: 25 }
    ]
  },
  {
    species: "Leafeon",
    abilities: ["Leaf Guard", "Chlorophyll"],
    baseStats: { hp: 65, attack: 110, defense: 130, specialAttack: 60, specialDefense: 65, speed: 95 },
    moves: [
      { name: "Quick Attack", level: 1 },
      { name: "Giga Drain", level: 10 },
      { name: "Leaf Blade", level: 20 },
      { name: "Swords Dance", level: 30 }
    ]
  },
  {
    species: "Galvantula",
    abilities: ["Compound Eyes", "Unnerve"],
    baseStats: { hp: 70, attack: 77, defense: 60, specialAttack: 97, specialDefense: 60, speed: 108 },
    moves: [
      { name: "Sticky Web", level: 1 },
      { name: "Thunder Wave", level: 5 },
      { name: "Bug Buzz", level: 15 },
      { name: "Thunder", level: 25 }
    ]
  },
  {
    species: "Scyther",
    abilities: ["Swarm", "Technician"],
    baseStats: { hp: 70, attack: 110, defense: 80, specialAttack: 55, specialDefense: 80, speed: 105 },
    moves: [
      { name: "Wing Attack", level: 1 },
      { name: "Pursuit", level: 5 },
      { name: "Agility", level: 10 },
      { name: "Aerial Ace", level: 15 },
      { name: "X-Scissor", level: 20 }
    ]
  },
  {
    species: "Seel",
    abilities: ["Thick Fat", "Hydration", "Ice Body"],
    baseStats: { hp: 65, attack: 45, defense: 55, specialAttack: 45, specialDefense: 70, speed: 45 },
    moves: [
      { name: "Headbutt", level: 1 },
      { name: "Aqua Jet", level: 10 },
      { name: "Ice Shard", level: 15 },
      { name: "Rest", level: 20 }
    ]
  },
  {
    species: "Sharpedo",
    abilities: ["Rough Skin", "Speed Boost"],
    baseStats: { hp: 70, attack: 120, defense: 40, specialAttack: 95, specialDefense: 40, speed: 95 },
    moves: [
      { name: "Crunch", level: 1 },
      { name: "Aqua Jet", level: 10 },
      { name: "Waterfall", level: 15 },
      { name: "Ice Fang", level: 20 }
    ]
  },
  {
    species: "Poliwhirl",
    abilities: ["Water Absorb", "Damp", "Swift Swim"],
    baseStats: { hp: 65, attack: 65, defense: 65, specialAttack: 50, specialDefense: 50, speed: 90 },
    moves: [
      { name: "Bubble Beam", level: 1 },
      { name: "Hypnosis", level: 5 },
      { name: "Body Slam", level: 10 },
      { name: "Rain Dance", level: 15 }
    ]
  },
  {
    species: "Donphan",
    abilities: ["Sturdy", "Sand Veil"],
    baseStats: { hp: 90, attack: 120, defense: 120, specialAttack: 60, specialDefense: 60, speed: 50 },
    moves: [
      { name: "Rollout", level: 1 },
      { name: "Rapid Spin", level: 5 },
      { name: "Earthquake", level: 10 },
      { name: "Rock Slide", level: 15 }
    ]
  },
  {
    species: "Marowak",
    abilities: ["Rock Head", "Lightning Rod", "Battle Armor"],
    baseStats: { hp: 60, attack: 80, defense: 110, specialAttack: 50, specialDefense: 80, speed: 45 },
    moves: [
      { name: "Bonemerang", level: 1 },
      { name: "Double-Edge", level: 5 },
      { name: "Earthquake", level: 10 },
      { name: "Focus Energy", level: 15 }
    ]
  },
  {
    species: "Sableye",
    abilities: ["Keen Eye", "Stall", "Prankster"],
    baseStats: { hp: 50, attack: 75, defense: 75, specialAttack: 65, specialDefense: 65, speed: 50 },
    moves: [
      { name: "Shadow Sneak", level: 1 },
      { name: "Confuse Ray", level: 5 },
      { name: "Shadow Ball", level: 10 },
      { name: "Recover", level: 15 },
      { name: "Night Shade", level: 20 }
    ]
  },
  {
    species: "Umbreon",
    abilities: ["Synchronize", "Inner Focus"],
    baseStats: { hp: 95, attack: 65, defense: 110, specialAttack: 60, specialDefense: 130, speed: 65 },
    moves: [
      { name: "Protect", level: 1 },
      { name: "Confuse Ray", level: 5 },
      { name: "Wish", level: 10 },
      { name: "Foul Play", level: 15 },
      { name: "Dark Pulse", level: 20 }
    ]
  }
];
