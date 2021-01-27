const express = require("express");
const router = express.Router();

const user = require("../user");

router.get("/fetch", user.getUsers);
router.get("/fetch/:id", user.getUser);

router.post("/create", user.createUser)

module.exports = router;