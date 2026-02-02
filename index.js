const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./database/db.js");
const authRoutes = require("./routes/authRoute.js");
const adminRoute = require("./routes/AdminRoute/AdminRoute.js");
const videoRoutes = require("./routes/VideoRoutes.js");
const userRoutes = require("./routes/userVideoRoute.js");
const path = require("path");

dotenv.config();

connectDB();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// apis
app.use("/api", authRoutes);
app.use("/api/admin",adminRoute)
app.use("/adminvideo", videoRoutes);
app.use("/api/uservideo", userRoutes);







app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});
app.listen(PORT, () => {
  console.log(`🌐 Server listen at port ${PORT}`);
});
