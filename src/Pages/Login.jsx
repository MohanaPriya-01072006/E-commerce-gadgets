import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";

function Login() {
  const [formData, setFormData] = useState({
    Firstname: "",
    password: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Store Data in localStorage
  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("signupData", JSON.stringify(formData));

    alert("Data Stored Successfully!");

    console.log(formData);

    // Clear the form
    setFormData({
      Firstname: "",
      password: "",
    });
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={5}
        sx={{
          mt: 5,
          p: 4,
          borderRadius: 3,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Login Form
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            label="First Name"
            name="Firstname"
            value={formData.Firstname}
            onChange={handleChange}
            fullWidth
          />

        
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
          />
          <Button
            variant="contained"
            type="submit"
            size="large"
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;