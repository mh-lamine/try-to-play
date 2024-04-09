import React, { useState, useEffect } from 'react'

export default function useGetFeaturings() {
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
        console.log(hasFeated)
        hasFeated && setCurrentArtist(answer);
        setLoading(false);
    };

    return {
        currentArtist,
        setCurrentArtist,
        answer,
        setAnswer,
        hasFeated,
        loading,
        checkAnswer
    }
}

