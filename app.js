import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import blogRouter from "./routes/blog-routes";
import router from "./routes/user-routes";
import cors from "cors";
import path from "path";
const app = express();
app.use(cors());

app.use(express.json());

app.use("/api/user", router);
app.use("/api/blog", blogRouter);
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join("frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() =>
    app.listen(PORT, () =>
      console.log(
        `Connected to the database and Server running on port: ${PORT}`
      )
    )
  )
  .catch((err) => console.log(err));
