# HeavenWallsAPI

API For Fetching Wallpapers from WallHaven API (Solves CORS Problem)
This is an Express API that serves as a proxy for the Wallhaven API. It provides various endpoints to fetch wallpapers and relay the responses from the Wallhaven API to the specified client application.
Also has User Authentication with Feautures like Liking Walls.
Uses MongoDB to store data

## Features

- Proxies requests to the Wallhaven API to fetch wallpapers.
- Implements CORS headers to allow requests from the specified client application.
- Handles different endpoints for fetching wallpapers based on search queries, latest wallpapers, top wallpapers, random wallpapers, and individual wallpaper details.
- JWT Cookie Based Authentication
- Save to Liked Wallpapers

## Prerequisites

- Node.js - Make sure you have Node.js installed on your machine. You can download it from [https://nodejs.org](https://nodejs.org).

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/xtremeandroid/HeavenWallsAPI.git
```

2. Switch to API Directory:

```bash
cd HeavenWallsAPI
```

3. Install the dependencies:

```bash
npm install
```

4. Modify the Express API code in the index.js file as per your requirements. Update the value of the server variable to include your Wallhaven API URL. Make sure to replace https://heavenwalls.netlify.app in the CORS header with the URL of your React app or the client application you want to allow access to.

### Note

If you are using vercel to host this API make sure you copy the headers from vercel.json from this repo, it solves the CORS issue occuring due to vercel.

5. Start the server

```bash
node server.js
```

#### The API will be accessible at http://localhost:5000.
