import User from "../models/userModel.js ";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "../middleware/asyncHandler.js";

// @desc Login user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc Register user
// @route POST /api/users/register
// @access PUBLIC

// @desc Register user
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Logout user
// @route POST /api/users/logout
// @access Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    message: "Logged out successfully",
  });
});

// @desc Get user profile
// @route POST /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Delete user
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Cannot Delete Admin User");
    }
    await User.deleteOne({ _id: user._id });
    res.status(200).json({ message: "User deleted successfully" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const likeUnlikeWall = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.userId;
    const wallpaperId = req.params.id;

    // Check if the user exists
    const user = await User.findById(userId);

    // Find the index of the liked wallpaper in the 'likedWallpapers' array
    const wallpaperIndex = user.likedWallpapers.findIndex(
      (wallpaper) => wallpaper.wallid === wallpaperId
    );

    if (wallpaperIndex !== -1) {
      // If the user has already liked the wallpaper, remove the like
      user.likedWallpapers.splice(wallpaperIndex, 1);
      await user.save();
      return res.json({ message: "Wallpaper removed from liked wallpapers" });
    } else {
      // If the user has not liked the wallpaper, add the like
      user.likedWallpapers.push({
        wallid: wallpaperId,
        url: `https://wallhaven.cc/w/${wallpaperId}`,
        thumbnail: `https://th.wallhaven.cc/lg/${wallpaperId.substring(
          0,
          2
        )}/${wallpaperId}.jpg`,
      });
      await user.save();
      return res.json({ message: "Wallpaper liked successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500);
    throw new Error("Internal server error");
  }
});

const fetchLikedWallpapers = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get the liked wallpapers from the user object
    const likedWallpapers = user.likedWallpapers;

    res.json({ likedWallpapers });
  } catch (error) {
    console.error(error);
    res.status(500);
    throw new Error("Internal server error");
  }
});

export {
  loginUser,
  registerUser,
  logoutUser,
  likeUnlikeWall,
  fetchLikedWallpapers,
  updateUserProfile,
  getUserProfile,
  deleteUser,
};
