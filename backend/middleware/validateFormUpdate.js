const validateFormUpdate = (req, res, next) => {
  const { formName, theme, flow } = req.body;
  try {
    if (formName !== undefined && formName.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Form name should not be empty",
      });
    }
    if (
      theme !== undefined &&
      (theme.trim() === "" ||
        !["#FFFFFF", "#171923", "#508C9B"].includes(theme))
    ) {
      return res.status(400).json({
        success: false,
        message: "Not a valid theme",
      });
    }

    if (flow !== undefined && (!Array.isArray(flow) || flow.lenght === 0)) {
      return res.status(400).json({
        success: false,
        message: "Flow should not be empty",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = validateFormUpdate;
