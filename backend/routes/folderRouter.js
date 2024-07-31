const express = require("express");
const folderRouter = express.Router();
const {
  getFolders,
  createFolder,
  deleteFolder,
} = require("../controllers/folderController");

//read all folders
folderRouter.get("/", getFolders);

//create a folder
folderRouter.post("/create", createFolder);

//delete folder
folderRouter.delete("/delete/:folderId", deleteFolder);

module.exports = folderRouter;
