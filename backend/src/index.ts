import cors from "cors";
import "dotenv/config";
import express, { Express, Request, Response } from "express";

const app: Express = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/api/test", async (req: Request, res: Response) => {
  res.json({ message: "from express endpoint" });
});

app.listen(PORT, () => console.log(`server running on port : ${PORT}`));
