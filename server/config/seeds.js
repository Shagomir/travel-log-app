const db = require("./connection");
const { User } = require("../models");
const cleanDB = require("./cleanDb");

await cleanDB("User", "users");

await User.create({
  username: "Pamela",
  email: "pamela@testmail.com",
  password: "password12345",
});

await User.create({
  username: "Elijah",
  email: "eholt@testmail.com",
  password: "password12345",
});

console.log("users seeded");
