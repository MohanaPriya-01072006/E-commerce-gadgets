import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";

function Enquiry() {
  const [formData, setFormData] = useState({
    companyname: "",
    companyperson: "",
    phonenumber: "",
    products: "",
    quantity: "",
    AdditionalMessage: "",
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
            label="Company Name"
            name="companyname"
            value={formData.companyname}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Company Person"
            name="companyperson"
            value={formData.companyperson}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Phone Number"
            name="phonenumber"
            value={formData.phonenumber}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Products"
            name="products"
            value={formData.products}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Additional Message"
            name="AdditionalMessage"
            value={formData.AdditionalMessage}
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

export default Enquiry;