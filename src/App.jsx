import { BrowserRouter } from "react-router-dom";
import AddPlayer from "./components/own/AddPlayer";
import FixedBarNav from "./components/own/FixedBarNav";
import RemovePlayer from "./components/own/RemovePlayer";
import ShowPlayers from "./components/own/ShowPlayers";
import ValidationText from "./components/own/ValidationText";
import useGetFeaturings from "./hook/useGetFeaturings";
import { PlayersProvider } from "./contexts_providers/players";
import AppRouter from "./lib/router";
import { GameProvider } from "./contexts_providers/game";



export default function App() {
  const { setAnswer, checkAnswer, currentArtist, hasFeated, loading } = useGetFeaturings();



  

  return (
    <main className="h-screen w-screen relative">
      <BrowserRouter>
        <GameProvider>
          <PlayersProvider>
            <ShowPlayers/>
            <AppRouter/>
          </PlayersProvider>
        </GameProvider>
        <FixedBarNav/>
      </BrowserRouter>
    </main>
  );
}


