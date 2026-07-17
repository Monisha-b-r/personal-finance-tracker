import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Paper, Typography, TextField, Button } from "@mui/material";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("users/register/", form);
      alert("Registration Successful");
      navigate("/");
    } catch (err) {
      alert("Registration Failed");
      console.log(err);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            margin="normal"
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            margin="normal"
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            name="password"
            margin="normal"
            onChange={handleChange}
          />

          <Button fullWidth variant="contained" sx={{ mt: 2 }} type="submit">
            Register
          </Button>
        </form>

        <Typography sx={{ mt: 2 }}>
          Already have an account? <Link to="/">Login</Link>
        </Typography>
      </Paper>
    </Container>
  );
}

export default Register;
