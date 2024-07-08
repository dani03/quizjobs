import { Button, Card } from "@material-tailwind/react"
import NavBar from "../../src/components/NavBar"
import ParticlesComponent from "../../src/components/ParticlesComponent"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../src/components/AppContext"
import PopupGame from "../../src/components/PopupGame"
import axios from "axios"
import { usePathname } from "next/navigation"
import DefaultDisplay from "../../src/components/DefaultDisplay"

const Quiz = () => {
  const { jwt, logout, isError, myProfile, quiz } = useContext(AppContext)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isCorrect, setIsCorrect] = useState(false)
  const [isWrong, setIsWrong] = useState(false)
  const [quizById, setQuizById] = useState(false)
  const [listOfAnswerIds, setListOfAnswerIds] = useState([])
  let currentQuestion = null
  const pathname = usePathname()

  useEffect(() => {
    const fetchQuiz = () => {
      try {
        if (pathname && quiz && quiz.data && quiz.data.length > 0) {
          const foundQuiz = quiz.data.find(
            (quiz) => quiz.id === Number(pathname.split("/").pop())
          )
          setQuizById(foundQuiz)
        }
      } catch (e) {
        console.log(e)
      }
    }

    fetchQuiz()
  }, [pathname, quiz])

  const handleAnswerSubmit = (answer) => {
    listOfAnswerIds.push({
      [answer.question_id.toString()]: answer.id.toString(),
    })

    setSelectedAnswer(answer)
    if (answer.correct_answer) {
      setIsCorrect(true)
    } else {
      setIsWrong(true)
    }
    setTimeout(() => {
      setIsCorrect(false)
      setIsWrong(false)
      setSelectedAnswer(null)
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }, 500)
  }

  const getResult = () => {
    axios
      .post(
        "http://localhost:3002/api/v1/quiz/user/answer/1",
        {
          questions_answers: [listOfAnswerIds],
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then(function (response) {
        console.log("response : ", response)
      })
      .catch(function (error) {
        console.log("error : ", error)
      })
  }

  if (quizById && quizById.questions && quizById.questions.length > 0)
    currentQuestion = quizById.questions[currentQuestionIndex]

  return (
    <div
      className={`h-screen bg-cover ${
        !isError ? "md:bg-normal bg-mobile" : "md:bg-error bg-error_mobile"
      }`}
    >
      <ParticlesComponent isError={isError} />
      <NavBar jwt={jwt} logout={logout} myProfile={myProfile} />
      <div className="flex justify-center mt-4 md:mt-8">
        {quizById && quizById.questions && quizById.questions.length > 0 ? (
          <Card className="bg-transparent mx-auto w-192 h-192" shadow={false}>
            <div className="flex justify-between mx-4 pt-2 md:my-4">
              <h1 className="text-white text-sm mb-16 text-center underline">
                {quizById.level_name}
              </h1>
              <h1 className="text-white text-sm mb-16 text-center italic">
                {quizById.title}
              </h1>
              <h1 className="text-xl text-white font-bold py-2 px-2 w-16">
                {currentQuestionIndex}/{quizById.questions.length}
              </h1>
            </div>
            {currentQuestion ? (
              <div className="rounded-xl mx-4 px-4">
                <h1 className="text-white text-xl md:text-3xl font-bold text-center h-40 md:h-48">
                  {currentQuestion.title}
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {currentQuestion.answers.map((answer) => (
                    <Button
                      key={answer.id}
                      onClick={() => handleAnswerSubmit(answer)}
                      className="mb-2 mx-auto bg-purplePrimary hover:scale-105 w-72"
                      fullWidth
                    >
                      {answer.answer}
                    </Button>
                  ))}
                </div>
                {(isCorrect && (
                  <PopupGame msg="CORRECT" color="bg-green-500" />
                )) ||
                  (isWrong && <PopupGame msg="WRONG" color="bg-red-500" />)}
              </div>
            ) : (
              <h1 className="text-white text-lg">
                Quiz terminé ! Merci pour votre participation. {getResult()}
              </h1>
            )}
          </Card>
        ) : (
          <DefaultDisplay />
        )}
      </div>
    </div>
  )
}

export default Quiz
