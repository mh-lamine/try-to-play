import { BrowserRouter } from "react-router-dom";
import FixedBarNav from "./components/own/FixedBarNav";
import ShowPlayers from "./components/own/ShowPlayers";
import { PlayersProvider } from "./contexts_providers/players";
import AppRouter from "./lib/router";
import { GameProvider } from "./contexts_providers/game";



export default function App() {
  // const { setAnswer, checkAnswer, currentArtist, hasFeated, loading } = useGetFeaturings();



  

  return (
    <main className="h-screen w-screen relative">
      <BrowserRouter>
        <GameProvider>
            <ShowPlayers/>
            <AppRouter/>
        </GameProvider>
        <FixedBarNav/>
      </BrowserRouter>
    </main>
  );
}


