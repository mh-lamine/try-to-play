import { useContext, useRef, useState } from "react";
import { useArtistFeature } from "@/hook/useArtistFeature"; // Adjust the path as needed
import { GameContext } from "@/contexts_providers/game";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import artists from '@/lib/artists.json'
import FormResMessage from "@/components/own/FormResMessage";

export default function Game() {
  const { game, actions } = useContext(GameContext);
  const players = Object.values(game.players).filter((player) => player.playing);
  const [currentArtist, setCurrentArtist] = useState(randomArtist());
  const [answer, setAnswer] = useState("");
  const [prevAnswers, setPrevAnswers] = useState([currentArtist])
  const [resMessage, setResMessage] = useState({
    type: "",
    message: "",
  })
  const { checkAnswer } = useArtistFeature();
  const nav = useNavigate();
  const alreadyAnswered = useRef(false);



  function randomArtist(){
    const int = Math.floor(Math.random() * artists.length);
    return artists[int];
  }


  const handleCheckAnswer = async () => {
    setResMessage({
      type: "loading",
      message: "Vérification de la réponse...",
    })

    if (prevAnswers.includes(answer)){
      setResMessage({
        type: "error",
        message: alreadyAnswered.current === false ? "Cette réponse a déjà été donnée ! Essayez une autre réponse..." : "Encore râté, au tour du prochain joueur..."
      })
      setTimeout(() => {
        setResMessage({
          type: "",
          message: ""
        })
        setAnswer("")
        if (alreadyAnswered.current === true) actions.nextPlayer()
        alreadyAnswered.current = !alreadyAnswered.current;
        return
      }, 2000)
      return
    }
    const hasFeated = await checkAnswer(answer, currentArtist);
    if (hasFeated){
      setResMessage({
        type: "success",
        message: "Bonne réponse !"
      })
      setCurrentArtist(answer)
      setPrevAnswers([...prevAnswers, answer])
      setTimeout(() => {
        setResMessage({
          type: "",
          message: ""
        })
        setAnswer("")
        actions.updateScore(game.current_player, true)
        players.filter((player) => player.id === game.current_player)[0].score >= 10 ? actions.endGame() : actions.nextPlayer()
      }, 1000)
    }
    else {
      setResMessage({
        type: "error",
        message: "Mauvaise réponse ! Au tour du prochain joueur..."
      })
      setTimeout(() => {
        setResMessage({
          type: "",
          message: ""
        })
        setAnswer("")
        actions.updateScore(game.current_player, false)
        actions.nextPlayer()
      }, 1000)
    }
  };


  if (!players | players.length === 0) return ( 
    <div className="flex flex-col h-screen p-4 items-center justify-center gap-y-3">
      <h1 className="text-xl p-4 uppercase font-mono tracking-wider">
        Veuillez d'abord ajouter des joueurs
      </h1>
      <Button className="w-1/2" onClick={(e) => {
        e.preventDefault();
        nav('/add_player')
      }}>Ajouter des joueurs</Button>
    </div>
  )


  if (game.isGameStarted === false && game.winner === null) return (
    <div className="flex flex-col h-screen p-4 items-center justify-center">
      <h1 className=" w-2/3 text-wrap text-xl p-4 text-center uppercase font-mono tracking-wider">
        Vous êtes prêt à jouer ! Lancez la partie dès maintenant
      </h1>
      <Button className="w-1/5" onClick={(e) => {
        e.preventDefault();
        actions.startGame();
        
      }}>Lancer la partie</Button>
    </div>
  )

  if (game.winner !== null) return (
    <div className="flex flex-col h-screen p-4 items-center justify-center gap-y-10">
      <h1 className="text-4xl p-4 uppercase font-mono tracking-wider">
        {game.winner.name} a gagné la partie avec {game.winner.score} points !
      </h1>
      <Button className="w-1/5" onClick={(e) => {
        e.preventDefault();
        window.location.reload();
      }}>Rejouer</Button>
    </div>
  )


  return (
    <div className="flex flex-col h-screen p-4 items-center justify-center gap-y-10">
      <h1 className="text-4xl p-4 uppercase font-mono tracking-wider">
        Artiste Actuel : {currentArtist}
      </h1>
      <div className="flex flex-col items-center gap-4 w-full">
        <Label className='text-2xl' htmlFor="answer">{players.find((player) => player.id === game.current_player).name}, à votre tour !</Label>
        <Input value={answer} onChange={(e) => {
          setAnswer(e.target.value);
        }} type="text" autoFocus name="answer" id="answer" className=" w-1/3 text-center px-10 py-2 bg-transparent border border-slate-700 overflow-auto" placeholder={`1 seul tentative possible !`}/>
        <Button onClick={handleCheckAnswer} className="w-1/4">Valider</Button>
      </div>

      <div className="flex flex-col items-center gap-y-3">
        <p className="text-wrap w-2/3 text-center">La partie se termine lorsque un joueur atteint 10 points, que le meilleur gagne ! </p>
        <div className="flex gap-x-4 items-center w-full justify-center">
          <Button onClick={(e) => {
            e.preventDefault();
            const newArtist = randomArtist();
            setCurrentArtist(newArtist);
            setPrevAnswers([...prevAnswers, newArtist])
          }}>Donner un autre artiste</Button>
          <Button onClick={(e) => {
            e.preventDefault();
            actions.endGame();
          }}>Terminer la partie</Button>
        </div>
      </div>

        {resMessage && <FormResMessage resMessage={resMessage} />}
    </div>
  );
}
