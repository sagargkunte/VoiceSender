import express from 'express';
import multer from 'multer';
import path from "path";

const app = express();

app.use(express.static(path.join(process.cwd(), "public")));
app.use(express.json());

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const uploadMiddleware = multer({ storage });

app.get('/', (req, res) => {
  res.send("Home Page");
});

app.post('/upload-audio', uploadMiddleware.single('audio'), (req, res) => {
  console.log("Audio file received:", req.file);
  res.json({ message: "Audio file uploaded successfully!" });
});

app.listen(3000, "0.0.0.0" ,() => {
  console.log(`Server is listening at http://IPv4_adress_under_LAN_WiFi:3000`);
});
