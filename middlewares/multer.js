const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(null, "imgSCW  -" + Date.now() + "." + file.mimetype.split("/")[1]);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // console.log(file, "upload");
    if (
      file.mimetype.split("/")[1] === "jpeg" ||
      file.mimetype.split("/")[1] === "jpg" ||
      file.mimetype.split("/")[1] === "png"
    ) {
      cb(null, true);
      // console.log("true");
    } else {
      cb(null, false);
      // console.log("false");
      return cb(new Error("this file is not a photo"));
    }
  },
});

module.exports.send = (req, res, next) => {
  return upload.single("userImg")(req, res, () => {
    console.log(req.file);
    if (!req.file) {
      return res.json({
        message:
          "Invalid image file type ; only accept jpeg, jpg and png (req.file === 'undefined')",
      });
    }
    cloudinary.uploader.upload(req.file.path, async (err, result) => {
      if (err) return next(err);
      fs.unlinkSync(req.file.path); // ลบไฟล์ในโฟลเดอร์ local storage

      req.imgUrl = result.secure_url;
      next();
    });
  });
};

module.exports.roomIconSend = (req, res, next) => {
  return upload.single("roomImg")(req, res, async () => {
    // console.log(req);
    console.log(req.file);
    console.log(req.file.path);
    if (!req.file) {
      return res.json({
        message:
          "Invalid image file type ; only accept jpeg, jpg and png (req.file === 'undefined')",
      });
    }
    cloudinary.uploader.upload(req.file.path, async (err, result) => {
      if (err) return next(err);
      fs.unlinkSync(req.file.path); // ลบไฟล์ในโฟลเดอร์ local storage

      req.imgUrl = result.secure_url;
      next();
    });
  });
};
