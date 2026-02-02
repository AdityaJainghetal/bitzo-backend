const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/isAuthenticated");
const { registerUser, loginUser } = require("../controller/authController");
const User = require("../models/usermodel");
router.post("/register", registerUser);
router.post("/login", loginUser);
// router.get("/profile", isAuthenticated);
// router.get("/profile", authMiddleware, (req, res) => {
//   res.json({
//     success: true,
//     user: req.user
//   });
// });


router.get("/profile", authMiddleware, async (req, res) => {
  try {
    // req.user JWT middleware se aata hai
    const userId = req.user._id || req.user.userId || req.user.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID not found in token",
      });
    }

    const user = await User.findById(userId)
      .select(
        "username email fullName profilePicture bio rewardPoints createdAt lastLogin"
      )
      .lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        ...user,
        joinedAt: user.createdAt
          ? new Date(user.createdAt).toLocaleDateString()
          : null,
      },
    });
  } catch (error) {
    console.error("Error in getProfile:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching profile",
    });
  }
});


module.exports = router;
