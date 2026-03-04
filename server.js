// server.js

const express = require("express");
const morgan = require("morgan");
const { startCron } = require("./services/cron");
const biRateRouter = require("./routes/biRate");

const app = express();
const PORT = Number(process.env.PORT || 5000);

app.use(morgan("dev"));

startCron();

app.get("/", (req, res) => {
    res.send("Express server running");
});

app.use("/bi-rate", biRateRouter);

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});