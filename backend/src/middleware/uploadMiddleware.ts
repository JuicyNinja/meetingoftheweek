import util from "util";
import multer from "multer";
import path from "path";

const maxSize: number = 2 * 1024 * 1024;
const __basedir = path.resolve();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

const uploadFileMiddleware = util.promisify(uploadFile);
export default uploadFileMiddleware;