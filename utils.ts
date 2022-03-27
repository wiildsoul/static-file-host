import { diskStorage } from "multer";
import { join, extname } from "path";
import { mkdir, readdirSync } from "fs";
import { v4 as uuid4 } from "uuid";


export function gltfFilter(req, file, cb) {
  if (!file.originalname.match(/\.(gltf)$/)) {
    return cb(new Error("Only GLTF files are allowed!"), false);
  }
  cb(null, true);
}

export const listDirs = (dirname)=> {
  return readdirSync(dirname)
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


export function pageMaker(body: String) {
  return  `<html>
  <head>
    <title> Major Project</title>
    <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      height:100vh;
      width:100vw;
      display flex;
      justify-content: center;
      align-items: center;
    }
    </style>
  </head>
  <body>
    ${body}
  </body>
  </html>
`
}

export function linkMaker(text, link) {
  return `<li><a href="${link}">${text}</a></li>`
}