import express from "express";
import {
  fetchHome,
  fetchTop,
  fetchLatest,
  fetchRandom,
  fetchWall,
  searchWalls,
  proxyImage
} from "../controllers/wallsController.js";

const router = express.Router();

router.get("/home", fetchHome);
router.get("/latest", fetchLatest);
router.get("/topwalls", fetchTop);
router.get("/random", fetchRandom);
router.get("/search", searchWalls);
router.get("/w/:id", fetchWall);

router.get('/proxy-image', proxyImage);

export default router;
