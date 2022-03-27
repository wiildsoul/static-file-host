import * as express from "express";
import * as multer from "multer";
import * as cors from "cors";
import * as path from "path";
import { gltfFilter, storage, listDirs, pageMaker, linkMaker } from "./utils";

// setup
export const UPLOAD_PATH = "uploads";
const upload = multer({
  dest: `${UPLOAD_PATH}/`,
  fileFilter: gltfFilter,
  storage: storage,
});

const PORT = process.env.PORT || 3000;
// app
const app = express();
app.use(cors());
app.use(express.static("uploads/"));

app.get("/", (req, res, next) => {
  let x = "";
  let dirs = listDirs(path.join(__dirname, UPLOAD_PATH));
  for (let dir of dirs) {
    console.log(dir)
    x += linkMaker(dir, `/${dir}`);
  }
  res.send(pageMaker("<h2>All files uploaded till now.</h2>" + "<ul>" + x + "</ul>"));
});

app.post("/upload", upload.single("file"), (req: any, res, next) => {
  console.log(req.file);
  res.send(req.id);
});
app.get("/upload", (req, res, next) => {
  res.send(pageMaker("<h1>upload using POST , GET not supported.</h1>"));
});

app.listen(PORT, function () {
  console.log(`listening on port ${PORT}!`);
});
