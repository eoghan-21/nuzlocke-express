import React, { useState } from "react";

export type Option = {
  label: string;
  weight: number;
};

type CyclingSelectorProps = {
  options: Option[];
  onSelect: (option: Option) => void;
  disabled?: boolean;
  caughtPokemon?: string[]; // species names already caught
};

const getSpriteUrl = (species: string) =>
  `https://play.pokemonshowdown.com/sprites/gen5/${species.toLowerCase()}.png`;

const CyclingSelector: React.FC<CyclingSelectorProps> = ({
  options,
  onSelect,
  disabled = false,
  caughtPokemon = [],
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [spinning, setSpinning] = useState(false);

  const totalWeight = options.reduce((sum, o) => sum + o.weight, 0);

  const handleSpin = () => {
    if (spinning || options.length === 0 || disabled) return;

    // Pick final Pokémon (weighted)
    const rand = Math.random() * totalWeight;
    let cumulativeWeight = 0;
    let finalIndex = options.length - 1;
    for (let i = 0; i < options.length; i++) {
      cumulativeWeight += options[i].weight;
      if (rand <= cumulativeWeight) {
        finalIndex = i;
        break;
      }
    }
    const finalOption = options[finalIndex];

    setSpinning(true);

    let spins = 0;
    const totalCycles = options.length * 6 + finalIndex;

    const spinStep = () => {
      setCurrentIndex((prev) => (prev + 1) % options.length);
      spins++;

      const progress = spins / totalCycles;
      const delay = 30 + Math.pow(progress, 2) * 400; // ease-out

      if (spins < totalCycles) {
        setTimeout(spinStep, delay);
      } else {
        setSpinning(false);
        onSelect(finalOption);
      }
    };

    spinStep();
  };

  const containerWidth = options.length * 160;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
      }}
    >
      {/* Horizontal cycling list */}
      <div
        style={{
          display: "flex",
          gap: 32,
          justifyContent: "center",
          width: containerWidth,
          padding: "0 10px",
          overflow: "visible",
        }}
      >
        {options.map((opt, i) => {
          const isActive = i === currentIndex;
          const alreadyCaught = caughtPokemon.includes(opt.label);

          return (
            <div
              key={opt.label}
              style={{
                position: "relative",
                textAlign: "center",
                border: isActive ? "3px solid #ffcc33" : "2px solid #444",
                borderRadius: 8,
                padding: 8,
                transition: "all 0.1s",
                transform: isActive ? "scale(1.5)" : "scale(1.2)",
                boxShadow: isActive ? "0 0 12px #ffcc33" : undefined,
                minWidth: 96,
              }}
            >
              <img
                src={getSpriteUrl(opt.label)}
                alt={opt.label}
                style={{ width: 96, height: 96, imageRendering: "pixelated" }}
              />

              {/* Small badge instead of full overlay */}
              {alreadyCaught && (
                <div
                  style={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    padding: "2px 6px",
                    backgroundColor: "#ffcc33",
                    color: "#000",
                    fontSize: 12,
                    borderRadius: 4,
                    fontWeight: "bold",
                    boxShadow: "0 0 4px black",
                  }}
                >
                  ✓
                </div>
              )}

              <div style={{ fontSize: 16 }}>
                {opt.label} ({((opt.weight / totalWeight) * 100).toFixed(1)}%)
              </div>
            </div>
          );
        })}
      </div>

      {/* Spin button */}
      <button
        onClick={handleSpin}
        disabled={spinning || disabled}
        style={{
          padding: "10px 20px",
          fontSize: 18,
          cursor: spinning || disabled ? "not-allowed" : "pointer",
        }}
      >
        {spinning ? "Spinning..." : "SPIN"}
      </button>
    </div>
  );
};

export default CyclingSelector;
