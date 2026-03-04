// server.js

require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const { startCron } = require("./services/cron");
const biRateRouter = require("./routes/biRate");

const app = express();
const PORT = Number(process.env.PORT || 5000);
const API_TOKEN = process.env.BI_RATE_API_TOKEN || "";

app.use(morgan("dev"));

app.use((req, res, next) => {
    if (!API_TOKEN) {
        return res.status(500).json({
            error: "Konfigurasi token belum diatur",
            message: "Set env BI_RATE_API_TOKEN",
        });
    }

    const auth = req.headers.authorization || "";
    const [type, token] = auth.split(" ");
    if (type !== "Bearer" || token !== API_TOKEN) {
        return res.status(401).json({
            error: "Unauthorized",
            message: "Bearer token tidak valid",
        });
    }

    return next();
});

startCron();

app.get("/", (req, res) => {
    res.send("Express server running");
});

app.use("/bi-rate", biRateRouter);

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
