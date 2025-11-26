import React from "react";
import { useGameState } from "../state/GameStateContext";
import { FaDragon, FaEye, FaBoxOpen, FaUsers } from "react-icons/fa"; // example icons

type MainMenuProps = {
  onAvailableEncounters?: () => void;
  onOpponentPreview?: () => void;
  onOpenBox?: () => void;
  onEditParty?: () => void;
  onNextBattle?: () => void;
};

const MainMenu: React.FC<MainMenuProps> = ({
  onAvailableEncounters,
  onOpponentPreview,
  onOpenBox,
  onEditParty,
  onNextBattle,
}) => {
  const { state } = useGameState();

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 30,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "linear-gradient(180deg, #111 0%, #222 100%)",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header */}
      <h1 style={{ fontSize: 44, marginBottom: 30 }}>Main Menu</h1>

      {/* Next Battle Indicator */}
      <div
        style={{
          marginBottom: 20,
          fontSize: 20,
          display: "flex",
          gap: 16,
          alignItems: "center",
        }}
      >
        <span>Next Boss: #{state.nextBossIndex + 1}</span>
      </div>

      {/* 2x2 Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          width: "100%",
          maxWidth: 800,
          marginBottom: 30,
        }}
      >
        {/* Available Encounters */}
        <button
          onClick={onAvailableEncounters}
          style={{
            padding: "40px 20px",
            fontSize: 24,
            borderRadius: 50,
            border: "2px solid #888",
            backgroundColor: "#333",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          <FaDragon size={48} style={{ marginBottom: 12 }} />
          Available Encounters
        </button>

        {/* Opponent Preview */}
        <button
          onClick={onOpponentPreview}
          style={{
            padding: "40px 20px",
            fontSize: 24,
            borderRadius: 50,
            border: "2px solid #888",
            backgroundColor: "#333",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          <FaEye size={48} style={{ marginBottom: 12 }} />
          Opponent Preview
        </button>

        {/* Box */}
        <button
          onClick={onOpenBox}
          style={{
            padding: "40px 20px",
            fontSize: 24,
            borderRadius: 50,
            border: "2px solid #888",
            backgroundColor: "#333",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          <FaBoxOpen size={48} style={{ marginBottom: 12 }} />
          Box
        </button>

        {/* Party Edit */}
        <button
          onClick={onEditParty}
          style={{
            padding: "40px 20px",
            fontSize: 24,
            borderRadius: 50,
            border: "2px solid #888",
            backgroundColor: "#333",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          <FaUsers size={48} style={{ marginBottom: 12 }} />
          Party Edit
        </button>
      </div>

      {/* Next Battle Button */}
      <button
        onClick={onNextBattle}
        style={{
          padding: "20px 40px",
          fontSize: 28,
          borderRadius: 50,
          border: "2px solid #ffcc33",
          backgroundColor: "#444",
          color: "#ffcc33",
          cursor: "pointer",
          width: "100%",
          maxWidth: 800,
          transition: "all 0.2s",
        }}
      >
        Next Battle!
      </button>
    </div>
  );
};

export default MainMenu;
