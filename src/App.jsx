import { useState } from "react";
import ValidationText from "./components/ValidationText";

export default function App() {
  const [currentArtist, setCurrentArtist] = useState("booba");
  const [answer, setAnswer] = useState();
  const [hasFeated, setHasFeated] = useState(false);
  const [loading, setLoading] = useState(false);

  const getArtistId = async () => {
    const response = await fetch(
      `https://spotify23.p.rapidapi.com/search/?q=${answer}&type=artists&offset=0&limit=1`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "e870647cf5mshfaba88a093b8a2bp196d84jsne18a2e7ea834",
          "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
        },
      }
    );
    let result = await response.json();
    return result.artists.items[0].data.uri.split(":")[2];
  };

  const getFeaturings = async () => {
    const id = await getArtistId();
    const response = await fetch(
      `https://spotify23.p.rapidapi.com/artist_appears_on/?id=${id}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "e870647cf5mshfaba88a093b8a2bp196d84jsne18a2e7ea834",
          "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
        },
      }
    );
    const result = await response.json();
    return result.data.artist.relatedContent.appearsOn.items;
  };
  const checkAnswer = async () => {
    setLoading(true);
    const featuredWith = await getFeaturings();
    setHasFeated(
      featuredWith.some(
        (feat) =>
          feat.releases.items[0].artists.items[0].profile.name.toLowerCase() ===
          currentArtist.toLowerCase()
      )
    );
    //FIXME: 
    console.log(hasFeated)
    hasFeated && setCurrentArtist(answer);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen p-4 items-center justify-around bg-stone-300">
      <div className="flex flex-col items-center gap-4">
        <input
          type="text"
          className="text-3xl p-2 focus:outline-none shadow-sm text-center bg-transparent border-b-2 border-slate-700"
          onChange={(event) => setAnswer(event.target.value)}
        />
        <button
          onClick={checkAnswer}
          className="text-3xl w-fit font-light shadow-md p-3 bg-cyan-100 rounded-lg text-slate-700"
        >
          Valider
        </button>
      </div>
      <h1 className="text-4xl p-4 uppercase font-mono tracking-wider">
        {currentArtist}
      </h1>
      <ValidationText hasFeated={hasFeated} loading={loading}/>
    </div>
  );
}
