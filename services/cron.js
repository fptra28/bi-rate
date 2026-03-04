const cron = require("node-cron");
const { fetchBiRate } = require("./scraper");

function startCron() {
    // jalan setiap hari jam 02:00
    cron.schedule("0 2 * * *", async () => {
        try {
            console.log("Running daily BI rate scraping...");
            await fetchBiRate();
            console.log("BI rate updated");
        } catch (err) {
            console.error("Cron scraping failed:", err.message);
        }
    });
}

module.exports = { startCron };