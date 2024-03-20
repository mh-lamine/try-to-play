import { useEffect, useState } from "react";

export default function App() {
  const [artist, setArtist] = useState([]);
  const [artistName, setArtistName] = useState();

  const fetchArtistByName = async () => {
    const url = `https://spotify23.p.rapidapi.com/search/?q=${artistName}&type=artists&offset=0&limit=10&numberOfTopResults=5`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "058441d088mshaf86c5681fd5074p1d4e7cjsn0e487ad2d27a",
        "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();
    setArtist(data.artists.items[0].data);
  };

  useEffect(() => {
    console.log(artist);
  }, [artist]);

  return (
    <div className="flex flex-col items-center">
      <h1>Artist</h1>
      <input
        type="text"
        className="border-black border-2"
        onChange={(event) => setArtistName(event.target.value)}
      />
      <button onClick={fetchArtistByName}>Search</button>
      {artist && (
        <div>
          <h2>{artist.profile.name}</h2>
        </div>
      )}
    </div>
  );
}
