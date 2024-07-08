import axios from "axios"
import deepmerge from "deepmerge"

export const makeClient = (options = {}) =>
  axios.create(
    deepmerge(
      {
        baseURL: "http://localhost:3002/api/v1",
      },
      options
    )
  )
