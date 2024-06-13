import { useState } from "react";

export const useArtistFeature = () => {
  const [loading, setLoading] = useState(false);
  const [hasFeated, setHasFeated] = useState(false);

  const fetchArtistId = async (artistName) => {
    const response = await fetch(
      `https://spotify23.p.rapidapi.com/search/?q=${artistName}&type=artists&offset=0&limit=1`,
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
    return result.artists.items[0].data.uri.split(":")[2];
  };

  const fetchFeaturings = async (artistId) => {
    const response = await fetch(
      `https://spotify23.p.rapidapi.com/artist_appears_on/?id=${artistId}`,
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

  const checkFeaturings = (featuredWith, artistName) => {
    return featuredWith.some((feat) =>
      feat.releases.items[0].artists.items.some(
        (artist) =>
          artist.profile.name.toLowerCase() === artistName.toLowerCase()
      )
    );
  };

  const checkAnswer = async (answer, currentArtist, setCurrentArtist) => {
    setLoading(true);
    const artistId = await fetchArtistId(answer);
    const featuredWith = await fetchFeaturings(artistId);
    const hasFeated = checkFeaturings(featuredWith, currentArtist);
    setHasFeated(hasFeated);
    if (hasFeated) {
      setCurrentArtist(answer);
    }
    setLoading(false);
  };

  return { loading, hasFeated, checkAnswer };
};