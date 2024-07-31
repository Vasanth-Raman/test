const express = require("express");
const validateNewForm = require("../middleware/validateNewForm");
const validateFormId = require("../middleware/validateFormId");
const validateFormUpdate = require("../middleware/validateFormUpdate");
const verifyToken = require("../middleware/verifyToken");

const {
  getForms,
  createForm,
  updateForm,
  deleteForm,
  getForm,
  getFormBot,
} = require("../controllers/formController");
const formRouter = express.Router();

// reading forms according to dashboard or inside folder
formRouter.get("/dashboard", verifyToken, getForms);

// reading a single form
formRouter.get("/singleForm/:formId", verifyToken, getForm);

// reading form for Bot
formRouter.get("/formBot/:formId", getFormBot);

// creating new form
formRouter.post("/create", verifyToken, validateNewForm, createForm);

// updating an existing form
formRouter.put(
  "/update/:formId",
  verifyToken,
  validateFormId,
  validateFormUpdate,
  updateForm
);

//deleting a form
formRouter.delete("/delete/:formId", verifyToken, validateFormId, deleteForm);

module.exports = formRouter;
