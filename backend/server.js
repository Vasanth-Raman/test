const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDb = require("./config/dbConnect");
const verifyToken = require("./middleware/verifyToken");
const userRouter = require("./routes/userRouter");
const folderRouter = require("./routes/folderRouter");
const formRouter = require("./routes/formRouter");
const responseRouter = require("./routes/responseRouter");
const errorHandler = require("./middleware/errorHandler");
const path = require("path");

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

//routes
app.use("/api/v1/user", userRouter);

app.use("/api/v1/folder", verifyToken, folderRouter);

app.use("/api/v1/form", formRouter);

app.use("/api/v1/response", responseRouter);

//invalid path catcher
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
  });
});

//global error catcher
app.use(errorHandler);

app.listen(PORT, async () => {
  try {
    await connectDb();
    console.log(`Server is running on ${PORT}`);
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
});
