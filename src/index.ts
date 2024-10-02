import express, { Request, Response } from "express";
import router from "./routes/api";
// import path from "path";

const PORT = 3000;

function init() {
  const app = express();
  app.use(express.urlencoded({extended: false}))

  // app.use(express.static(path.join(__dirname, "../uploads")));

  app.use("/", router);

  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
      message: "OK",
      data: null,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

init();
