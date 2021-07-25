require("dotenv").config;

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
const app = express();
const db = require("../model/db");

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes

// create todo

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await db.query(
      "INSERT INTO todo ( description) VALUES($1) RETURNING *;",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// get all todo's

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await db.query("SELECT * FROM todo;");
    res.json(allTodos.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// get single todo

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await db.query("SELECT * FROM todo WHERE id = $1", [id]);
    res.json(todo.rows);
  } catch (error) {
    console.log(error);
  }
});

// update todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await db.query(
      "UPDATE todo SET description = $1 WHERE id = $2 RETURNING *",
      [description, id]
    );
    res.json(updateTodo.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// delete todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await db.query("DELETE FROM todo WHERE id = $1", [id]);
    res.json(deletedTodo);
  } catch (error) {
    console.log(error.message);
  }
});
app.listen(PORT, () => console.log(`Server listening on PORT: ${PORT}`));
