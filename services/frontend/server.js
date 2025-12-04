const express = require("express");
const path = require("path");
const app = express();
const distPath = path.join(__dirname, "dist");
app.use(express.static(distPath));
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});
const port = process.env.PORT || 5173;
app.listen(port, ()=> console.log("Frontend server running on port", port));
