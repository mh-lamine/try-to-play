import { useState } from "react";

export default function App() {
  const [artistId, setArtistId] = useState();
  const [answer, setAnswer] = useState();
  const [featurings, setFeaturings] = useState();

  const checkAnswer = async () => {
    // fetch artist id
    const responseId = await fetch(
      `https://spotify23.p.rapidapi.com/search/?q=${answer}&type=artists&offset=0&limit=1`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "058441d088mshaf86c5681fd5074p1d4e7cjsn0e487ad2d27a",
          "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
        },
      }
    );
    const dataId = await responseId.json();
    setArtistId(dataId.artists.items[0].data.uri.split(":")[2]);

    // fetch artist featurings
    const responseFeat = await fetch(
      `https://spotify23.p.rapidapi.com/artist_appears_on/?id=${
        dataId.artists.items[0].data.uri.split(":")[2]
      }`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "058441d088mshaf86c5681fd5074p1d4e7cjsn0e487ad2d27a",
          "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
        },
      }
    );

    const dataFeat = await responseFeat.json();
    setFeaturings(dataFeat);
    console.log(dataFeat);
  };

  return (
    <div className="flex flex-col items-center">
      <h1>booba</h1>
      <input
        type="text"
        className="border-black border-2"
        onChange={(event) => setAnswer(event.target.value)}
      />
      <button onClick={checkAnswer}>Search</button>
      {artistId && (
        <div>
          <h2>{artistId}</h2>
        </div>
      )}
    </div>
  );
}
