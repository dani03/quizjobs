import axios from "axios"
import { createContext, useCallback, useEffect, useState } from "react"
import { fakeLevels } from "../data/fakeData"
import { fakeQuestion } from "../data/fakeData"
import { fakeTheme } from "../data/fakeData"

export const AppContext = createContext(null)

const AppContextProvider = (props) => {
  const [jwt, setJwt] = useState(null)
  const [isError, setIsError] = useState(false)
  const [userData, setUserData] = useState(null)
  useEffect(() => setJwt(localStorage.getItem("access_token")), [])

  const saveJwt = useCallback((jwt) => {
    localStorage.setItem("access_token", jwt)
    setJwt(jwt)
    if (jwt) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:3002/api/v1/profil",
            {
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }
          )
          setMyProfile(response.data.data)
        } catch (error) {
          console.error("Error fetching myProfile:", error)
        }
      }
      fetchUserData()
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem("access_token")
    setJwt(null)
    setUserData(null)
  }, [])

  const changeIsError = () => {
    setIsError(!isError)
  }

  useEffect(() => {
    const updateContext = () => {
      setJwt(localStorage.getItem("access_token"))
    }
    window.addEventListener("storage", updateContext)
    return () => window.removeEventListener("storage", updateContext)
  }, [])

  const [levels, setLevels] = useState([])
  useEffect(() => {
    const fetchLevels = async () => {
      if (!jwt) return
      try {
        const response = await axios.get(
          "http://localhost:3002/api/v1/levels",
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        )
        setLevels(response.data)
      } catch (error) {
        console.error("Error fetching levels:", error)
        setLevels(fakeLevels)
      }
    }

    fetchLevels()
  }, [jwt])

  const [domains, setDomains] = useState([])
  useEffect(() => {
    const fetchLevels = async () => {
      if (!jwt) return
      try {
        const response = await axios.get(
          "http://localhost:3002/api/v1/domains",
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        )
        setDomains(response.data)
      } catch (error) {
        console.error("Error fetching domains:", error)
        setDomains(fakeTheme)
      }
    }

    fetchLevels()
  }, [jwt])

  const [questions, setQuestions] = useState([])
  useEffect(() => {
    const fetchLevels = async () => {
      if (!jwt) return
      try {
        const response = await axios.get(
          "http://localhost:3002/api/v1/questions",
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        )
        setQuestions(response.data)
      } catch (error) {
        console.error("Error fetching domains:", error)
        setQuestions(fakeQuestion)
      }
    }

    fetchLevels()
  }, [jwt])

  const [quiz, setQuiz] = useState([])
  useEffect(() => {
    const fetchLevels = async () => {
      if (!jwt) return
      try {
        const response = await axios.get(
          "http://localhost:3002/api/v1/quizzes",
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        )
        setQuiz(response.data)
      } catch (error) {
        console.error("Error fetching domains:", error)
      }
    }

    fetchLevels()
  }, [jwt])

  const [myProfile, setMyProfile] = useState([])
  useEffect(() => {
    const fetchLevels = async () => {
      if (!jwt) return
      try {
        const response = await axios.get(
          "http://localhost:3002/api/v1/profil",
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        )
        setMyProfile(response.data.data)
      } catch (error) {
        console.error("Error fetching myProfile:", error)
      }
    }

    fetchLevels()
  }, [jwt])

  return (
    <AppContext.Provider
      {...props}
      value={{
        saveJwt,
        logout,
        jwt,
        isError,
        changeIsError,
        levels,
        domains,
        questions,
        quiz,
        myProfile,
      }}
    />
  )
}

export default AppContextProvider
