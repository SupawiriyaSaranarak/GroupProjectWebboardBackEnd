const express = require("express");
const router = express.Router();
const topicController = require("../controllers/topicController");

router.get("/", topicController.getAllTopicsActive);
router.get("/by-id/:id", topicController.getTopicByIdActive);
router.get("/latest-topic", topicController.getLastedTopicsActive);
router.get("/hot-topic");
router.get("/room/:roomId");
router.get("/user/:userId");
router.post("/");
router.patch("/:id");
router.patch("/inactive/:id");

module.exports = router;
