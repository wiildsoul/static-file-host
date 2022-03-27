import * as express from "express";
import * as multer from "multer";
import * as cors from "cors";
import { gltfFilter, storage } from "./utils";

// setup
const UPLOAD_PATH = "uploads";
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

app.post("/upload", upload.single("file"), (req: any, res, next) => {
  console.log(req.file);
  res.send(req.id);
});

app.listen(PORT, function () {
  console.log(`listening on port ${PORT}!`);
});
