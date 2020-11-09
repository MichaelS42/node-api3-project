const express = require("express");

const router = express.Router();
const Users = require("./userDb.js");
const Posts = require("../posts/postDb.js")

router.post("/", validateUser, (req, res) => {
  // do your magic!
  res.json({".post response": ""})
});

router.post("/:id/posts", validatePost, (req, res) => {
  // do your magic!
  res.json({".post response": "" })
});

router.get("/", (req, res) => {
  // do your magic!
  res.json({".get ": "/"})
});

router.get("/:id", validateUserId, (req, res) => {
  // do your magic!
  res.json({ ".get response": "" });
});

router.get("/:id/posts", (req, res) => {
  // do your magic!
  res.json({".get response": "id/posts"})
});

router.delete("/:id", (req, res) => {
  // do your magic!
  res.json({".delete response": ""})
});

router.put("/:id", validateUserId, (req, res) => {
  // do your magic!
});

//custom middleware

async function validateUserId(req, res, next) {
  // do your magic!
  const user = await Users.getById(req.params.id);
  console.log(user);
  if (!user) {
    next({ status: 404, message: "user doesnt exist" });
    return;
  }
  next();
}

function validateUser(req, res, next) {
  // do your magic!
  console.log(req.body)
  if(!Object.keys(req.body).length) {
    next({ status: 400, message: "missing user data"});
    return
  }
  if(!req.body.name) {
    next({ status: 400, message: "missing required name field"});
    return
  }
  next();
}

function validatePost(req, res, next) {
  // do your magic!
  console.log(req.body)
  if (!Object.keys(req.body).length) {
    next({ status: 400, message: "missing post data"});
    return
  } 
  if (!req.body.text) {
    next({ status: 400, message: "missing required text field"});
    return
  }
  next();
}

module.exports = router;
