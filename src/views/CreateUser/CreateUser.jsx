import React, { useEffect } from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import {
  addUserFormFieldNames,
  addUserFormInitialValues,
  validationSchema,
} from "../../schema";
import { useNavigate } from "react-router-dom";

export default function CreateUser({ isEditMode }) {
  const navigate = useNavigate();
  const params = useParams();
  const userId = params.userId;

  const {
    values,
    handleChange,
    errors,
    touched,
    handleSubmit,
    handleBlur,
    setValues,
  } = useFormik({
    initialValues: addUserFormInitialValues,
    onSubmit: async (values) => {
      const payload = {
        ...values,
      };
      const urlCreate = "http://localhost:8800/user/create";
      const urlEdit = `http://localhost:8800/user/edit/${userId}`;
      const options = {
        method: isEditMode ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      };

      if (isEditMode) {
        submitUserHandler(urlEdit, options);
      } else {
        submitUserHandler(urlCreate, options);
      }
    },
    validationSchema: validationSchema,
  });

  const submitUserHandler = async (url, options) => {
    await fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        navigate("/");
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  useEffect(() => {
    if (isEditMode && userId) {
      fetch(`http://localhost:8800/user/${userId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Network response was not ok " + response.statusText
            );
          }
          return response.json();
        })
        .then((data) => {
          setValues((prev) => ({
            ...prev,
            [addUserFormFieldNames.FIRST_NAME]: data?.firstName,
            [addUserFormFieldNames.LAST_NAME]: data?.lastName,
            [addUserFormFieldNames.EMAIL]: data?.email,
            [addUserFormFieldNames.CITY]: data?.city,
            [addUserFormFieldNames.STATE]: data?.state,
            [addUserFormFieldNames.GENDER]: data?.gender,
            [addUserFormFieldNames.MOB_NUM]: data?.mobileNumber,
          }));
        })
        .catch((error) => {
          console.error(
            "There has been a problem with your fetch operation:",
            error
          );
        });
    }
  }, [isEditMode, userId]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginTop: "25px",
        padding: "20px 60px",
      }}
    >
      <Grid container spacing={3}>
        <Grid item md={6}>
          <CustomInput
            label={"First Name"}
            required
            name={addUserFormFieldNames.FIRST_NAME}
            error={
              touched[addUserFormFieldNames.FIRST_NAME] &&
              errors[addUserFormFieldNames.FIRST_NAME]
            }
            value={values[addUserFormFieldNames.FIRST_NAME]}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item md={6}>
          <CustomInput
            label={"Last Name"}
            name={addUserFormFieldNames.LAST_NAME}
            error={
              touched[addUserFormFieldNames.LAST_NAME] &&
              errors[addUserFormFieldNames.LAST_NAME]
            }
            value={values[addUserFormFieldNames.LAST_NAME]}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item md={6}>
          <CustomInput
            label={"Email"}
            required
            name={addUserFormFieldNames.EMAIL}
            error={
              touched[addUserFormFieldNames.EMAIL] &&
              errors[addUserFormFieldNames.EMAIL]
            }
            value={values[addUserFormFieldNames.EMAIL]}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item md={6}>
          <CustomInput
            label={"Phone Number"}
            required
            name={addUserFormFieldNames.MOB_NUM}
            error={
              touched[addUserFormFieldNames.MOB_NUM] &&
              errors[addUserFormFieldNames.MOB_NUM]
            }
            value={values[addUserFormFieldNames.MOB_NUM]}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item md={6}>
          <CustomInput
            label={"Gender"}
            required
            name={addUserFormFieldNames.GENDER}
            error={
              touched[addUserFormFieldNames.GENDER] &&
              errors[addUserFormFieldNames.GENDER]
            }
            value={values[addUserFormFieldNames.GENDER]}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item md={6}>
          <CustomInput
            label={"City"}
            required
            name={addUserFormFieldNames.CITY}
            error={
              touched[addUserFormFieldNames.CITY] &&
              errors[addUserFormFieldNames.CITY]
            }
            value={values[addUserFormFieldNames.CITY]}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item md={6}>
          <CustomInput
            label={"State"}
            required
            name={addUserFormFieldNames.STATE}
            error={
              touched[addUserFormFieldNames.STATE] &&
              errors[addUserFormFieldNames.STATE]
            }
            value={values[addUserFormFieldNames.STATE]}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
      </Grid>

      <Button variant="contained" onClick={handleSubmit}>
        {isEditMode ? "Save" : "Create"}
      </Button>
    </div>
  );
}
