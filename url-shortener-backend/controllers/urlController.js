const fs = require('fs');
const path = require('path');
const validator = require('validator');
const geoip = require('geoip-lite');
const generateCode = require('../utils/generateCode');

const filePath = path.join(__dirname, '../data/urls.json');

function loadData() {
    try {
        return JSON.parse(fs.readFileSync(filePath));
    } catch (err) {
        console.error('Error reading data file:', err.message);
        return {};
    }
}

function saveData(data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Error writing data file:', err.message);
    }
}

exports.createShortURL = (req, res) => {
    try {
        const { url, validity = 30, shortcode } = req.body;
        console.log("Received body:", req.body);

        if (!url || !validator.isURL(url)) {
            return res.status(400).json({ error: "Invalid or missing URL" });
        }

        if (shortcode && !/^[a-zA-Z0-9]{1,15}$/.test(shortcode)) {
            return res.status(400).json({ error: "Shortcode must be alphanumeric and <= 15 characters" });
        }

        const urls = loadData();
        let code = shortcode || generateCode();

        if (urls[code]) {
            return res.status(409).json({ error: "Shortcode already exists" });
        }

        const createdAt = new Date();
        const expiry = new Date(createdAt.getTime() + parseInt(validity) * 60000);

        urls[code] = {
            originalUrl: url,
            createdAt: createdAt.toISOString(),
            expiry: expiry.toISOString(),
            clicks: []
        };

        saveData(urls);

        return res.status(201).json({
            shortlink: `http://localhost:8000/${code}`,
            expiry: expiry.toISOString()
        });

    } catch (err) {
        console.error("Internal server error (createShortURL):", err.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};

exports.getStats = (req, res) => {
    try {
        const code = req.params.code;
        const urls = loadData();

        if (!urls[code]) {
            return res.status(404).json({ error: "Shortcode not found" });
        }

        const { originalUrl, createdAt, expiry, clicks } = urls[code];

        return res.json({
            originalUrl,
            createdAt,
            expiry,
            totalClicks: clicks.length,
            clickDetails: clicks
        });

    } catch (err) {
        console.error("Internal server error (getStats):", err.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};

exports.redirect = (req, res) => {
    try {
        const code = req.params.code;
        const urls = loadData();

        if (!urls[code]) {
            return res.status(404).json({ error: "Shortcode not found" });
        }

        const entry = urls[code];
        const now = new Date();

        if (new Date(entry.expiry) < now) {
            return res.status(410).json({ error: "Short URL expired" });
        }

        const ip = req.ip || req.connection.remoteAddress || "Unknown";
        const geo = geoip.lookup(ip) || {};
        const location = geo.city || geo.country || "Unknown";

        entry.clicks.push({
            timestamp: now.toISOString(),
            referrer: req.get("Referer") || "Direct",
            location
        });

        saveData(urls);
        return res.redirect(entry.originalUrl);

    } catch (err) {
        console.error("Internal server error (redirect):", err.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};
