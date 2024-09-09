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

const proxyImage = async (req, res) => {
  const imageUrl = req.query.url;
  console.log(imageUrl);
  
  try {
    const response = await axios.get(imageUrl, { responseType: "stream" });
    response.headers["content-type"] &&
      res.setHeader("content-type", response.headers["content-type"]);
    response.data.pipe(res);
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
