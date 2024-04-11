import { useEffect, useState } from "react";
import { useRouteLoaderData } from "react-router-dom";
import classes from './GuessSong.module.css'

const GuessSongPage = () => {
  const { tracks: { items: initialTracks } } = useRouteLoaderData('playlist-details');
  const [correctTrack, setCorrectTrack] = useState(null);
  const [availableAnswers, setAvailableAnswers] = useState([]);
  const [previousTracks, setPreviousTracks] = useState(new Set());
  const [isCorrect, setIsCorrect] = useState(null);
  const [audio, setAudio] = useState(null);
  const [error, setError] = useState('')

  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
        setAudio(null);
      }
    };
  }, [audio]);

  function pickRandomTrack(tracks) {
    let filteredTracks = tracks.filter(track => track.track.preview_url);
    
    return filteredTracks[Math.floor(Math.random() * filteredTracks.length)];
  }

  function randomiseAnswerOrder(array) {
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  function selectCorrectAnswer(newTracks) {
    let correct = pickRandomTrack(newTracks);
    setCorrectTrack(correct);

    if (correct === undefined) {
      setError('No more available songs in this playlist')
      return;
    }

    setPreviousTracks(prev => new Set(prev).add(correct.track.id));
    return correct;
  }

  function generateDecoyAnswerOptions(correct) {
    const answers = [correct];
    while (answers.length < 4) {
      let decoyAnswer = pickRandomTrack(initialTracks);
      if (!answers.find(answer => answer.track.id === decoyAnswer.track.id)) {
        answers.push(decoyAnswer);
      }
    }
    return answers;
  }

  function manageAudioPlayback(correctTrack) {
    if (audio) audio.pause();
    const newAudio = new Audio(correctTrack.track.preview_url);
    setAudio(newAudio);
    newAudio.play();
    setTimeout(() => {
      newAudio.pause();
      setAudio(null);
    }, 10000);
  }

  function handleStartGuessing() {
    setIsCorrect(null);

    const newTracks = initialTracks.filter(track => !previousTracks.has(track.track.id));

    const correct = selectCorrectAnswer(newTracks)
    if (correct === undefined) {
      return;
    }

    const answers = generateDecoyAnswerOptions(correct)

    setAvailableAnswers(randomiseAnswerOrder(answers));
    manageAudioPlayback(correct)
  }

  function handleAnswer(event) {
    const answer = event.target.value;
    const isAnswerCorrect = answer === correctTrack.track.name;
    setIsCorrect(isAnswerCorrect);
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div>
        <div className={classes.answersContainer}>
          {availableAnswers.map((answer, index) => (
            <button className={classes.button} key={index} onClick={handleAnswer} value={answer.track.name}>
              {answer.track.name}
            </button>
          ))}
        </div>
        {isCorrect && <h1 className={classes.correctGuess}>Correct!</h1>}
        {isCorrect === false && <h1 className={classes.incorrectGuess}>Incorrect!</h1>}
      </div>
      <button className={classes.button} onClick={handleStartGuessing}>{correctTrack ? "Next!" : "Start!"}</button>
    </>
  );
};

export default GuessSongPage;
