const express = require("express");
const responseRouter = express.Router();
const {
  createResponse,
  updateResponse,
  readResponses,
} = require("../controllers/responseController");

//to create response
responseRouter.post("/create", createResponse);

//to update response
responseRouter.put("/update/:responseId", updateResponse);

//to read responses
responseRouter.get("/:formId", readResponses);

module.exports = responseRouter;
