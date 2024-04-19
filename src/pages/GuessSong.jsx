import { useEffect, useState } from 'react'
import { useRouteLoaderData } from 'react-router-dom'
import classes from './GuessSong.module.css'
import QuestionTimer from '../components/QuestionTimer'
import { motion } from 'framer-motion'

const MAX_CHAR_SONG_TITLE = 50

const GuessSongPage = () => {
  const {
    tracks: { items: initialTracks },
  } = useRouteLoaderData('playlist-details')
  const [correctTrack, setCorrectTrack] = useState(null)
  const [availableAnswers, setAvailableAnswers] = useState([])
  const [previousTracks, setPreviousTracks] = useState(new Set())
  const [answer, setAnswer] = useState({
    selectedAnswer: '',
    isCorrect: null,
  })
  const [audio, setAudio] = useState(null)
  const [error, setError] = useState('')
  const [timerKey, setTimerKey] = useState(0)

  let timer = 10000

  const isFirefox = typeof InstallTrigger !== 'undefined'
  // Workaround for now, in chrome browser 10s = 10s, but in firefox 10s = 12.5s need to investigate further
  if (isFirefox) {
    timer = 8000
  }

  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause()
        setAudio(null)
      }
    }
  }, [audio])

  function pickRandomTrack(tracks) {
    let filteredTracks = tracks.filter(track => track.track.preview_url)

    return filteredTracks[Math.floor(Math.random() * filteredTracks.length)]
  }

  function randomiseAnswerOrder(array) {
    const shuffled = array.slice()
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  function selectCorrectAnswer(newTracks) {
    let correct = pickRandomTrack(newTracks)
    setCorrectTrack(correct)

    if (correct === undefined) {
      setError('No more available songs in this playlist')
      return
    }

    setPreviousTracks(prev => new Set(prev).add(correct.track.id))
    return correct
  }

  function generateDecoyAnswerOptions(correct) {
    const answers = [correct]
    while (answers.length < 4) {
      let decoyAnswer = pickRandomTrack(initialTracks)
      if (!answers.find(answer => answer.track.id === decoyAnswer.track.id)) {
        answers.push(decoyAnswer)
      }
    }
    return answers
  }

  function manageAudioPlayback(correctTrack) {
    if (audio) audio.pause()
    const newAudio = new Audio(correctTrack.track.preview_url)
    setAudio(newAudio)
    newAudio.play()
    setTimeout(() => {
      newAudio.pause()
      setAudio(null)
    }, 10000)
  }

  function handleStartGuessing() {
    setTimerKey(prevKey => prevKey + 1)
    setAnswer({
      selectedAnswer: null,
      isCorrect: null,
    })

    const newTracks = initialTracks.filter(
      track => !previousTracks.has(track.track.id)
    )

    const correct = selectCorrectAnswer(newTracks)
    if (correct === undefined) {
      return
    }

    const answers = generateDecoyAnswerOptions(correct)

    setAvailableAnswers(randomiseAnswerOrder(answers))
    manageAudioPlayback(correct)
  }

  function handleAnswer(event) {
    const userSelection = event.target.value
    const isAnswerCorrect = userSelection === correctTrack.track.name
    setAnswer({
      selectedAnswer: userSelection,
      isCorrect: isAnswerCorrect,
    })
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <motion.div
      initial={{ y: -25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        ease: 'linear',
        duration: 0.5,
      }}
    >
      <div className={classes.mainContainer}>
        <h1>Guess current song</h1>
        {correctTrack && (
          <QuestionTimer
            key={timerKey}
            timeout={timer}
            onTimeout={() => {
              if (answer.selectedAnswer === null) {
                setAnswer({ selectedAnswer: null, isCorrect: false })
              }
            }}
            mode={classes.timerBar}
          />
        )}
        <div className={classes.answersContainer}>
          {availableAnswers.map((availableAnswer, index) => (
            <button
              disabled={answer.isCorrect !== null}
              className={`${classes.button}
              ${answer.selectedAnswer === availableAnswer.track.name ? classes.selectedAnswer : ''}
              ${answer.selectedAnswer === availableAnswer.track.name && audio === null ? (answer.selectedAnswer === correctTrack.track.name ? classes.correctAnswer : classes.selectedWrongAnswer) : ''}
              ${audio === null && availableAnswer.track.name === correctTrack.track.name ? classes.correctAnswer : ''}`}
              key={index}
              onClick={handleAnswer}
              value={availableAnswer.track.name}
            >
              {availableAnswer.track.name.length > MAX_CHAR_SONG_TITLE
                ? availableAnswer.track.name.substring(0, 50) + '...'
                : availableAnswer.track.name}
            </button>
          ))}
        </div>
        {answer.isCorrect !== null && audio === null && (
          <h1
            className={`${classes.revealedAnswerText} ${answer.isCorrect ? classes.revealedAnswerTextCorrect : classes.revealedAnswerTextIncorrect}`}
          >
            Correct answer is: {correctTrack.track.name}
          </h1>
        )}
      </div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        disabled={audio !== null}
        className={classes.button}
        onClick={handleStartGuessing}
      >
        {correctTrack ? 'Next!' : 'Start!'}
      </motion.button>
    </motion.div>
  )
}

export default GuessSongPage
