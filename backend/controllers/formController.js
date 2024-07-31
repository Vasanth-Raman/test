const mongoose = require("mongoose");
const Form = require("../model/formModel");
const Folder = require("../model/folderModel");

//get forms accord to dashboard or inside folder
const getForms = async (req, res, next) => {
  const createdBy = req.user;
  const { folderId } = req.query;
  try {
    let forms;
    if (!folderId) {
      forms = await Form.find({ createdBy: createdBy, folderId: null });
    } else {
      //checks if it is valid folderID
      if (!mongoose.Types.ObjectId.isValid(folderId)) {
        return res.status(400).json({
          success: false,
          message: "Folder not found",
        });
      }

      forms = await Form.find({
        createdBy: createdBy,
        folderId: folderId,
      });
    }

    if (!forms) {
      return res.status(404).json({
        success: false,
        message: "No forms avilable",
      });
    }

    res.status(200).json({
      success: true,
      data: forms,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//get single form
const getForm = async (req, res, next) => {
  const { formId } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(formId)) {
      return res.status(400).json({
        success: false,
        message: "Form Id is not valid",
      });
    }
    const form = await Form.findById(formId);

    if (!form) {
      return res.status(404).json({
        success: false,
        message: "No form avilable",
      });
    }

    res.status(200).json({
      success: true,
      data: form,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//get form for bot
const getFormBot = async (req, res, next) => {
  const { formId } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(formId)) {
      return res.status(400).json({
        success: false,
        message: "Form Id is not valid",
      });
    }
    const form = await Form.findById(formId);

    if (!form) {
      return res.status(404).json({
        success: false,
        message: "No form avilable",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        id: form._id,
        theme: form.theme,
        flow: form.flow,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//create new form
const createForm = async (req, res, next) => {
  const { formName, theme, flow, folderId } = req.body;
  const createdBy = req.user;
  try {
    const newForm = await Form.create({
      formName: formName,
      theme: theme,
      flow: flow,
      folderId: folderId,
      createdBy: createdBy,
    });

    //if folderId is present it will be pushed into forms array in Folder collection
    if (folderId) {
      await Folder.findByIdAndUpdate(
        folderId,
        { $push: { forms: newForm._id } },
        { new: true }
      );
    }

    res.status(201).json({
      success: true,
      message: "Form created successfully",
      data: newForm,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//update a form
const updateForm = async (req, res, next) => {
  const { formName, theme, flow } = req.body;
  const { formId } = req.params;
  try {
    const form = await Form.findById(formId);

    if (!form) {
      return res.status(404).json({
        success: false,
        message: "Form not found",
      });
    }

    const updatedForm = await Form.findByIdAndUpdate(
      formId,
      {
        formName: formName || form.formName,
        theme: theme || form.theme,
        flow: flow || form.flow,
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Form updated successfully",
      data: updatedForm,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//delete a form
const deleteForm = async (req, res, next) => {
  const { formId } = req.params;
  try {
    const deletedForm = await Form.findByIdAndDelete(formId);
    if (!deletedForm) {
      return res.status(404).json({
        success: false,
        message: "Form not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Form deleted successfully",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getForms,
  getForm,
  getFormBot,
  createForm,
  updateForm,
  deleteForm,
};
