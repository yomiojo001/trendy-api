const express = require('express');
const { signup, signin, signout } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const {userSignUpValidator} = require("../validator");


const router = express.Router();

router.post("/signup", userSignUpValidator(), signup);
router.post("/signin", signin);
router.get("/signout", signout);

// any routes containing :userId , our app will first excecute userbyid()
router.param("userId", userById);

module.exports = router;