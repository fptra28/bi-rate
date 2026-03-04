// /routes/biRate.js

const express = require("express");
const { fetchBiRate } = require("../services/scraper");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const { from, to } = req.query;
        const data = await fetchBiRate({ from, to });
        res.json(data);
    } catch (err) {
        console.error("BI SCRAPE ERROR:", err?.original || err);
        res.status(500).json({
            error: "Gagal mengambil BI-Rate",
            message: err.message,
            detail: err?.original || null,
        });
    }
});

module.exports = router;