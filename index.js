// const express = require("express");
// const dotenv = require("dotenv");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");
// const connectDB = require("./database/db.js");
// const authRoutes = require("./routes/authRoute.js");
// const adminRoute = require("./routes/AdminRoute/AdminRoute.js");
// const videoRoutes = require("./routes/VideoRoutes.js");
// const userRoutes = require("./routes/userVideoRoute.js");
// const path = require("path");

// dotenv.config();

// connectDB();
// const app = express();

// const PORT = process.env.PORT || 3000;

// app.use(express.json());
// app.use(cookieParser());

// app.use(
//   cors({

//     origin: true,
//     credentials: true,
//   })
// );

// app.use(cors({
//   origin: [
//     "http://localhost:5173",
//     "https://bitzo-website.vercel.app" // agar frontend deploy hai
//   ],
//   credentials: true,
// }));


// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// // apis
// app.use("/api", authRoutes);
// app.use("/api/admin",adminRoute)
// app.use("/adminvideo", videoRoutes);
// app.use("/api/uservideo", userRoutes);







// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: "Route not found"
//   });
// });
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     success: false,
//     message: "Something went wrong!",
//     error: process.env.NODE_ENV === "development" ? err.message : undefined
//   });
// });
// app.listen(PORT, () => {
//   console.log(`🌐 Server listen at port ${PORT}`);
// });


// // server.js



// // const express = require("express");
// // const dotenv = require("dotenv");
// // const cookieParser = require("cookie-parser");
// // const cors = require("cors");
// // const { connect } = require("mongoose");
// // const mongoose = require("mongoose");
// // const authRoutes = require("./routes/authRoute.js");
// // const adminRoute = require("./routes/AdminRoute/AdminRoute.js");
// // const videoRoutes = require("./routes/VideoRoutes.js");
// // const userRoutes = require("./routes/userVideoRoute.js");
// // const path = require("path");

// // dotenv.config();


// // const MONGO = process.env.MONGO_URI || "mongodb://localhost:27017/ai_mern";


// // connect(MONGO)
// //   .then(()=> console.log("Mongo connected"))
// //   .catch(err => console.error("Mongo connection error:", err));
// // const app = express();
// // const PORT = process.env.PORT || 3000;

// // // Middlewares
// // app.use(express.json());
// // app.use(cookieParser());
// // app.use(cors({
// //   origin: [
// //     "http://localhost:5173",
// //     "https://bitzo-website.vercel.app"
// //   ],
// //   credentials: true,
// // }));

// // // Static files
// // app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // // Routes
// // app.use("/api", authRoutes);
// // app.use("/api/admin", adminRoute);
// // app.use("/adminvideo", videoRoutes);
// // app.use("/api/uservideo", userRoutes);

// // // 404 handler
// // app.use((req, res) => {
// //   res.status(404).json({
// //     success: false,
// //     message: "Route not found"
// //   });
// // });

// // // Error handler
// // app.use((err, req, res, next) => {
// //   console.error(err.stack);
// //   res.status(500).json({
// //     success: false,
// //     message: "Something went wrong!",
// //     error: process.env.NODE_ENV === "development" ? err.message : undefined
// //   });
// // });

// // // Start server
// // app.listen(PORT, () => {
// //   console.log(`🌐 Server listening at port ${PORT}`);
// // });



const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const connectDB = require("./database/db.js");
const authRoutes = require("./routes/authRoute.js");
const adminRoute = require("./routes/AdminRoute/AdminRoute.js");
const videoRoutes = require("./routes/VideoRoutes.js");
const userRoutes = require("./routes/userVideoRoute.js");

// Load env variables
dotenv.config();

// Connect MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 8000;

// ---------- Middlewares ----------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS (ONLY ONCE)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://bitzo-website.vercel.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ---------- Routes ----------
app.use("/api", authRoutes);
app.use("/api/admin", adminRoute);
app.use("/adminvideo", videoRoutes);
app.use("/api/uservideo", userRoutes);

// ---------- Health Check ----------
app.get("/", (req, res) => {
  res.send("🚀 Server is running successfully");
});

// ---------- 404 Handler ----------
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ---------- Error Handler ----------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// ---------- Server Listen ----------
app.listen(PORT, () => {
  console.log(`🌐 Server running on port ${PORT}`);
});
