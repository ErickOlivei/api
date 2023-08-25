const express = require("express");
const app = express();
const router = require("./router");

app.use(express.json());
app.use("/api", router);

app.get("/", (req, res) => {
  res.json({ status: "Server is up!" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
