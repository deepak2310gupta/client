import * as Yup from "yup";
import {
  EMAIL_REGEX,
  GENDER_ENUM,
  MOBILE_NUM_REGEX,
  WHITE_SPACES_REGEX,
} from "../constants/constants";

export const addUserFormFieldNames = {
  FIRST_NAME: "firstName",
  LAST_NAME: "lastName",
  EMAIL: "email",
  MOB_NUM: "mobileNumber",
  CITY: "city",
  STATE: "state",
  GENDER: "gender",
};

export const addUserFormInitialValues = {
  [addUserFormFieldNames.FIRST_NAME]: "",
  [addUserFormFieldNames.LAST_NAME]: "",
  [addUserFormFieldNames.EMAIL]: "",
  [addUserFormFieldNames.MOB_NUM]: "",
  [addUserFormFieldNames.CITY]: "",
  [addUserFormFieldNames.STATE]: "",
  [addUserFormFieldNames.GENDER]: "",
};

export const validationSchema = () => {
  return Yup.object().shape({
    [addUserFormFieldNames.FIRST_NAME]: Yup.string()
      .required("First Name is required")
      .max(200, "First Name cannot be more than 200 characters"),

    [addUserFormFieldNames.LAST_NAME]: Yup.string().max(
      200,
      "Last Name cannot be more than 200 characters"
    ),

    [addUserFormFieldNames.EMAIL]: Yup.string()
      .email("Email Id is invalid")
      .required("Email Id is required")
      .matches(EMAIL_REGEX, "Email Id is invalid")
      .matches(WHITE_SPACES_REGEX, "Email Id cannot contain white spaces"),

    [addUserFormFieldNames.MOB_NUM]: Yup.string()
      .required("Mobile Number is required")
      .matches(MOBILE_NUM_REGEX, "Mobile Number is invalid"),

    [addUserFormFieldNames.CITY]: Yup.string()
      .required("City is required")
      .max(200, "City cannot be more than 200 characters"),

    [addUserFormFieldNames.STATE]: Yup.string()
      .required("State is required")
      .max(200, "State cannot be more than 200 characters"),

    [addUserFormFieldNames.GENDER]: Yup.string()
      .required("Gender is required")
      .oneOf(GENDER_ENUM, "Invalid gender"),
  });
};
