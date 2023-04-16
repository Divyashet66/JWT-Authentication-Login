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
  margin-top: 50px;
`;

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(token);
        if (token) {
          const isValidate = await axios.post("http://localhost:5000/verifyToken", { token: token });
          console.log(isValidate.request.status);
          isValidate.request.status == 200 ? navigate("/loggedIn") : navigate("/");

          console.log("token verified - 1", isValidate.data);
          // setAuthenticated(true);
        }
      } catch (err) {
        console.log(err);
        navigate("/");
        localStorage.removeItem("token");
      }
    };

    verifyToken();
    // if (authenticated) {
    // } else {
    //   navigate("/");
    // }
    //[authenticated, navigate]
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [test, setTest] = useState(false);
  const [eerror, setEError] = useState(false);
  const [perror, setPError] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email.");
      setEError(true);
      console.log("hello");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      setPasswordError("Password must be 8 characters long.");
      setPError(true);
    } else {
      setPasswordError("");
    }
  };

  const handleChange = (e) => {
    console.log(e);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log("what happened?");
    if (e.target.name === "email") {
      console.log("whatup?");
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
      console.log(token.status);
      localStorage.setItem("token", token.data);
      navigate("/loggedIn");
      if (token.status == 401) {
        setTest(true);
      }
    } catch (err) {
      console.log(err.response.status);
      if (err.response.status == 401) {
        setTest(true);
      }
    }
  };

  const handleClickSignUp = async () => {
    console.log(formData);
    try {
      await axios.post("http://localhost:5000/register", formData);
      console.log("check if user saved");
    } catch (err) {
      console.log(err);
    }
  };

  // const useAuth = () => {

  // return authenticated;
  // };

  // const authenticate = useAuth();

  return (
    <div>
      <Container>
        {/* <Button variant="contained" color="primary" style={{ width: "450px", height: "40px", margin: "45px" }} onClick={handleClickSignUp}>
          Sign up
        </Button> */}
        <p style={{ textDecoration: "underline", marginLeft: "1000px" }} onClick={handleClickSignUp}>
          Sign up
        </p>
        <AccountCircleIcon variant="outlined" color="primary" style={{ fontSize: 220 }} />
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
          value={formData.email}
          onChange={handleChange}
          error={emailError}
          helperText={emailError ? "Please enter a valid email." : ""}
          style={{ width: "500px", height: "20px" }}
        />
        {/* {eerror ? <p>{emailError}</p> : <p></p>} */}
        <TextField
          label="Password"
          variant="outlined"
          color="primary"
          type={showPassword ? "text" : "password"}
          name="password"
          error={passwordError}
          helperText={passwordError ? "Password must be 8 characters long." : ""}
          value={formData.password}
          onChange={handleChange}
          style={{ marginTop: "10px", width: "500px", height: "5px", margin: "65px" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton>
              </InputAdornment>
            ),
          }}
        />
        {/* {perror ? <p>{passwordError}</p> : <p></p>} */}
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
        {test ? <p style={{ color: "red" }}>User is not authorized</p> : <p></p>}
      </Container>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      {/* {authenticated ? navigate("/loggedIn") : navigate("/")} */}
      <Typography variant="body3" color="primary" style={{ marginLeft: "40px", fontSize: "20px" }}>
        Powered by Zaperon
      </Typography>
      <Typography variant="body3" color="primary" style={{ marginLeft: "1200px", fontSize: "20px" }}>
        Need Help?
      </Typography>
      <Typography variant="body3" color="primary" style={{ marginLeft: "20px", fontSize: "20px" }}>
        Privacy Policy & Terms
      </Typography>
    </div>
  );
};

export default Login;
