const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./queries.js");

const app = express();

app.use(express.static(path.join(__dirname, "..", "build")));
console.log(path.join(__dirname, "..", "build"));
app.use(express.static("public"));

console.log(express.static("public"));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.json({ message: "welcome to the server" });
});

app.get("/users", db.getUsers);
app.get("/users/:id", db.getUserById);
app.post("/users", db.createUser);
app.put("/users/:id", db.updateUser);
app.delete("/users/:id", db.deleteUser);
app.delete("/users", db.deleteAllNull);

let PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`connected to PORT ${PORT}`);
});
