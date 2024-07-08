import { useContext, useEffect, useState } from "react"
import { AppContext } from "./AppContext"
import { makeClient } from "../services/makeClient"

const UseApi = (defaultValue, method, ...args) => {
  const [result, setResult] = useState(defaultValue)
  const { jwt } = useContext(AppContext)
  const deps = JSON.stringify(args)

  useEffect(() => {
    ;(async () => {
      const { data } = await makeClient({
        headers: { access_token: jwt },
      })[method](...args)
      setResult(data)
    })()
  }, [jwt, deps, method])

  return result
}

export default UseApi
