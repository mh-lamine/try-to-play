import { useState } from "react";

export default function App() {
  const [artistId, setArtistId] = useState();
  const [answer, setAnswer] = useState();
  const [featurings, setFeaturings] = useState([]);
  const [loading, setLoading] = useState(false);

  const getArtistId = async () => {
    const response = await fetch(
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
    const result = await response.json();
    setArtistId(result.artists.items[0].data.uri.split(":")[2]);
    console.log(artistId);
  };

  const getFeaturings = async () => {
    console.log(artistId, "artistId");
    const response = await fetch(
      `https://spotify23.p.rapidapi.com/artist_appears_on/?id=${artistId}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "058441d088mshaf86c5681fd5074p1d4e7cjsn0e487ad2d27a",
          "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
        },
      }
    );
    const result = await response.json();
    console.log(result, "result");
    !result.errors &&
      setFeaturings(result.data.artist.relatedContent.appearsOn.items);
      console.log(result, "featurings")
  };
//FIXME: i have to click three times to get the result
  const checkAnswer = async () => {
    setLoading(true);
    await getArtistId();
    await getFeaturings();
    setLoading(false);
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
      <div>
        {loading && <h2>checking featuring...</h2>}
        {featurings &&
          featurings.map((feat, index) => {
            return (
              <div key={index}>
                <h2>{feat.releases.items[0].artists.items[0].profile.name}</h2>
              </div>
            );
          })}
      </div>
    </div>
  );
}
