import React, { useState } from "react";
import { GameStateProvider, useGameState } from "./state/GameStateContext";
import MainMenu from "./screens/MainMenu";
import RouteSelection from "./screens/RouteSelection";
import TeamEditor from "./screens/TeamEditor";
import BoxScreen from "./screens/BoxScreen";
import { routes } from "./data/routes"; // <-- import your routes here

type Screen = "menu" | "route" | "team" | "box";

// Pull all route names dynamically from routes.ts
const allRoutes = routes.map(r => r.name);

const AppContent: React.FC<{ currentScreen: Screen; setCurrentScreen: (s: Screen) => void }> = ({
  currentScreen,
  setCurrentScreen,
}) => {
  const { state, dispatch } = useGameState();

  const handleNextBattle = () => {
    dispatch({ type: "INCREASE_ACE_LEVEL", amount: 5 });

    const possibleItems = [
      "Leftovers",
      "Choice Band",
      "Choice Scarf",
      "Life Orb",
      "Choice Specs",
      "Sitrus Berry",
      "Lum Berry",
      "Charcoal",
      "Mystic Water",
    ];

    const availableItems = possibleItems.filter(item => !state.itemsUnlocked.includes(item));

    let randomItem = null;
    if (availableItems.length > 0) {
      randomItem = availableItems[Math.floor(Math.random() * availableItems.length)];
      dispatch({ type: "ADD_ITEM", item: randomItem });
    }

    // Unlock next route if available
    const lockedRoutes = allRoutes.filter(route => !state.routesUnlocked.includes(route));
    let unlockedRoute = null;
    if (lockedRoutes.length > 0) {
      unlockedRoute = lockedRoutes[0];
      dispatch({ type: "UNLOCK_ROUTE", route: unlockedRoute });
    }

    alert(
      `Ace level increased to ${state.aceLevel + 5}!\n` +
      (randomItem ? `You received: ${randomItem}\n` : "") +
      (unlockedRoute ? `New route unlocked: ${unlockedRoute}` : "No new routes to unlock.")
    );

    console.log("Current ace level:", state.aceLevel);
    console.log("Random item added:", randomItem);
    console.log("Unlocked routes:", state.routesUnlocked);
  };

  return (
    <>
      {currentScreen === "menu" && (
        <MainMenu
          onAvailableEncounters={() => setCurrentScreen("route")}
          onOpenBox={() => setCurrentScreen("box")}
          onEditParty={() => setCurrentScreen("team")}
          onOpponentPreview={() => alert("Opponent Preview not implemented yet")}
          onNextBattle={handleNextBattle}
        />
      )}

      {currentScreen === "route" && (
        <RouteSelection onBack={() => setCurrentScreen("menu")} />
      )}

      {currentScreen === "team" && <TeamEditor onBack={() => setCurrentScreen("menu")} />}
      {currentScreen === "box" && <BoxScreen onBack={() => setCurrentScreen("menu")} />}
    </>
  );
};

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("menu");

  return (
    <GameStateProvider>
      <AppContent currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
    </GameStateProvider>
  );
};

export default App;
