const z = require("zod");

const validateNewForm = (req, res, next) => {
  try {
    const { formName, flow } = req.body;
    const createdBy = req.user;

    //checking if all the required fields are present

    if (!formName) {
      return res.status(400).json({
        success: false,
        message: "Please give name for your form",
      });
    }

    if (flow.length < 1) {
      return res.status(400).json({
        success: false,
        message: "Please create flow for form",
      });
    }

    if (!createdBy) {
      return res.status(400).json({
        success: false,
        message: "Please sign in again to continue",
      });
    }

    //zod schema for flow validation
    const flowSchema = z.object({
      title: z.string().min(1, "Title is required for all the flows"),
      bubbleOrInput: z.enum(["bubble", "input"], {
        errorMap: () => ({
          message: "Type should be either bubble or input",
        }),
      }),
      content: z.object({
        type: z.string().min(1, "Content type is required "),
      }),
      order: z.number("Required order of flow"),
    });

    //validating flow using zod
    for (const item of flow) {
      const response = flowSchema.safeParse(item);
      if (!response.success) {
        return res.status(400).json({
          success: false,
          message: response.error.issues[0].message,
        });
      }
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

module.exports = validateNewForm;
