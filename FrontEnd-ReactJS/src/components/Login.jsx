import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 150px;
`;

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email.");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      setPasswordError("Password must be 8 characters long.");
    } else {
      setPasswordError("");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "email") {
      validateEmail(e.target.value);
    } else if (e.target.name === "password") {
      validatePassword(e.target.value);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickSignIn = async () => {
    try {
      const token = await axios.post("http://localhost:5000/login", { email: formData.email });
      console.log(token.data);
      localStorage.setItem("token", token.data);
    } catch (err) {
      console.log(err);
    }
  };

  const useAuth = () => {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
      const verifyToken = async () => {
        try {
          const token = localStorage.getItem("token");
          if (token) {
            await axios.post("http://localhost:5000/verifyToken", { token: token });
            console.log("token verified");
            setAuthenticated(true);
          }
        } catch (err) {
          console.log(err);
          localStorage.removeItem("token");
        }
      };

      verifyToken();
    }, []);

    return authenticated;
  };

  const authenticate = useAuth();

  return (
    <div>
      <Container>
        <AccountCircleIcon variant="outlined" style={{ fontSize: 220 }} />
        <h1 style={{ fontSize: "40px" }}>Welcome!</h1>
        <p style={{ textAlign: "center", fontSize: "20px" }}>
          Let's connect to your workspace.<br></br>please enter your email to continue
        </p>
        <TextField
          label="Email Address"
          variant="outlined"
          color="primary"
          type="email"
          name="email"
          error={!!emailError}
          value={formData.email}
          onChange={handleChange}
          style={{ width: "500px", height: "20px" }}
        />
        <TextField
          label="Password"
          variant="outlined"
          color="primary"
          type={showPassword ? "text" : "password"}
          name="password"
          error={!!passwordError}
          value={formData.password}
          onChange={handleChange}
          style={{ marginTop: "10px", width: "500px", height: "5px", margin: "45px" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Typography variant="body3" color="primary" style={{ marginLeft: "320px", marginTop: "20px", fontSize: "20px" }}>
          Forgot Password?
        </Typography>
        <Button
          variant="contained"
          color="primary"
          style={{ width: "500px", height: "53px", margin: "20px", textTransform: "none", fontWeight: "bold", fontSize: "20px" }}
          onClick={handleClickSignIn}
        >
          Sign In
        </Button>
        {/* <Button variant="contained" color="primary" style={{ width: "450px", height: "40px", margin: "45px" }} onClick={handleClick}>
          Sign up
        </Button> */}
      </Container>
      {authenticate ? navigate("/loggedIn") : navigate("/")}
    </div>
  );
};

export default Login;
