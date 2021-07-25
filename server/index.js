require("dotenv").config;

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
const app = express();
const db = require("./db");

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes

// create todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await db.query(
      "INSERT INTO todo ( description) VALUES($1);",
      [description]
    );
  } catch (error) {
    console.log(error.message);
  }
});

// get all todo's

// get single todo

// update todo

// delete todo

app.listen(PORT, () => console.log(`Server listening on PORT: ${PORT}`));
