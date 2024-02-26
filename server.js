require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const translatte = require("translatte");
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  try {
    res.send("Tanslate English to French");
  } catch (error) {
    console.error("Error deleting contacts:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.post("/translate", async (req, res) => {
  try {
    let text = req.body.text;
    text = text.trim();
    if (!text) {
      return res.status(400).json({ error: "Text to translate is missing" });
    }
    const translationResult = await translatte(text, { to: "fr" });
    console.log("Translated text:", translationResult.text);
    res.status(200).json({ translation: translationResult.text });
  } catch (error) {
    console.error("Error during translation:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
