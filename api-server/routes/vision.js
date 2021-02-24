var express = require("express");
const visionController = require("../controllers/visionController");

var router = express.Router();

router.get("/test", async (req, res, next) =>{
	console.log('recieved test api call');
	visionController.test();
});

module.exports = router;