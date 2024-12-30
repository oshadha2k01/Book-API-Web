const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const GOOGLE_BOOKS_API = "https://www.googleapis.com/books/v1/volumes";

app.get("/search", async (req, res) => {
    const { q } = req.query; 
    try {
        const response = await axios.get(`${GOOGLE_BOOKS_API}?q=${q}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send("Error fetching data from Google Books API");
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
