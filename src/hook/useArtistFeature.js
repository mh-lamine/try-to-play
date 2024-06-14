import { useState } from "react";


export const useArtistFeature = () => {


  const fetchFeaturings = async (artist, answer) => {
    const artistEncoded = encodeURIComponent(artist);
    const answerEncoded = encodeURIComponent(answer);
    const url = `https://spotify23.p.rapidapi.com/search/?q=${artistEncoded}%20${answerEncoded}&type=multi&offset=0&limit=10&numberOfTopResults=5`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'f1957f667bmshd067e1769b08d51p1bfa1ajsn8af9373ffb68',
        'x-rapidapi-host': 'spotify23.p.rapidapi.com'
      }
    };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result.tracks.items
      } catch (error) {
        console.error(error);
      }
    
  };



  const checkAnswer = async (answer, currentArtist) => {
    const tracks = await fetchFeaturings(currentArtist, answer);
    const artistsInTracks = tracks.map((feat) => feat.data.artists.items).filter((artists) => artists.length > 1).map((artists) => {
      return artists.map((artist) => {
        return artist.profile.name
      })
    });
    const featExists = artistsInTracks.filter((artists) => artists.includes(answer) && artists.includes(currentArtist))
    if (featExists.length > 0) {
      return true
    }
    return false
  };

  return { checkAnswer };
};