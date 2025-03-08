const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Server is running!");
});

// Handle form submission
app.post("/submit", (req, res) => {
    const { name, password, confirmPassword, message } = req.body;

    // Validation checks
    if (!name || typeof name !== "string") {
        return res.status(400).json({ error: "Name must be a string and cannot be empty" });
    }

    if (!password || !confirmPassword) {
        return res.status(400).json({ error: "Password fields cannot be empty" });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
    }

    // Hash the password for security
    const hashedPassword = bcrypt.hashSync(password, 10);

    res.json({ message: "Form submitted successfully!", name, hashedPassword, message: message || "No message provided" });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
