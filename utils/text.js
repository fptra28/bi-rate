// utils/text.js

function parseIndoDate(text) {
    const months = {
        januari: "01",
        februari: "02",
        maret: "03",
        april: "04",
        mei: "05",
        juni: "06",
        juli: "07",
        agustus: "08",
        september: "09",
        oktober: "10",
        november: "11",
        desember: "12",
        jan: "01",
        feb: "02",
        mar: "03",
        apr: "04",
        jun: "06",
        jul: "07",
        agu: "08",
        sep: "09",
        okt: "10",
        nov: "11",
        des: "12",
    };

    const cleaned = text.replace(/\s+/g, " ").trim().toLowerCase();
    const parts = cleaned.split(" ");
    if (parts.length < 3) return null;
    const day = parts[0].padStart(2, "0");
    const month = months[parts[1]];
    const year = parts[2];
    if (!month || !year || year.length !== 4) return null;
    return `${year}-${month}-${day}`;
}

function normalizeUrl(url) {
    if (!url) return null;
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    if (url.startsWith("/")) return `https://www.bi.go.id${url}`;
    return `https://www.bi.go.id/${url}`;
}

module.exports = {
    parseIndoDate,
    normalizeUrl,
};
