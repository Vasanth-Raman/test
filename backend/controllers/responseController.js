const Response = require("../model/responseModel");
const { format } = require("date-fns");

//to createResponse

const createResponse = async (req, res, next) => {
  const { formId } = req.body;

  if (!formId) {
    return res
      .status(400)
      .json({ success: false, message: "Form ID is required" });
  }

  try {
    const formResponse = await Response.create({
      formId,
      responses: [],
      firstInteractionTime: format(new Date(), "MMM d, hh:mm a"),
    });

    res.status(201).json({ success: true, responseId: formResponse._id });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//to updateResponse

const updateResponse = async (req, res, next) => {
  const { responseId } = req.params;
  const { title, response } = req.body;

  try {
    const formResponse = await Response.findById(responseId);

    if (!formResponse) {
      return res
        .status(404)
        .json({ success: false, message: "Response not found" });
    }

    formResponse.responses.push({ title, response });
    await formResponse.save();

    res
      .status(200)
      .json({ success: true, message: "Response updated successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//to read responses

const readResponses = async (req, res, next) => {
  const { formId } = req.params;
  if (!formId) {
    return res
      .status(400)
      .json({ success: false, message: "Form ID is required" });
  }

  try {
    const responses = await Response.find({ formId }).lean();

    if (!responses) {
      return res.status(404).json({
        success: false,
        message: "No responses for this form",
      });
    }

    res.status(200).json({
      success: true,
      data: responses,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { createResponse, updateResponse, readResponses };
