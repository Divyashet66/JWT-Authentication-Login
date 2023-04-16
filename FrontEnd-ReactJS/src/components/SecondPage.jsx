import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SecondPage = () => {
  const navigate = useNavigate();

  // const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
      const verifyToken = async () => {
        try {
          const token = localStorage.getItem("token");
          console.log(token, "2nd page");
          if (token) {
            await axios.post("http://localhost:5000/verifyToken", { token: token });
            console.log("token verified - 2nd page");
            // setAuthenticated(true);
          } else {
            navigate("/");
          }
        } catch (err) {
          console.log(err);
          localStorage.removeItem("token");
          navigate("/");

        }
      };

      verifyToken();
      console.log("2nd")
      // if (authenticated) {
      // } else {
      //   navigate("/");
      // }
    }, []);
  return (
    <div>
      <h1 style={{textAlign:"center",marginTop:"400px"}}>Welcome!</h1>
      <p style={{ textAlign: "center" }}>
        Let's connect to your workspace.<br></br>please enter your email to continue
      </p>
    </div>
  );
};

export default SecondPage;
