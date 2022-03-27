import { diskStorage } from "multer";
import { join, extname } from "path";
import { mkdir } from "fs";
import { v4 as uuid4 } from "uuid";


export function gltfFilter(req, file, cb) {
  if (!file.originalname.match(/\.(gltf)$/)) {
    return cb(new Error("Only GLTF files are allowed!"), false);
  }
  cb(null, true);
}

export const storage = diskStorage({
  destination: function(req, file, cb) {
    mkdir('./uploads/',(err)=>{
       cb(null, './uploads/');
    });
  },
  filename: function (req: any, file, cb) {
    req.id = uuid4();
    cb(null, req.id + extname(file.originalname));
  },
});

