import { validationMessages } from "../constants/validationMessages";
const yup = require("yup");

const signupSchema = yup.object({
  body: yup.object({
      firstName: yup
      .string()
      .required(validationMessages.required("firstName")),
      lastName: yup
      .string()
      .required(validationMessages.required("lastName")),
      city: yup
      .string()
      .required(validationMessages.required("city")),
      street: yup
      .string()
      .required(validationMessages.required("street")),
      zipcode: yup
      .string()
      .required(validationMessages.required("zipcode")),
      email: yup
      .string()
      .email(validationMessages.email)
      .required(validationMessages.required("email")),
    password: yup
      .string()
      .min(6, validationMessages.password.min)
      .max(255, validationMessages.password.max)
      .required(validationMessages.required("password")),
    // clan:yup
    //   .string()
    //   .required(validationMessages.required("ClanName")),  
  })
});

export default signupSchema;    