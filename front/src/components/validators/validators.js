import * as yup from "yup"

export const pseudoValidator = yup
  .string()
  .min(3)
  .max(20)
  .matches(/^[a-zA-Z0-9 ]+$/, "special characters are not allowed")
  .label("username")

export const emailValidator = yup.string().min(3).max(50).email().label("email")

export const passwordValidator = yup.string().min(3).max(50).label("Password")

export const titleValidator = yup.string().min(3).max(50).label("title")

export const contentValidator = yup.string().min(3).max(1000).label("content")

export const postalCodeValidator = yup.number().label("Postal Code")

export const categoryValidator = yup.string().min(3).max(20).label("category")

export const sexeValidator = yup.string().min(1).max(2).label("sexe")

export const descriptionValidator = yup
  .string()
  .min(3)
  .max(200)
  .label("description")

export const priceValidator = yup.number().label("price")

export const quantityValidator = yup.number().label("quantity")

export const rateValidator = yup.number().label("rate")
