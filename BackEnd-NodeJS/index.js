const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("./schema");
const bodyParser = require("body-parser");
const cors = require("cors");

mongoose.connect("mongodb://35.207.242.133:27017/test", { useNewUrlParser: true });

const express = require("express");
const app = express();
const port = 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// const user = { id: 123 };

// const token = jwt.sign(user, "secret-key", { expiresIn: "1h" });

app.post("/register", async (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });
  try {
    await user.save();
    console.log("user saved successfully");
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // console.log(req.body.email);
    if (!user) {
      console.log(user);
      res.status(401).send("Invalid username");
    }
    console.log(user);
    const token = jwt.sign({ userId: user._id }, "secret-key", { expiresIn: "1h" });
    res.status(200).send(token);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.post("/verifyToken", async (req, res) => {
  try {
    const decoded = jwt.verify(req.body.token, "secret-key");
    console.log(decoded);
    res.status(200).send(decoded)
  } catch (err) {
    console.log(err);
    res.status(403).send(err)
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
