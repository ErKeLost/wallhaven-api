import expesss from "express";
const router = expesss.Router();
import {
  loginUser,
  registerUser,
  logoutUser,
  likeUnlikeWall,
  fetchLikedWallpapers,
  updateUserProfile,
  getUserProfile,
  deleteUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
  .delete(protect, deleteUser);
router.post("/like/:userId/:id", likeUnlikeWall);
router.get("/liked/:userId", fetchLikedWallpapers);

export default router;
