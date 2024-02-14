const db = require("./connection");
const { User } = require("../models");
const cleanDB = require("./cleanDb");

await cleanDB("User", "users");

await User.create({
  firstName: "Pamela",
  lastName: "Washington",
  email: "pamela@testmail.com",
  password: "password12345",
  orders: [
    {
      products: [products[0]._id, products[0]._id, products[1]._id],
    },
  ],
});

await User.create({
  firstName: "Elijah",
  lastName: "Holt",
  email: "eholt@testmail.com",
  password: "password12345",
});

console.log("users seeded");
