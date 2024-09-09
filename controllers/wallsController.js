
import NodeCache from 'node-cache';
import rateLimit from 'express-rate-limit';
import axios from "axios";
const server = "https://wallhaven.cc/api/v1";

const fetchHome = async (req, res) => {
  const page = req.query.page;
  try {
    const apiUrl = `${server}/search?q=4k&page=${page}`; // Your Wallhaven API URL
    const response = await axios.get(apiUrl);

    // Extract the relevant data from the response
    const data = response.data; // Adjust this based on the structure of the Wallhaven API response

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const fetchLatest = async (req, res) => {
  const page = req.query.page;
  try {
    const apiUrl = `${server}/search?page=${page}`; // Your Wallhaven API URL
    const response = await axios.get(apiUrl);

    // Extract the relevant data from the response
    const data = response.data; // Adjust this based on the structure of the Wallhaven API response

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const fetchTop = async (req, res) => {
  const page = req.query.page;
  const toprange = req.query.toprange;
  try {
    const apiUrl = `${server}/search?sorting=toplist&topRange=${toprange}&page=${page}`; // Your Wallhaven API URL
    const response = await axios.get(apiUrl);

    // Extract the relevant data from the response
    const data = response.data; // Adjust this based on the structure of the Wallhaven API response

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const fetchRandom = async (req, res) => {
  const page = req.query.page;
  try {
    const apiUrl = `${server}/search?sorting=random&page=${page}`; // Your Wallhaven API URL
    const response = await axios.get(apiUrl);

    // Extract the relevant data from the response
    const data = response.data; // Adjust this based on the structure of the Wallhaven API response

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const searchWalls = async (req, res) => {
  const page = req.query.page;
  const searchTerm = req.query.search;
  try {
    const apiUrl = `${server}/search?q=${searchTerm}&page=${page}`; // Your Wallhaven API URL
    const response = await axios.get(apiUrl);

    // Extract the relevant data from the response
    const data = response.data; // Adjust this based on the structure of the Wallhaven API response

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const fetchWall = async (req, res) => {
  const id = req.params.id;
  try {
    const apiUrl = `${server}/w/${id}`; // Your Wallhaven API URL
    const response = await axios.get(apiUrl);

    // Extract the relevant data from the response
    const data = response.data; // Adjust this based on the structure of the Wallhaven API response

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

import NodeCache from 'node-cache';
import rateLimit from 'express-rate-limit';

// 创建缓存实例
const imageCache = new NodeCache({ stdTTL: 3600 }); // 缓存1小时

// 创建访问限制实例
export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 1000 
});

export const proxyImage = async (req, res) => {
  const imageUrl = req.query.url;
  
  // 检查缓存
  const cachedImage = imageCache.get(imageUrl);
  if (cachedImage) {
    res.setHeader('Content-Type', cachedImage.contentType);
    res.setHeader('X-Cache', 'HIT');
    return res.send(cachedImage.data);
  }

  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const contentType = response.headers['content-type'];
    
    imageCache.set(imageUrl, { data: response.data, contentType });

    res.setHeader('Content-Type', contentType);
    res.setHeader('X-Cache', 'MISS');
    res.send(response.data);
  } catch (error) {
    console.error("Error proxying image:", error);
    res.status(500).send("Error proxying image");
  }
};

export {
  proxyImage,
  fetchHome,
  fetchTop,
  fetchLatest,
  fetchRandom,
  fetchWall,
  searchWalls,
};
