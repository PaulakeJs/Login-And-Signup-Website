const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("./models/userSchema");

const app = express();

const dbURI =
  "mongodb+srv://paulake:paulake@cluster0.awiyawq.mongodb.net/PayLane?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to mongo db");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(express.json());
app.use(cors());

//Routes

// User Registration

app.post("/register", async (req, res) => {
  try{
    const { email, username, password } = req.body;
    const emailUsed = await User.findOne({ email });
    if (emailUsed) {
     res.status(401).json({ message: "This Email Has Been Used " });
    } else {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const newUser = new User({
        email,
        username,
        password: hashedPassword,
      });
      await newUser.save();
     return res.status(201).json({ message: "user created successfully" });
    }
  }catch(error){
    res.status(500).json(error)
  }
});

// GET request register users
// app.get("/register", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(201).json(users);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });
//Get Login


const JWTS = "secret"
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: " invalid credentials " });
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, JWTS, {
      expiresIn: "1hr",
    });
    res.json({ message: "Login SuccessFull" });
  } catch (error) {
    res.status(500).json({ error: "Login Failed" });
  }
});

app.listen(3001, () => {
  console.log("port is running on port 3001");
});
