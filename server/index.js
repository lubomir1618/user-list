const express = require("express");
const cors = require("cors");
const app = express();
const monk = require("monk");
const db = monk("localhost/learning");
const users = db.get("userslist");

app.use(cors());
app.use(express.json());

app.get("/users", (req, res) => {
  users.find().then(users => res.json(users));
});

app.post("/users", (req, res) => {
  if (isUserValid(req.body)) {
    const user = {
      name: req.body.name.toString(),
      surname: req.body.surname.toString(),
      created: new Date()
    };
    // save to db
    users.insert(user).then(createdUser => res.json(createdUser));
    console.log("user", user);
  } else {
    res.status(422);
    res.json({ message: "Name and surname must be fulfilled!" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

function isUserValid(user) {
  return (
    user.name &&
    user.name.toString() !== "" &&
    user.surname &&
    user.surname.toString() !== ""
  );
}
