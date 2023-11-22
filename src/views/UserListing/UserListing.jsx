import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import UserTable from "../UserTable/UserTable";

export default function UserListing() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const createUserHandler = () => {
    navigate("/create-user");
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const url = "http://localhost:8800/user/all-users/1";
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      }
    }

    fetchData();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        marginTop: "10px",
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Grid item md={8}>
          <Typography variant="h5" gutterBottom>
            User Listing
          </Typography>
        </Grid>
        <Grid item md={4}>
          <Button variant="contained" onClick={createUserHandler}>
            Create User
          </Button>
        </Grid>
      </Grid>

      {userData?.length > 0 && (
        <Grid
          container
          spacing={2}
          sx={{ marginTop: "25px", padding: "20px 60px" }}
        >
          <UserTable userData={userData} setUserData={setUserData} />
        </Grid>
      )}
    </Box>
  );
}
