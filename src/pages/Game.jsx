import ValidationText from "@/components/own/ValidationText";
import { useState } from "react";
import { useArtistFeature } from "@/hook/useArtistFeature"; // Adjust the path as needed

export default function Game() {
  const [currentArtist, setCurrentArtist] = useState("booba");
  const [answer, setAnswer] = useState("");
  const { loading, hasFeated, checkAnswer } = useArtistFeature();

  const handleCheckAnswer = () => {
    checkAnswer(answer, currentArtist, setCurrentArtist);
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
          onClick={handleCheckAnswer}
          className="text-3xl w-fit font-light shadow-md p-3 bg-cyan-100 rounded-lg text-slate-700"
        >
          Valider
        </button>
      </div>
      <h1 className="text-4xl p-4 uppercase font-mono tracking-wider">
        {currentArtist}
      </h1>
      <ValidationText hasFeated={hasFeated} loading={loading} />
    </div>
  );
}
