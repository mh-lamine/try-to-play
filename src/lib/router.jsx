import AddPlayerPage from '@/pages/AddPlayerPage';
import Game from '@/pages/Game';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import RemovePlayerPage from '@/pages/RemovePlayerPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Settings from '@/pages/Settings';



export default function AppRouter(){
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="game" element={<Game />} />
            <Route path="/add_player" element={<AddPlayerPage />} />
            <Route path="/remove_player" element={<RemovePlayerPage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
