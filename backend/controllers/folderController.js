const mongoose = require("mongoose");
const Folder = require("../model/folderModel");
const Form = require("../model/formModel");

//reading folders
const getFolders = async (req, res, next) => {
  const createdBy = req.user;
  try {
    const folders = await Folder.find({ createdBy }).lean();
    res.status(200).json({
      success: true,
      data: folders,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//to create folder
const createFolder = async (req, res, next) => {
  const { folderName } = req.body;
  const createdBy = req.user;
  try {
    const createFolder = await Folder.create({
      folderName: folderName,
      createdBy: createdBy,
    });

    res.status(201).json({
      success: true,
      message: "Folder created successfully",
      data: createFolder,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//to delete folder and all the forms inside it
const deleteFolder = async (req, res, next) => {
  const folderId = req.params.folderId;

  try {
    //check whether ID is valid
    if (!mongoose.Types.ObjectId.isValid(folderId)) {
      return res.status(400).json({
        success: false,
        message: "Folder id is not valid",
      });
    }

    const folder = await Folder.findById(folderId).lean();
    if (!folder) {
      return res.status(400).json({
        success: false,
        message: "Folder not found",
      });
    }

    //deletes forms associated with the folder
    await Form.deleteMany({ folderId: folderId });

    await Folder.findByIdAndDelete(folderId);

    res.status(200).json({
      success: true,
      message: "Folder and the forms inside it deleted successfully",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  createFolder,
  deleteFolder,
  getFolders,
};
